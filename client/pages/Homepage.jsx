import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import TaskModal from "../components/Tasks/CreateTask/CreateTask";
import { useState } from "react";
import CompletedTasks from "../components/Tasks/List/Completed/CompletedTasks";
import PendingTasks from "../components/Tasks/List/Pending/PendingTasks";
import TeamTasks from "../components/Tasks/List/Team/TeamTasks";
import Posts from "../components/Posts/Posts";
import axios from "axios";
import { useEffect } from "react";
import MyCompleted from "../components/Tasks/List/Completed/MyCompleted";

const Homepage = (props) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showMine, setShowMine] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showVote, setShowVote] = useState(false);
  let list = [];
  const [teamList, setteamList] = useState(list);
  const [pendingList, setpendingList] = useState([]);
  const [completedList, setcompletedList] = useState([]);

  let user_object = window.localStorage.getItem("user_data");
  user_object = JSON.parse(user_object);
  const username = user_object.username;

  const roomId = window.localStorage.getItem("currentRoom");
  useEffect(() => {
    console.log(teamList);
  }, [teamList]);

  const openVote = async(e) => {
    setShowVote(true);
    //axios to get room data
    //open modal
    //send room data over as props
  }

  const submitTeam = async (e) => {
    props.createNotif("info", "Information", "This is a test from homepage");
    setShowAll(true);
    let list_2 = [];
    e.preventDefault();
    axios
      .post("http://localhost:8080/task/team_tasks", {
        id: roomId,
      })
      .then((res) => {
        // console.log("printing task data", res.data[0]);
        // console.log("frontend sends:", res.data);
        list_2 = res.data;
        setteamList(list_2);
        console.log(`notifs = ${notifs}`);
        // window.localStorage.setItem("team_tasks", JSON.stringify(list_2));
        // console.log("its here", teamList);
      })
      .catch((err) => {
        // setMessage(err.response.data.message);

        console.log("error", err);
      });
  };
  const submitPending = async (e) => {
    setShowPending(true);
    e.preventDefault();
    let pending_list = [];
    axios
      .post("http://localhost:8080/task/pending_tasks", {
        id: roomId,
        username: username,
      })
      .then((res) => {
        pending_list = res.data;
        setpendingList(pending_list);
        console.log("working", res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const submitCompleted = async (e) => {
    setShowCompleted(true);
    e.preventDefault();
    let completed_list = [];
    axios
      .post("http://localhost:8080/task/completed_tasks", {
        id: roomId,
      })
      .then((res) => {
        completed_list = res.data;
        setcompletedList(completed_list);
        console.log("working", res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const submitMine = async (e) => {
    setShowMine(true);
    e.preventDefault();
    let completed_list = [];
    axios
      .post("http://localhost:8080/task/completed_tasks", {
        id: roomId,
      })
      .then((res) => {
        completed_list = res.data;
        setcompletedList(completed_list);
        console.log("working", res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="content-center">
      <div className="grid grid-flow-col auto-cols-max">
        <div className="mt-32 w-3/4 ml-16">
           
          <Posts />
        </div>
        {/* <h1 className="text-center text-8xl text-red-400	">Homepage</h1>; */}
        <div className="fixed right-0">
        <Header createNotif={props.createNotif}/>

        <div className="relative mt-40 grid grid-cols-1 gap-24">
          <div className="col-span-6">
            <button
              className="absolute right-0 content-center text-4xl bg-purple-400 mr-36 p-3 w-56 text-white rounded-md"
              onClick={submitMine}
            >
              My Tasks
            </button>

            <MyCompleted
              onClose={() => setShowMine(false)}
              show={showMine}
              data={completedList}
              UID={user_object._id}
            />
          </div>
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
              className="absolute right-0 content-center text-4xl bg-indigo-300 mr-36 p-3 w-56 text-white rounded-md"
              onClick={submitTeam}
            >
              Team Tasks
            </button>
            <TeamTasks
              onClose={() => setShowAll(false)}
              show={showAll}
              data={teamList}
            />
          </div>

          <div className="col-span-6">
            <button
              className="absolute right-0 content-center text-4xl bg-red-400 mr-36 p-3 w-56 text-white rounded-md"
              onClick={submitPending}
            >
              Pending
            </button>
            <PendingTasks
              onClose={() => setShowPending(false)}
              show={showPending}
              data={pendingList}
            />
          </div>

          <div className="col-span-6">
            <button
              className="absolute right-0 content-center text-4xl bg-green-500 mr-36 p-3 w-56 text-white rounded-md"
              onClick={submitCompleted}
            >
              Completed
            </button>

            <CompletedTasks
              onClose={() => setShowCompleted(false)}
              show={showCompleted}
              data={completedList}
              UID={user_object._id}
            />
          </div>

          <div className="col-span-6">
            <button
              className="font-bold absolute right-0 content-center text-4xl bg-red-600 mr-36 p-3 w-56 text-white rounded-md"
              //onClick={}
            >
              Call a vote
            </button>

            <CompletedTasks
              onClose={() => setShowCompleted(false)}
              show={showCompleted}
              data={completedList}
              UID={user_object._id}
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
          </div>
        </div>
      </div>
      {/* <button className="text-center text-8xl text-red-400	">Homepage</button>; */}
      <Sidebar createNotif={props.createNotif}/>
      <Leaderboard createNotif={props.createNotif}/>
    </div>
  );
};

export default Homepage;