import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
const Sidebar = () => {
  return (
    <div className="fixed w-28 overflow-auto top-0 right-0 h-screen w-20 flex flex-col bg-gray-900 text-white shadow-lg">
      <SideBarIcon icon={<FaFire size="60" />} />
      <SideBarIcon icon={<BsPlus size="60" />} />
      <SideBarIcon icon={<BsFillLightningFill size="60" />} />
      <SideBarIcon icon={<FaPoo size="60" />} />
      <SideBarIcon icon={<BsGearFill size="60" />} />
      <SideBarIcon icon={<BsGearFill size="60" />} />
      <SideBarIcon icon={<BsGearFill size="60" />} />
      <SideBarIcon icon={<BsGearFill size="60" />} />
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
