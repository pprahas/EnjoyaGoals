import React, { useState } from "react";
import Tasks from "./Task";
import "./TaskModal.css";

const CompletedTasks = (props) => {
  const AllTasks = [
    <Tasks date="10/22/2022" name="Fixing Frontend" points="30" />,
    <Tasks date="2/22/2022" name="Fixing Backend" points="10" />,
    <Tasks date="110/22/2022" name="Frontend" points="90" />,
    <Tasks date="110/22/2022" name="Frontend" points="90" />,
    <Tasks date="110/22/2022" name="Frontend" points="90" />,
    <Tasks date="110/22/2022" name="Frontend" points="90" />,
    <Tasks date="10/29/2022" name="Fixing Homepage" points="20" />,
    <Tasks date="10/29/2022" name="Fixing Homepage" points="20" />,
  ];

  if (!props.show) {
    return null;
  }

  return (
    <div className="overlay" class="fixed pin z-50 flex">
      <div className="modal">
        <div className="task-content">
          <div className="taskHeader">
            <h1 className="text-center text-6xl font-semibold pt-4 mb-3 text-indigo-400">
              Completed Tasks
            </h1>
          </div>
          <div className="rounded-md pt-24 pb-10 bg-indigo-900">{AllTasks}</div>
        </div>
        <div className="taskFoot">
            <button
              type="button"
              className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={props.onClose}
            >
              Abort
            </button>{" "}
          </div>
      </div>
    </div>
  );
};

export default CompletedTasks;
