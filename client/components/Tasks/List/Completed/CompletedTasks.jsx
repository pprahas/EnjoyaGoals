import React, { useState } from "react";
import Tasks from "../../CompletedTask/CompletedTask";
import "../../TaskModal.css";
import Missed from "../../MissedTask/Missed";

const CompletedTasks = (props) => {
  // let user_object = window.localStorage.getItem("user_data");
  // user_object = JSON.parse(user_object);
  // let userRooms = user_object.rooms;
  // let completedTask = userRooms.completedTasks;

  let completedTasks = props.data;
  // console.log(props.data[0].name)
  let eachtask = [];
  for (let i = 0; i < completedTasks.length; i++) {
    let task = props.data[i];
    const id = task._id;
    const name = task.name;
    const desc = task.description;
    const difficulty = task.difficulty;
    const date = task.deadline.slice(0, 10);
    const points = task.points;
    const assigned = task.assignedUser;
    const feedback = task.feedback;
    const completedDate = task.completedTime.slice(0, 10);
    const completedBy = task.assignedUser;
    const status = task.status;
    let hasFile = false;
    if (task.file) {
     hasFile = true;
    } else {
      //  setHasFile(false)
      hasFile = false;
    }
    if (status === "complete") {
      eachtask.push(<Tasks
        date={date}
        desc={desc}
        difficulty={difficulty}
        assigned={assigned}
        name={name}
        points={points}
        completedDate={completedDate}
        completedBy={completedBy}
        id={id}
        feedback={feedback}
        flag={hasFile}
      />)
    }

    if (status === "missed") {
      eachtask.push(<Missed
        date={date}
        desc={desc}
        difficulty={difficulty}
        assigned={assigned}
        name={name}
        points={points}
        completedDate={completedDate}
        completedBy={completedBy}
        id={id}
        feedback={feedback}
        flag={hasFile}
      />)
    }

  }/*
  const eachTask = completedTasks.map((d) => {
    const id = Object.values(d)[0];
    const name = Object.values(d)[1];
    const desc = Object.values(d)[2];
    const difficulty = Object.values(d)[3];
    const date = Object.values(d)[4].slice(0, 10);
    const points = Object.values(d)[5];
    const assigned = Object.values(d)[10];
    const feedback = Object.values(d)[15];
    const completedDate = Object.values(d)[14].slice(0, 10);
    const completedBy = Object.values(d)[10];
    const status = Object.values(d)[6];
    // return <Tasks date={task.deadline} name={task.name} points={task.points} />;
 
    if (status === "complete") {
      return (
        <Tasks
          date={date}
          desc={desc}
          difficulty={difficulty}
          assigned={assigned}
          name={name}
          points={points}
          completedDate={completedDate}
          completedBy={completedBy}
          id={id}
          feedback={feedback}
        />
      );
    } else if (status === "missed") {

      return (
        <Missed
          date={date}
          desc={desc}
          difficulty={difficulty}
          assigned={assigned}
          name={name}
          points={points}
          completedDate={completedDate}
          completedBy={completedBy}
          key={id}
          feedback={feedback}
        />
      );
    }
  });
*/
  if (!props.show) {
    return null;
  }

  return (
    //    <div className="overlay" class="fixed pin z-50 flex">
    <div className="fixed pin z-50 flex">
      <div className="modal">
        <div className="task-content">
          <div className="taskHeader">
            <h1 className="text-center text-6xl font-semibold pt-4 mb-3 text-indigo-500">
              Completed Tasks
            </h1>
            <div className="flex mt-4 mb-3 justify-center">
              <span className="w-24 text-center rounded-full bg-green-500 text-white px-2 py-1 text-xs font-bold mr-3">
                Completed
              </span>
              <span className="w-24 text-center rounded-full bg-red-700 text-white px-2 py-1 text-xs font-bold mr-3">
                Pending
              </span>
              <span className="w-24 text-center rounded-full bg-indigo-500 text-white px-2 py-1 text-xs font-bold mr-3">
                Unassigned
              </span>
              <span className="w-24 text-center rounded-full bg-yellow-600 text-white px-2 py-1 text-xs font-bold mr-3">
                Late
              </span>
            </div>
          </div>
          {/* <div className="rounded-md pt-24 pb-10 bg-indigo-900">{AllTasks}</div> */}
          <div className="rounded-md pt-24 pb-10 bg-indigo-900">{eachtask}</div>
        </div>
        <div className="taskFoot">
          <button
            type="button"
            className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={props.onClose}
          >
            Close
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default CompletedTasks;
