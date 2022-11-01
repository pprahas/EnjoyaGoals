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
  let userRooms = user_object.rooms;
  let roomId = "23234";

  // creating a temp room object, this will get replaced by the room array in the user object
  var obj = new Object();
  obj.name = "Discord Room";
  obj.type = "monarchy";
  obj.roomId = "63477176250a07c21330fbe1";
  userRooms.push(obj);

  var obj2 = new Object();
  obj2.name = "Room";
  obj2.type = "monarchy";
  obj2.roomId = "13477176250a07c21330fbe1";
  userRooms.push(obj2);

  const eachRoom = userRooms.map((d) => {
    let roomName = Object.values(d)[0];
    let roomId = Object.values(d)[2];
    return (
      <SideBarIcon icon={<FaFire size="60" />} text={roomId} id={roomId} />
    );
  });

  const roomSwitch = () => {
    console.log("room switch");
    // window.localStorage.removeItem("currentRoom");
    // window.localStorage.setItem("currentRoom", id);
  };

  return (
    <div className="fixed w-32 overflow-auto top-0 left-0 h-screen w-20 flex flex-col bg-gray-900 text-white ">
      <div>
        <div onClick={() => setShowCreateRoom(true)}>
          <SideBarIcon icon={<BsPlus size="60" />} text="New Room" />
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
      <div>
        <div onClick={roomSwitch}>
          <a>{eachRoom}</a>
        </div>
      </div>

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
