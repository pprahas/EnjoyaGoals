import React, { useState } from "react";
import axios from "axios";
import "./TaskModal.css";

const TaskInformation = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="overlay" class="fixed pin z-50 overflow-auto flex w-36">
      <div className="modal">
        <div className="modal-content">
          <h1 className="text-center text-6xl font-semibold pt-8 text-indigo-400	">
            {props.name}
          </h1>
          <p>Description: {props.desc} </p>
          <p>Difficulty: {props.difficulty}</p>
          <p>Deadline: {props.date}</p>
          <p>Points: {props.points}</p>

          <p>Date Completed: {props.completedDate}</p>
          <p>Completed By: {props.completedBy}</p>
          <p>Feedback: {props.feedback}</p>

          {/* <p>Assigned: {props.assigned} </p> */}
          <button
            type="button"
            className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={props.onClose}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default TaskInformation;
