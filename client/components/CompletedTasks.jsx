import { assign } from "nodemailer/lib/shared";
import React, { useState } from "react";
import Tasks from "./Task";
import "./TaskModal.css";

const CompletedTasks = (props) => {
  // let user_object = window.localStorage.getItem("user_data");
  // user_object = JSON.parse(user_object);
  // let userRooms = user_object.rooms;
  // let completedTask = userRooms.completedTasks;

  let completedTasks = props.data;

  var obj = new Object();
  obj.name = "task-name";
  obj.description = "task-desc";
  obj.difficulty = "easy";
  obj.deadline = "10/22/1111";
  obj.points = 34;
  obj.assigned = "prado156";
  // completedTasks.push(obj);

  const AllTasks = [
    <Tasks date="10/22/2022" name="Fixing Frontend" points="30" />,
  ];

  const eachTask = completedTasks.map((d) => {
    const name = Object.values(d)[1];
    const desc = Object.values(d)[2];
    const difficulty = Object.values(d)[3];
    const date = Object.values(d)[4].slice(0, 10);
    const points = Object.values(d)[5];
    const assigned = Object.values(d)[5];
    // return <Tasks date={task.deadline} name={task.name} points={task.points} />;
    return (
      <Tasks
        date={date}
        desc={desc}
        difficulty={difficulty}
        assigned={assigned}
        name={name}
        points={points}
      />
    );
  });

  if (!props.show) {
    return null;
  }

  return (
    <div className="overlay" class="fixed pin z-50 flex">
      <div className="modal">
        <div className="task-content">
          <div className="taskHeader">
            <h1 className="text-center text-6xl font-semibold pt-4 mb-3 text-indigo-500">
              Completed Tasks
            </h1>
          </div>
          {/* <div className="rounded-md pt-24 pb-10 bg-indigo-900">{AllTasks}</div> */}
          <div className="rounded-md pt-24 pb-10 bg-indigo-900">{eachTask}</div>
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
