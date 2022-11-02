const Progressbar = (props) => {
  var w = "percentageComp in localStorage"
    ? window.localStorage.getItem("percentageComp")
    : 0;
  let number = window.localStorage.getItem("numberComp");
  return (
    <div className="flex flex-row w-fit bg-gray-200 rounded-full dark:bg-gray-700 mt-5">
      <div
        className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-4"
        style={{ width: w + "%" }}
      >
        {" "}
        {w}%
      </div>
    </div>
  );
};

export default Progressbar;
