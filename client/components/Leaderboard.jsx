import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";

const Sidebar = () => {
  const Side = [
    <SideBarIcon />,
    <SideBarIcon />,
    <SideBarIcon />,
    <SideBarIcon />,
    <SideBarIcon />,
    <SideBarIcon />,
    <SideBarIcon />,
    <SideBarIcon />,
    <SideBarIcon />,
    <SideBarIcon />,
  ];

  return (
    <div className="fixed w-32 overflow-auto top-0 right-0 h-screen w-20 flex flex-col bg-gray-900 text-white shadow-lg">
      <p className="text-center text-yellow-500 mt-8 text-lg font-serif font-semibold">
        Leaderboard
      </p>
      {Side}
    </div>
  );
};

const SideBarIcon = ({ icon, text = "room" }) => (
  <div className="h-8 w-16 right-0 mt-4 mb-12">
    <div className="flex flex-row">
      <p className="ml-3 mt-3 mr-6">1</p>
      <img src="/pfp - LightMode.png" alt="" className="ml-2" />
    </div>
    <p className="ml-16 mt-1 ">Name</p>
  </div>
);

export default Sidebar;
