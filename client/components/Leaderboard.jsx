import axios from "axios";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const Side = [
    <FirstThreeMembers rank="1" />,
    <FirstThreeMembers rank="2" />,
    <FirstThreeMembers rank="3" />,
    <OtherMembers rank="4" />,
    <OtherMembers rank="4" />,
    <OtherMembers rank="4" />,
    <OtherMembers rank="4" />,
    <OtherMembers rank="4" />,
    <OtherMembers rank="4" />,
    <OtherMembers rank="4" />,
  ];

  const roomId = window.localStorage.getItem("currentRoom");
  const [userData, setData] = useState([]);
  const boardData = new Set();

  useEffect(() => {
    getRoom();
    //console.log("right here",userData);
    for (let i = 0; i < userData.length; i++) {
      if (!boardData.has(userData[i])) {
        boardData.add(userData[i]);
      }
    }
    console.log("right now", boardData);
  }, []);

  const getRoom = async () => {
    //e.preventDefault();
    axios
      .post("http://localhost:8080/room/get", {
        id: roomId,
      })
      .then((res) => {
        console.log(res.data.users);
        setData(res.data.users);
        //        return (res.data.users);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  for (let i = 0; i < 20; i++) {

  }
  return (
    <div className="fixed w-32 overflow-auto top-0 right-0 h-screen w-20 flex flex-col bg-gray-900 text-white shadow-lg">
      {/* <Progressbar /> */}
      <p className="text-center text-yellow-500 mt-8 text-lg font-serif font-semibold">
        Leaderboard
      </p>
      {userData}
      {Side}
    </div>
  );
};

const FirstThreeMembers = (props) => (
  <div className="h-8 w-16 right-0 mt-4 mb-12 mr-4">
    <div className="flex flex-row mr-4">
      <p className="ml-3 mt-3 mr-6 ml-6">{props.rank}</p>
      <img src="/pfp - LightMode.png" alt="" className="ml-2" />
    </div>
    <p className="ml-16 mt-1 ">Name</p>
  </div>
);

const OtherMembers = (props) => (
  <div className="h-1 w-16 right-0 mt-4 mb-12 mr-4">
    <div className="flex flex-row mr-4">
      <p className="ml-3 mt-3 mr-6 ml-6">{props.rank}</p>
      <p className="ml-2 mt-3">Name</p>
      {/* <img src="/pfp - LightMode.png" alt="" className="ml-2" /> */}
    </div>
  </div>
);

export default Sidebar;
