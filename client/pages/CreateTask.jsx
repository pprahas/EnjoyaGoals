import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import React, { useState } from "react";
import axios from "axios";
import Leaderboard from "../components/Leaderboard";

export default function Homepage() {
  const [task_name, settask_name] = useState("");
  const [task_description, settask_description] = useState("");
  const [task_difficulty, settask_difficulty] = useState("");
  const [task_deadline, settask_deadline] = useState("");
  const [points, setpoints] = useState("");
  const [assigned_user, setassigned_user] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_object = window.localStorage.getItem("user_data");
    const user_id = user_object._id;
    const completed = false;
    axios
      .post("http://localhost:8080/task/create", {
        creatorId: user_id,
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
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  return (
    <div className="content-center">
      <Header />
      <h1 className="text-center text-8xl text-red-400	">Create Task</h1>;
      <Sidebar />
      <Leaderboard />
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          {/* <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Username"
                />
              </div> */}
          {/* <Input label="text" htmlFor="text" placeholder="First Name" /> */}
          <input
            id="task_name"
            name="task_name"
            type="text"
            autoComplete="task_name"
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Task Name"
            onChange={(e) => settask_name(e.target.value)}
            // value={task_name}
          />
          {/* <Input label="text" htmlFor="text" placeholder="Last Name" /> */}
          <input
            id="task_description"
            name="task_description"
            type="text"
            autoComplete="task_description"
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Task Description"
            onChange={(e) => settask_description(e.target.value)}
            value={task_description}
          />
          <input
            id="task_difficulty"
            name="task_difficulty"
            autoComplete="task_description"
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Task Difficulty"
            list="difficulty"
            onChange={(e) => settask_difficulty(e.target.value)}
            value={task_difficulty}
          />
          <datalist id="difficulty">
            <option value="Easy" />
            <option value="Medium" />
            <option value="Hard" />
          </datalist>

          {/* <Input label="text" htmlFor="text" placeholder="Username" /> */}
          {/* <Input
                label="email"
                htmlFor="email-address"
                placeholder="Email address"
              /> */}
          <input
            id="points"
            name="points"
            type="points"
            autoComplete="points"
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Points"
            onChange={(e) => setpoints(e.target.value)}
            value={points}
          />
          {/* <Input
                label="password"
                htmlFor="password"
                placeholder="Password"
              /> */}
          <input
            id="assigned_user"
            name="assigned_user"
            type="text"
            autoComplete="assigned_user"
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Assigned User"
            onChange={(e) => setassigned_user(e.target.value)}
            value={assigned_user}
          />
          <input
            id="deadline"
            name="deadline"
            type="date"
            autoComplete=""
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Deadline"
            onChange={(e) => settask_deadline(e.target.value)}
            value={task_deadline}
          />
          {/* <Input
                label="password"
                htmlFor="password"
                placeholder="Confirm Password"
              /> */}
          {/* <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="confirm_password"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
              /> */}
          <div className="border-t border-gray-200 pt-4"></div>
        </div>

        {/* <p className="mt-2 text-center text-sm text-red-600">{} </p> */}
        {/* <p className="mt-2 text-center text-sm text-red-600">{message} </p> */}
        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Task
          </button>
          <div>
            {/* <p className="mt-2 text-center text-sm text-gray-600">
                  <b>Or</b>
                </p> */}
          </div>
          &nbsp;
          <div>
            {/* <img
                  className="mx-auto h-12 w-auto"
                  src={SignIn}
                  onclick="this.src='{SignIn2}'"
                  alt="Google"
                /> */}
          </div>
        </div>
      </form>
    </div>
  );
}
