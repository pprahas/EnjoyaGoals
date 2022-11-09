import React, { useState } from "react";
import "./TaskModal.css";

const MissedInformation = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    //    <div className="overlay" class="fixed pin z-50 overflow-auto flex w-36">
    <div className="fixed pin z-50 overflow-auto flex w-36">
      <div className="modal">
        <div className="task-info break-all">
          <div className="task-info-header">
            <h1 className="pb-2 fixed m-auto inset-x-0 justify-center text-center text-6xl font-semibold pt-6 text-indigo-400	">
              {props.name}
            </h1>
          </div>
          <div className="task-info-foot">
            <button
              type="button"
              className="flex w-full justify-center rounded-b-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={props.onClose}
            >
              Close
            </button>{" "}
          </div>
          <div className="info overflow-y-auto">
            <p>Description: {props.desc} </p>
            <p>Difficulty: {props.difficulty}</p>
            <p>Deadline: {props.date}</p>
            <p>Points: {props.points}</p>
            <p>Date Completed: {props.completedDate}</p>
            <p>Completed By: {props.completedBy}</p>
            <p>Feedback: {props.feedback}</p>
          </div>
          {/* <p>Assigned: {props.assigned} </p> */}


        </div>
      </div>
    </div>
  );
};
export default MissedInformation;
