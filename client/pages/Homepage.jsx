import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Leaderboard from "../components/Leaderboard";
import TaskModal from "../components/TaskModal";
import { useState } from "react";

function CreateTask() {
  console.log("here and there and there too man");
  return (
    <h1 className="text-center text-8xl text-red-400">Yeah sure hahaha</h1>
  );
}

export default function Homepage() {
  const [show, setShow] = useState(false);

  return (
    <div className="content-center">
      <Header />
      <div className="ml-32 flex flex-row ">
        {/* <h1 className="text-center text-8xl text-red-400	">Homepage</h1>; */}
        <div className="mt-6 grid grid-cols-1 gap-24">
          <div className="col-span-6">
            <button
              className="absolute right-0 content-center text-4xl bg-red-500 mr-36 p-3 w-52 text-white rounded-md"
              onClick={() => setShow(true)}
            >
              Create Task
            </button>

            <TaskModal onClose={() => setShow(false)} show={show} />
          </div>
          <div className="col-span-6">
            <a
              href="/homepage/create_task"
              className=" absolute right-0 text-center content-center text-4xl  text-white bg-indigo-400 w-52 mr-36 p-3 rounded-md"
            >
              Completed
            </a>
          </div>

          <div className="col-span-6">
            <a
              href="/homepage/create_task"
              className=" absolute right-0 text-center content-center text-4xl bg-indigo-400 text-white w-52 mr-36 p-3 rounded-md"
            >
              Pending
            </a>
          </div>

          <div className="col-span-6">
            <a
              href="/homepage/create_task"
              className=" absolute right-0 text-center content-center text-4xl bg-indigo-400 mr-36 p-3 w-52 text-white rounded-md"
            >
              Team
            </a>
          </div>
        </div>
      </div>
      {/* <button className="text-center text-8xl text-red-400	">Homepage</button>; */}
      <Sidebar />
      <Leaderboard />
    </div>
  );
}
