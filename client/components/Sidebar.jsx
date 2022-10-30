import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { useState } from "react";
import { FaFire, FaPoo } from "react-icons/fa";
import CreateRoom from "./CreateRoom";
const Sidebar = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const createRoom = () => {
    console.log("creating room");
  };

  return (
    <div className="fixed w-32 overflow-auto top-0 left-0 h-screen w-20 flex flex-col bg-gray-900 text-white shadow-lg">
      <div>
        <div onClick={() => setShowCreateRoom(true)}>
          <SideBarIcon icon={<BsPlus size="60" />} />
        </div>

        <CreateRoom
          onClose={() => setShowCreateRoom(false)}
          show={showCreateRoom}
        ></CreateRoom>
      </div>

      <SideBarIcon icon={<FaFire size="60" />} />
      <SideBarIcon icon={<BsFillLightningFill size="60" />} />
      <SideBarIcon icon={<FaPoo size="60" />} />
      <a href="/profile">
        <SideBarIcon icon={<BsGearFill size="60" />} />
      </a>
    </div>
  );
};

const SideBarIcon = ({ icon, text = "room" }) => (
  <div className="sidebar-icon group">
    {icon}
    {/* <span class="sidebar-tooltip group-hover:scale-100">{text}</span> */}
  </div>
);

export default Sidebar;
