import { BsPlus, BsGearFill } from "react-icons/bs";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import CreateRoom from "./CreateRoom";
const Sidebar = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  let user_object = window.localStorage.getItem("user_data");
  user_object = JSON.parse(user_object);
  let userRooms = user_object.rooms;

  // creating a temp room object, this will get replaced by the room array in the user object
  var obj = new Object();
  obj.name = "Discord Room";
  obj.type = "monarchy";
  userRooms.push(obj);

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
