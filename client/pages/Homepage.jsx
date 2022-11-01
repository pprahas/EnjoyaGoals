import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Leaderboard from "../components/Leaderboard";
import TaskModal from "../components/TaskModal";
import { useState } from "react";
import CompletedTasks from "../components/CompletedTasks";
import PendingTasks from "../components/PendingTasks";
import TeamTasks from "../components/TeamTasks";
import axios from "axios";
import { useEffect } from "react";

export default function Homepage() {
  const [showCreate, setShowCreate] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [message, setMessage] = useState("");
  let list = [];
  const [teamList, setteamList] = useState(list);

  useEffect(() => {
    console.log(teamList);
  }, [teamList]);

  const id = "63477176250a07c21330fbe1";

  const submitTeam = async (e) => {
    setShowAll(true);
    let list_2 = [];
    e.preventDefault();
    axios
      .post("http://localhost:8080/task/team_tasks", {
        id,
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
    <div className="content-center">
      <Header />
      <div className="ml-32 flex flex-row ">
        {/* <h1 className="text-center text-8xl text-red-400	">Homepage</h1>; */}
        <div className="mt-6 grid grid-cols-1 gap-24">
          <div className="col-span-6">
            <button
              className="absolute right-0 content-center text-4xl bg-blue-500 mr-36 p-3 w-56 text-white rounded-md"
              onClick={() => setShowCreate(true)}
            >
              Create Task
            </button>

            <TaskModal onClose={() => setShowCreate(false)} show={showCreate} />
          </div>
          <div className="col-span-6">
            <button
              className="absolute right-0 content-center text-4xl bg-green-500 mr-36 p-3 w-56 text-white rounded-md"
              onClick={() => setShowCompleted(true)}
            >
              Completed
            </button>

            <CompletedTasks
              onClose={() => setShowCompleted(false)}
              show={showCompleted}
            />
          </div>
          {/* <div className="col-span-6">
            <a
              href="/homepage/create_task"
              className=" absolute right-0 text-center content-center text-4xl  text-white bg-indigo-400 w-56 mr-36 p-3 rounded-md"
            >
              Completed
            </a>
          </div> */}

          <div className="col-span-6">
            <button
              className="absolute right-0 content-center text-4xl bg-red-400 mr-36 p-3 w-56 text-white rounded-md"
              onClick={() => setShowPending(true)}
            >
              Pending
            </button>
            <PendingTasks
              onClose={() => setShowPending(false)}
              show={showPending}
            />
          </div>

          <div className="col-span-6">
            <button
              className="absolute right-0 content-center text-4xl bg-purple-400 mr-36 p-3 w-56 text-white rounded-md"
              onClick={submitTeam}
            >
              Team
            </button>
            <TeamTasks
              onClose={() => setShowAll(false)}
              show={showAll}
              data={teamList}
            />
          </div>
        </div>
      </div>
      {/* <button className="text-center text-8xl text-red-400	">Homepage</button>; */}
      <Sidebar />
      <Leaderboard />
    </div>
  );
}
