import React, { useState } from "react";
import "../TaskModal.css";
import axios from "axios";

const TaskInformation = (props) => {
  if (!props.show) {
    return null;
  }

  const flag = true;

  const getFile = async (e) => {
    e.preventDefault;

    axios
      .post("http://localhost:8080/task/get_file", {
        id: props.id,
      })
      .then((res) => {
        //console.log(res)
        //      console.log(res.data[2].toString("base64"));
        const fileName = res.data[0];
        const fileType = res.data[1];
        const imgData = res.data[2];
        //console.log(imgData);
        const toDownload = fileType + imgData;
        const link = document.createElement("a");
        link.href = toDownload;
        link.download = fileName;
        link.click();
      })
      .catch((err) => {
        // setMessage(err.response.data.message);

        console.log("error", err);
      });
    console.log("S");
  };
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
            {/*flag && 
            <button
              type="button"
              className="mt-4 mb-4 group relative flex w-full justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick=""
            >
              Download
            </button>
  */}
            <button
              type="button"
              className="flex group relative w-full justify-center rounded-b-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={props.onClose}
            >
              Close
            </button>{" "}
          </div>
          <div className="bg-white info overflow-y-auto">

            <p>Description: {props.desc} </p>
            <p>Difficulty: {props.difficulty}</p>
            <p>Deadline: {props.date}</p>
            <p>Points: {props.points}</p>
            <p>Date Completed: {props.completedDate}</p>
            <p>Completed By: {props.completedBy}</p>
            <p>Feedback: {props.feedback}</p>
            <p>
              {props.flag ? (
                <button className="text-blue-600" onClick={getFile}>
                  Download File
                </button>
              ) : (
                <p className="text-red-600">No File</p>
              )}
            </p>
            {/* <p>
              {props.flag && (
                <button className="text-blue-600" onClick={getFile}>
                  {props.flag ? <p>Download File</p> : <p>No File</p>}
                </button>
              )}
            </p> */}
          </div>
          {/* <p>Assigned: {props.assigned} </p> */}
        </div>
      </div>
    </div>
  );
};
export default TaskInformation;
