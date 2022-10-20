import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Leaderboard from "../components/Leaderboard";

function CreateTask() {
  console.log("here and there and there too man");
  return (
    <h1 className="text-center text-8xl text-red-400">Yeah sure hahaha</h1>
  );
}

export default function Homepage() {
  return (
    <div className="content-center">
      <Header />
      <h1 className="text-center text-8xl text-red-400	">Homepage</h1>;
      {/* <h1 className="text-center text-8xl text-red-400	">Homepage</h1>; */}
      <a
        href="/homepage/create_task"
        className="content-center text-8xl bg-red-400"
      >
        Create Task
      </a>
      {/* <button className="text-center text-8xl text-red-400	">Homepage</button>; */}
      <Sidebar />
      <Leaderboard />
    </div>
  );
}
