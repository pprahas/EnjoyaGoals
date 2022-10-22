import React, { useState } from "react";
import axios from "axios";
import "./TaskModal.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView = (props) => {
  if (!props.show) {
    return null;
  }
  const [task_name, settask_name] = useState("");
  const [task_description, settask_description] = useState("");
  const [task_difficulty, settask_difficulty] = useState("");
  const [task_deadline, settask_deadline] = useState("");
  const [points, setpoints] = useState("");
  const [assigned_user, setassigned_user] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = window.localStorage.getItem("userId");
    const completed = false;
    axios
      .post("http://localhost:8080/task/create", {
        // creatorId: user_id,
        name: task_name,
        description: task_description,
        difficulty: task_difficulty,
        deadline: task_deadline,
        points: points,
        completed: completed,
        assignedUser: assigned_user,
      })
      .then((res) => {
        console.log("Posting data", res);
        // navigate("/login");
      })
      .catch((err) => {
        // console.log(err);
        // setMessage(err.response.data.msg);
        console.log(err.response.data.msg);
      });
  };

  return (
    <div className="overlay" class="fixed pin z-50 overflow-auto flex">
      <div className="modal">
        <div className="modal-content">
          <h1 className="text-center text-6xl font-semibold pt-8 text-indigo-400	">
            Calendar
          </h1>
          <Calendar />
          {/* <h1 className="text-center text-8xl text-red-400	">Homepage</h1>; */}
          {/* <a href="/forgot_password" className="content-center text-8xl bg-red-400">
        Create Task
      </a> */}
          {/* <button className="text-center text-8xl text-red-400	">Homepage</button>; */}
          <button
            type="button"
            className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={props.onClose}
          >
            Abort
          </button>
        </div>
      </div>
    </div>
  );
};
export default CalendarView;
