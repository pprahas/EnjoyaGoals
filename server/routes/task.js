const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");
const Room = require("../models/RoomModel");
const mongoose = require("mongoose");
const theValidator = require("../helpers/TeamMemberCheck");

var multiparty = require("multiparty");
const User = require("../models/UserModel");

promisify = require("util");

router.use(express.json());
// router.use(formidable());

// route for creating a new task
router.post("/create", async (req, res) => {
  // this request MUST contain:
  // "creatorId":     the id of the user sending the request to create a new task
  // "name":		    the name of the new task
  // "completed":		a boolean indicating whether this task has been completed or not
  const task = req.body;

  const valid = await theValidator.userInRoomCheck(task.roomId, task.creatorId);

  if (!valid) {
    console.log(
      `${task.creatorId} tried to create a task in ${task.roomId} but they aren't a member of that room!`
    );
    res.status(403).json({
      msg: "User does not have access to that room; task was not created.",
    });
    return;
  }

  try {
    const dbTask = new Task(
      {
        _id: new mongoose.Types.ObjectId(), // not part of request
        name: task.name, // required; String
        description: task.description, // optional; String
        difficulty: task.difficulty, // optional; String
        deadline: task.deadline, // optional; Date
        points: task.points, // optional; Number
        status: task.status, // required; Boolean
        assignedUser: task.assignedUser, // optional; id (as a String)
        roomId: task.roomId,
        creatorId: task.creatorId, // required, id (as a String)
      },
      { timestamps: true }
    );

    await dbTask.save();

    // save db task in the particular room
    const room = await Room.findById(task.roomId);

    room.teamTasks.push(dbTask);
    await room.save();
    console.log(room);

    return res.status(200).json({ msg: "Task created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Task creation failed." });
  }
});

// route for deleting an existing task
router.post("/delete", async (req, res) => {
  // this request should contain the `_id` of the task to be deleted
  const taskToDelete = req.body;

  try {
    const findRes = await Task.findByIdAndDelete(taskToDelete.id);

    return res.status(200).json({ msg: "Task deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Deleting task failed." });
  }
});

// route for updating a field of an existing task
router.post("/update", async (req, res) => {
  // this request should contain:
  // "id":        the `_id` of the task,
  // "fieldName": the name of the field to be changed,
  // "value":     and the new value
  const taskToUpdate = await Task.findById(req.body.id);

  try {
    // I'm sorry this looks awful - Nick
    switch (req.body.fieldName) {
      case "name":
        taskToUpdate.update({ name: req.body.value });
        break;
      case "description":
        taskToUpdate.update({ description: req.body.value });
        break;
      case "difficulty":
        taskToUpdate.update({ difficulty: req.body.value });
        break;
      case "deadline":
        taskToUpdate.update({ deadline: req.body.value });
        break;
      case "points":
        taskToUpdate.update({ points: req.body.value });
        break;
      case "completed":
        taskToUpdate.update({ completed: req.body.value });
        // TODO: Make it so that when a task has its "completed" status changed, it gets
        // moved to the array corresponding to its new value.
        // If a Task is in a Room's "todoTasks" list and its "completed" status gets changed
        // to true, then it should get moved to the "completedTasks" list.

        break;
      case "assignedUser":
        taskToUpdate.update({ assignedUser: req.body.value });
        break;
    }

    await taskToUpdate.save();
    return res.status(200).json({ msg: "Task updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Updating task failed." });
  }
});

router.post("/team_tasks", async (req, res) => {
  const body = req.body;
  let completed_tasks = [];

  try {
    const room_id = body.id;
    const room = await Room.findById(room_id);
    let completed_tasks_id = room.teamTasks;

    for (let i = 0; i < completed_tasks_id.length; i++) {
      const task = await Task.findById(completed_tasks_id[i]);
      completed_tasks.push(task);
    }

    return res.status(200).json(completed_tasks);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "List not sent." });
  }
});

router.post("/task_count", async (req, res) => {
  const body = req.body;
  let pending_tasks_count = 0;
  let completed_count = 0;
  let unassigned_count = 0;
  let returned = [];
  try {
    const room_id = body.id;
    const username = body.username;
    const room = await Room.findById(room_id);
    let pending_tasks_id = room.assignedTasks;
    let team_tasks_id = room.teamTasks;
    let complete_tasks_id = room.completedTasks;

    for (let i = 0; i < complete_tasks_id.length; i++) {
      const task = await Task.findById(complete_tasks_id[i]);
      if (task.assignedUser === username && task.status !== "missed") {
        completed_count += 1;
      }
    }
    for (let i = 0; i < pending_tasks_id.length; i++) {
      const task = await Task.findById(pending_tasks_id[i]);
      if (task.assignedUser === username) {
        pending_tasks_count += 1;
      }
    }
    //let team_tasks_count = team_tasks_id.length;
    for (let i = 0; i < team_tasks_id.length; i++) {
      const task = await Task.findById(team_tasks_id[i]);
      if (task.status == "unassigned") {
        unassigned_count += 1;
      }
    }
    returned.push(pending_tasks_count);
    returned.push(completed_count);
    returned.push(unassigned_count);

    return res.status(200).json(returned);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/team_tasks/assign", async (req, res) => {
  const body = req.body;
  const room_id = body.room_id;
  const task_id = body.task_id;

  try {
    const task = await Task.findById(task_id);
    const room = await Room.findById(room_id);
    const assignedUser = body.assignedUser;

    // let remove_id = [task_id];
    // rooms.updateOne(
    //   { _id: room_id },
    //   {
    //     $pull: {
    //       teamTasks: {
    //         _id: { $in: remove_id },
    //       },
    //     },
    //   }
    // );
    // room.updateOne({
    //   $pull: {
    //     teamTasks: {
    //       _id: { $in: remove_id },
    //     },
    //   },
    // });

    task.status = "pending";
    task.assignedUser = assignedUser;

    // await room.save();
    await task.save();
    room.assignedTasks.push(task);
    await room.save();

    return res.status(200).json({ msg: "worked" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/pending_tasks", async (req, res) => {
  const body = req.body;
  let pending_tasks = [];

  try {
    const room_id = body.id;
    const username = body.username;
    const room = await Room.findById(room_id);
    let pending_tasks_id = room.assignedTasks;

    for (let i = 0; i < pending_tasks_id.length; i++) {
      const task = await Task.findById(pending_tasks_id[i]);
      if (task.assignedUser === username) {
        pending_tasks.push(task);
      }
    }

    return res.status(200).json(pending_tasks);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/get_file", async (req, res) => {
  try {
    const body = req.body.id;
    //const task_id = body.task.id;
    //console.log(body.task.id);
    console.log(body);
    const task = await Task.findById(body);
    return res.status(200).json(JSON.parse(task.file));
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/pending_tasks/upload", async (req, res) => {
  let task_id;
  let file;

  let form = new multiparty.Form();
  var promise = new Promise(function (resolve, reject) {
    let all_data = [];
    form.parse(req, function (err, fields, field) {
      task_id = fields.task_id[0];
      file = field["file"][0];

      console.log("task id is", task_id);
      console.log("file is", file);
      all_data.push(task_id);
      all_data.push(file);
      resolve(all_data);
    });
  });
  let final_task_id;
  let final_file;
  promise.then(async function (data) {
    console.log("all data is", data);
    final_task_id = data[0];
    final_file = data[1];
    console.log("final task id is", final_task_id);
    console.log("final file is", JSON.stringify(final_file));

    const task = await Task.findById(task_id);
    task.file = JSON.stringify(final_file);
    // task.file = final_file;
    await task.save();
    console.log("task is", task);
  });

  console.log("final task id is", final_task_id);
  // this is probs all you need to do
  // task.file = file;
  // await task.save();

  //
  // task.filename = file;

  // await task.save();
  // res.status(200).json({ msg: "worked" });

  // var data = JSON.parse(req.data);
  // var body = data.data;

  // const body = req.body;
  // const room_id = body.room_id;
  // const task_id = body.task_id;
  // const file = body.file;
  // const task_id = body.task_id;
  try {
    // const task = await Task.findById(task_id);
    // console.log("file is", data);
    // task.file = file;
    // console.log(file);
    // var fs = require("fs");
    // fs.readFile(file, "utf8", (err, data) => {
    //   if (err) {
    //     console.error(err);
    //   }
    // });

    // var fs = require("fs");
    // fs.readFile(file, "utf8", (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(data);
    // });
    // task.insert({ file: data });

    // await task.save();
    return res.status(200).json({ msg: "worked" });
    // return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/pending_tasks/submit", async (req, res) => {
  const body = req.body;
  const room_id = body.room_id;
  const task_id = body.task_id;

  const completed_by = body.completedBy;

  const feedback = body.feedback;

  try {
    const task = await Task.findById(task_id);
    const room = await Room.findById(room_id);
    const user = await User.findById(completed_by);

    if (feedback.length < 8) {
      return res.status(200).json({ msg: "put more words pls" });
    }

    task.status = "complete";
    task.feedback = feedback;

    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    let now_time = year + "-" + month + "-" + date;

    const today = new Date();

    if (task.deadline < today) {
      task.status = "missed";
    }

    task.completedTime = now_time;

    task.completedBy = completed_by;

    await task.save();
    // room.updateOne({ _id: room_id }, { $pull: { assignedTasks: task_id } });

    room.assignedTasks.pull(task_id);
    room.completedTasks.push(task);

    // give points to User
    // user = User
    // task = Task
    // room = Room
    var points = task.points;
    if (user.pointsEarned.has(room._id.toString())) {
      points += user.pointsEarned.get(room._id.toString());
    }
    user.pointsEarned.set(room._id.toString(), points);

    await user.save();

    // const findRes = await Task.pendfindByIdAndDelete(taskToDelete.id);
    await room.save();
    return res.status(200).json({ msg: "worked" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/completed_tasks", async (req, res) => {
  const body = req.body;
  let completed_tasks = [];

  try {
    const room_id = body.id;
    const room = await Room.findById(room_id);
    let completed_tasks_id = room.completedTasks;

    for (let i = 0; i < completed_tasks_id.length; i++) {
      const task = await Task.findById(completed_tasks_id[i]);
      completed_tasks.push(task);
    }

    return res.status(200).json(completed_tasks);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
