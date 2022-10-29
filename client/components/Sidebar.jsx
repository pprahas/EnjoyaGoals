import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
const Sidebar = () => {
  const createRoom = () => {
    console.log("creating room");
  };

  return (
    <div className="fixed w-32 overflow-auto top-0 left-0 h-screen w-20 flex flex-col bg-gray-900 text-white shadow-lg">
      <div onClick={createRoom}>
        <SideBarIcon icon={<BsPlus size="60" />} />
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
