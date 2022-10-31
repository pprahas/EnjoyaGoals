import { BsPlus, BsGearFill } from "react-icons/bs";
import { BiCaretRight } from "react-icons/bi";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
const Sidebar = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  var dummyRoomJson = {
    "_id": "635ece31760e04fe118bb4fd",
    "name": "testRoom",
    "owner": "635ecdd9760e04fe118bb4f9",
    "type": "Democracy",
    "users": [
        "635ecdd9760e04fe118bb4f9"
    ],
    "__v": 46,
    "assignedTasks": [],
    "completedTasks": [],
    "teamTasks": [],
    "updatedAt": "2022-10-31T18:38:37.155Z"
  }
  dummyRoomJson = JSON.stringify(dummyRoomJson);
  let user_object = window.localStorage.getItem("user_data");
  user_object = JSON.parse(user_object);
  user_object.rooms.push(dummyRoomJson);
  console.log(user_object.rooms);
  window.localStorage.setItem("user_data", JSON.stringify(user_object));
  let userRooms = user_object.rooms;

  // creating a temp room object, this will get replaced by the room array in the user object
//  var obj = new Object();
//  obj = JSON.parse(dummyRoomJson);

/*
  obj._id = "635ece31760e04fe118bb4fd";
  obj.name = "testRoom";
  obj.type = "Democracy";
  obj.owner = "635ecdd9760e04fe118bb4f9";
  obj.users = ["635ecdd9760e04fe118bb4f9", "63557b1340c7cd797a0ea840"];
  obj.assignedTasks = [];
  obj.completedTasks = [];
  obj.teamTasks = [];
  userRooms.push(obj);
*/

  const eachRoom = userRooms.map((d) => {
    const roomName = Object.values(d)[0];
    return <SideBarIcon icon={<FaFire size="60" />} text={roomName} />;
  });

  return (
    <div className="fixed w-32 overflow-auto top-0 left-0 h-screen w-20 flex flex-col bg-gray-900 text-white ">
      <div>
        <div onClick={() => setShowCreateRoom(true)}>
          <SideBarIcon icon={<BsPlus size="60" />} text="New Server" />
        </div>

        <CreateRoom
          onClose={() => setShowCreateRoom(false)}
          show={showCreateRoom}
        ></CreateRoom>
      </div>

      <div>
        <div onClick={() => setShowJoinRoom(true)}>
          <SideBarIcon icon={<BiCaretRight size="60" />} text="Join Room"/>
        </div>

        <JoinRoom 
          onClose={() => setShowJoinRoom(false)}
          show={showJoinRoom}
          ></JoinRoom>
      </div>

      {eachRoom}
      {/* <SideBarIcon icon={<FaFire size="60" />} /> */}
      <a href="/profile">
        <SideBarIcon icon={<BsGearFill size="60" />} text="Profile" />
      </a>
    </div>
  );
};

const SideBarIcon = ({ icon, text }) => (
  <div className="sidebar-icon group">
    {icon}
    <span class="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

export default Sidebar;
