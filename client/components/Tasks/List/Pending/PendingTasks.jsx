import React, { useState } from "react";
import Pending from "../../PendingTask/Pending";
import "../../TaskModal.css";

const PendingTasks = (props) => {
  let pendingTasks = props.data;

  const eachTask = pendingTasks.map((d) => {
    const name = Object.values(d)[1];
    const desc = Object.values(d)[2];
    const difficulty = Object.values(d)[3];
    const date = Object.values(d)[4].slice(0, 10);
    const points = Object.values(d)[5];
    const assigned = Object.values(d)[10];
    const id = Object.values(d)[0];
    // return <Tasks date={task.deadline} name={task.name} points={task.points} />;
    return (
      <Pending
        date={date}
        desc={desc}
        difficulty={difficulty}
        assigned={assigned}
        name={name}
        points={points}
        id={id}
        key={id}
        createNotif={props.createNotif}
      />
    );
  });

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
              Pending Tasks
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
          <div className="rounded-md pt-24 pb-10 bg-indigo-900">{eachTask}</div>
        </div>
        <div className="taskFoot">
          <button
            type="button"
            className="flex w-full justify-center rounded-md border font-semibold border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={props.onClose}
          >
            Close
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;
