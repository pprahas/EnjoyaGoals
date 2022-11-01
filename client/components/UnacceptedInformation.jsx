import React, { useState } from "react";
import axios from "axios";
import "./TaskModal.css";

const UnacceptedInformation = (props) => {
  if (!props.show) {
    return null;
  }

  const submitTask = async (e) => {
    e.preventDefault();
    const id = "63477176250a07c21330fbe1";
    axios
      .post("http://localhost:8080/task/team_tasks/assign", {
        room_id: id,
        task_id: props.id,
      })
      .then((res) => {
        // console.log("printing task data", res.data[0]);
        // console.log("frontend sends:", res.data);
        list_2 = res.data;
        setteamList(list_2);
        // window.localStorage.setItem("team_tasks", JSON.stringify(list_2));
        // console.log("its here", teamList);
      })
      .catch((err) => {
        // setMessage(err.response.data.message);

        console.log("error", message);
      });
  };

  return (
    <div className="overlay" class="fixed pin z-50 overflow-auto flex w-36">
      <div className="modal">
        <div className="modal-content">
          <h1 className="text-center text-6xl font-semibold pt-8 text-indigo-400	">
            {props.name}
          </h1>
          <p>Description: {props.desc} </p>
          <p>Difficulty:{props.difficulty}</p>
          <p>Deadline: {props.date}</p>
          <p>Points: {props.points}</p>

          <button
            type="button"
            className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={props.onClose}
          >
            Accept
          </button>
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
export default UnacceptedInformation;
