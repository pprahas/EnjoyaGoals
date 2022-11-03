import Progressbar from "./Progressbar";
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

  return (
    <div className="fixed w-32 overflow-auto top-0 right-0 h-screen w-20 flex flex-col bg-gray-900 text-white shadow-lg">
      {/* <Progressbar /> */}
      <p className="text-center text-yellow-500 mt-8 text-lg font-sans-serif font-semibold">
        Leaderboard
      </p>
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
