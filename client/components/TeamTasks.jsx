import React, { useState } from "react";
import Pending from "./Pending";
import Tasks from "./Task";
import "./TaskModal.css";
import Unaccepted from "./Unaccepted";
import Missed from "./Missed";

const TeamTasks = (props) => {
  // let teamTasks = [];
  let teamTasks = props.data;

  const teamTasksFinal = teamTasks.filter((element) => {
    return element !== null;
  });

  // var obj = new Object();
  // obj.name = "task-name";
  // obj.description = "task-desc";
  // obj.difficulty = "easy";
  // obj.deadline = "10/22/0001";
  // obj.points = 34;
  // obj.assigned = "";
  // obj.status = "unaccepted";
  // teamTasks.push(obj);

  // var obj2 = new Object();
  // obj2.name = "task-name";
  // obj2.description = "task-desc";
  // obj2.difficulty = "easy";
  // obj2.deadline = "10/22/0001";
  // obj2.points = 34;
  // obj2.assigned = "name";
  // obj2.status = "pending";
  // teamTasks.push(obj2);

  // var obj3 = new Object();
  // obj3.name = "task-name";
  // obj3.description = "task-desc";
  // obj3.difficulty = "easy";
  // obj3.deadline = "10/22/0001";
  // obj3.points = 34;
  // obj3.assigned = "name";
  // obj3.status = "complete";
  // teamTasks.push(obj3);

  const eachTask = teamTasksFinal.map((d) => {
    // console.log(Object.values(d));
    console.log("here we are", d);
    const id = Object.values(d)[0];
    const name = Object.values(d)[1];
    const desc = Object.values(d)[2];
    const difficulty = Object.values(d)[3];
    const date = Object.values(d)[4].slice(0, 10);
    const points = Object.values(d)[5];
    const assigned = Object.values(d)[9];
    const status = Object.values(d)[6];
    const completedBy = Object.values(d)[11];
    let completedDate;
    if (Object.values(d)[10]) {
      completedDate = Object.values(d)[10].slice(0, 10);
    }
    // return <Tasks date={task.deadline} name={task.name} points={task.points} />;
    if (status === "unassigned") {
      return (
        <Unaccepted
          id={id}
          date={date}
          desc={desc}
          difficulty={difficulty}
          name={name}
          points={points}
          status={status}
        />
      );
    } else if (status === "pending") {
      return (
        <Pending
          date={date}
          desc={desc}
          difficulty={difficulty}
          assigned={assigned}
          name={name}
          points={points}
        />
      );
    } else if (status === "complete") {
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
        />
      );
    }
  });

  const AllTasks = [
    <Tasks date="10/22/2022" name="Fixing Frontend" points="30" />,
    <Unaccepted date="2/22/2022" name="Fixing Backend" points="10" />,
    <Unaccepted date="110/22/2022" name="Frontend" points="90" />,
    <Pending date="110/22/2022" name="Frontend" points="90" />,
    <Tasks date="110/22/2022" name="Frontend" points="90" />,
    <Pending date="110/22/2022" name="Frontend" points="90" />,
    <Tasks date="10/29/2022" name="Fixing Homepage" points="20" />,
    <Unaccepted date="10/29/2022" name="Fixing Homepage" points="20" />,
    <Pending date="10/29/2022" name="Fixing Homepage" points="20" />,
  ];

  if (!props.show) {
    return null;
  }

  return (
    <div className="overlay" class="fixed pin z-50 flex">
      <div className="modal">
        <div className="task-content">
          <div className="taskHeader">
            <h1 className="text-center text-6xl font-semibold pt-4 mb-3 text-indigo-500">
              All Tasks
            </h1>
          </div>
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

export default TeamTasks;
