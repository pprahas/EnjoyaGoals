import axios from "axios";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const roomId = window.localStorage.getItem("currentRoom");
  const user_object = JSON.parse(window.localStorage.getItem("user_data"));
  const current_username = user_object.username;
  const [users, setUsers] = useState([]);
  const boardData = new Set();
  let count = 0;

  const eachUser = users.map((d) => {
      const username = Object.values(d)[0];
      const points = Object.values(d)[1];
  
      const level = Math.floor(points / 100) + 1;
  
      const line = points + " " + username;
  
      //console.log("username and level", username, level);
      if (current_username === username) {
        let data = [];
        axios
          .post("http://localhost:8080/user/get", {
            name: username,
          })
          .then((res) => {
            data.push(res.data[0]);
          })
          .catch((err) => {
            console.log("error", err);
          });
        return <You name={line} rank={(count += 1)} data={data} />;
      } else {
        let data = [];
        axios
          .post("http://localhost:8080/user/get", {
            name: username,
          })
          .then((res) => {
            data.push(res.data[0]);
          })
          .catch((err) => {
            console.log("error", err);
          });
        return <OtherMembers name={line} rank={(count += 1)} data={data} />;
      }
    });

  const refresh = async (e) => {
    window.location.reload();
  };

  const getUsers = async () => {
    //e.preventDefault();
    axios
      .post("http://localhost:8080/user/getRoomUsers", {
        id: roomId,
      })
      .then((res) => {
        // console.log("userobjs", res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUsers();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
    // getUsers();
    // }, [users]);
  });

  return (
    <div className="fixed w-32 overflow-auto top-0 right-0 h-screen w-20 flex flex-col bg-gray-900 text-white shadow-lg">
      <p className="text-center text-yellow-500 mt-8 text-lg font-sans-serif font-semibold">
        Leaderboard
      </p>
      {/* <button
        type="button"
        onClick={refresh}
        class="flex-row flex text-center float-right ml-1 mb-1 rounded-md border border-gray-300 bg-white px-1  text-xs font-medium leading-4 text-gray-700 
                      shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        Refresh
      </button> */}
      {eachUser}
    </div>
  );
};

const You = (props) => (
  <a
    href="/profile"
    onClick={() =>
      window.localStorage.setItem(
        "other_user_data",
        JSON.stringify(props.data[0])
      )
    }
    className="h-1 w-16 right-0 mt-4 mb-12 mr-4"
  >
    <div className="bg-red-500 flex flex-row mr-4">
      <p className="ml-3 mt-3 mr-6 ml-6">{props.rank}</p>
      <p className="ml-2 mt-3">{props.name}</p>
      {/* <img src="/pfp - LightMode.png" alt="" className="ml-2" /> */}
    </div>
  </a>
);

const OtherMembers = (props) => (
  <a
    href="/profile"
    onClick={() =>
      window.localStorage.setItem(
        "other_user_data",
        JSON.stringify(props.data[0])
      )
    }
    className="h-1 w-16 right-0 mt-4 mb-12 mr-4"
  >
    <div className="flex flex-row mr-4">
      <p className="ml-3 mt-3 mr-6 ml-6">{props.rank}</p>
      <p className="ml-2 mt-3">{props.name}</p>
      {/* <img src="/pfp - LightMode.png" alt="" className="ml-2" /> */}
    </div>
  </a>
);

export default Sidebar;
