import { useState, useEffect } from "react";
import axios from "axios";
const Progressbar = (props) => {
  const [data, setData] = useState(null);
  let roomId = window.localStorage.getItem("currentRoom");

  const handleSubmit = async () => {
    // e.preventDefault();
    //console.log(id)
    axios
      .post("http://localhost:8080/progress_bar", {
        id: roomId,
      })
      .then((res) => {
        // console.log(res.data.percent);
        // console.log("inside itch");
        window.localStorage.setItem("percentageComp", res.data.percent);
        window.localStorage.setItem("numberComp", res.data.number);
        setData(res.data.number);
        // window.location.reload();
      })
      .catch((err) => {
        // setMessage(err.response.data.message);
        console.log(message);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleSubmit();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  // fetchData() is called whenever data is updated.
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
