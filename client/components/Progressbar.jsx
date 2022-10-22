const Progressbar = () => {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-5">
      <div
        className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-4"
        style={{ width: "45%" }}
      >
        {" "}
        45%
      </div>
    </div>
  );
};

export default Progressbar;
