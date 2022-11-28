import { BsPlus, BsGearFill } from "react-icons/bs";
import { BiCaretRight } from "react-icons/bi";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";

const Sidebar = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  let user_object = window.localStorage.getItem("user_data");
  user_object = JSON.parse(user_object);
  window.localStorage.setItem("user_data", JSON.stringify(user_object));
  let userRooms = user_object.rooms;
  let eachRoom=[];
  for (let i = 0; i < userRooms.length; i++) {
    let room = userRooms[i];
    const posts = room.posts;
    const roomID = room._id;
    const roomName = room.name;
    eachRoom.push(
      <button
        key={roomID}
        onClick={() => {
          window.localStorage.setItem("currentRoom", roomID);
          window.location.reload();
        }}
      >
        <SideBarIcon icon={<FaFire size="60" />} text={roomName} />
      </button>
    );
  };
  /*
  const eachRoom = userRooms.map((d) => {
    const roomName = Object.values(d)[1];
    const roomID = Object.values(d)[0];
    return (
      <button
        key={roomID}
        onClick={() => {
          window.localStorage.setItem("currentRoom", roomID);
          window.location.reload();
        }}
      >
        <SideBarIcon icon={<FaFire size="60" />} text={roomName} />
      </button>
    );
  });*/
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
          <SideBarIcon icon={<BiCaretRight size="60" />} text="Join Room" />
        </div>

        <JoinRoom
          onClose={() => setShowJoinRoom(false)}
          show={showJoinRoom}
        ></JoinRoom>
      </div>

      {eachRoom}
      {/* <SideBarIcon icon={<FaFire size="60" />} /> */}

      {
        <a href="/profile">
          <SideBarIcon icon={<BsGearFill size="60" />} text="Profile" />
        </a>
      }
    </div>
  );
};

const SideBarIcon = ({ icon, text }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

export default Sidebar;
