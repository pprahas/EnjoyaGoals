import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
const Sidebar = () => {
  return (
    <div className="fixed w-28 overflow-auto top-0 right-0 h-screen w-20 flex flex-col bg-gray-900 text-white shadow-lg">
      <p className="text-center text-yellow-500 mt-8 text-lg font-serif font-semibold">
        Leaderboard
      </p>
      <SideBarIcon />
    </div>
  );
};

const SideBarIcon = ({ icon, text = "room" }) => (
  <div className="h-8 w-16 right-0 ">
    <div className="flex flex-row">
      <p className="ml-3">Name</p>

      <img src="/pfp.png" alt="" />
    </div>
  </div>
);

export default Sidebar;