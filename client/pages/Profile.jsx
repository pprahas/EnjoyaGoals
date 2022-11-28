import { LockClosedIcon } from "@heroicons/react/20/solid";
// import Input from "../components/Input";
import Header from "../components/Header/Header";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile(props) {

  const [aboutMe, setAboutMe] = useState("");
  var bg = window.localStorage.getItem("banner");
  const roomId = window.localStorage.getItem("currentRoom");
  var img = new Image();
  img.src = bg;
  let user_object = window.localStorage.getItem("user_data");
  user_object = JSON.parse(user_object);
  const [pfp, setpfp] = useState("");
  const [background, setbg] = useState("");
  const [color, setcolor] = useState("");

  // update user object *this is scuffed*
  axios
    .post("http://localhost:8080/query_database/user", {
      id: user_object._id,
    })
    .then((res) => {
      window.localStorage.setItem("user_data", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });

  axios
    .post("http://localhost:8080/user_info/get/about_me", {
      userId: user_object._id,
      roomId,
    })
    .then((res) => {
      console.log(res.data);
      setAboutMe(res.data);
      // window.localStorage.setItem("user_data", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });

  user_object = window.localStorage.getItem("user_data");
  user_object = JSON.parse(user_object);

  const firstName = user_object.firstName;
  const lastName = user_object.lastName;
  const email = user_object.email;
  const username = user_object.username;
  const pointsEarnedMap = new Map(Object.entries(user_object.pointsEarned));
  const points = pointsEarnedMap.get(
    window.localStorage.getItem("currentRoom").toString()
  );
  const lvl = Math.floor(points / 100) + 1;

  // const [roomName, setRoomName] = useState("Room Name");

  // const roomId = window.localStorage.getItem("currentRoom");
  const [roomName, setRoomName] = useState("Room Name");
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const [total, setTotal] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [pendingTaskCount, setPendingCount] = useState(0);

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = async () => {
    axios
      .post("http://localhost:8080/room/get", {
        id: roomId,
      })
      .then((res) => {
        console.log(user_object);
        setRoomName(res.data.name);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  axios
    .post("http://localhost:8080/task/task_count", {
      id: roomId,
      username: username,
    }).then((res) => {
      setPendingCount(res.data[0]);
      setCompleteCount(res.data[3]);
    });
  //console.log(user_object);
  axios
    .post("http://localhost:8080/task/completed_tasks_personal", {
      id: roomId,
      UID: user_object._id,
    })
    .then((res) => {
      let points = 0;
      let easyCount = 0;
      let medCount = 0;
      let hardCount = 0;
      for (let i = 0; i < res.data.length; i++) {
        let task = res.data[i];
        if (task.status != "missed") {
          points += task.points;
          if (task.difficulty == "Easy") {
            easyCount += 1;
          } else if (task.difficulty == "Medium") {
            medCount += 1;
          } else if (task.difficulty == "Hard") {
            hardCount += 1;
          }
        }
        setEasy(easyCount);
        setMedium(medCount);
        setHard(hardCount);
        setTotal(points);
      })
      .catch((err) => {
        console.log("error", err);
      });
    axios
      .post("http://localhost:8080/user/get_profile_data", {
        id: user_object._id,
      })
      .then((res) => {

        console.log(res);
        //set pfp
        const fileType = res.data[0];
        const imgData = res.data[1];
        const toPFP = fileType + imgData;
        setpfp(toPFP);

        //set banner image
        const bannFileType = res.data[2];
        const bannImgData = res.data[3];
        const tobanner = bannFileType + bannImgData;
        var im = new Image();
        im.src = tobanner
        //console.log(im);
        setbg(im);

        //set color
        setcolor(res.data[4]);

      })
      .catch((err) => {
        // setMessage(err.response.data.message);
      console.log("error", err);
      });
  }

  console.log(`lvl = ${lvl}`);

  return (

    <div>
      <Header />
      {/* component */}
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              /*backgroundImage:
            'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',*/
              backgroundImage: "url('" + background.src + "')",
            }}
          >
            {/** 
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            />*/}
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x={0}
              y={0}
            >

            </svg>
          </div>
        </section>
        {/** Color change here */}

        <section
          className="relative py-16"
          style={{
            backgroundColor: color,
          }}
        >
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-3/12 px-4 lg:order-2 flex justify-center z-0">
                    <div className="relative">
                      <img
                        alt="..."
                        src={pfp}
                        className="bg-white rounded-full  justify-center align-middle border-none absolute -mb-32 -m-14 mr-0 lg:-m-16 lg:-ml-16 max-w-150-px ring-4 ring-indigo-300"
                        style={{
                          width: "150px",
                          height: "150px",
                        }}
                      />
                    </div>
                    {/* <span class="mt-16 lg:mt-14 leading-none items-center justify-center text-center flex inset-x-0 w-12 h-12 lg:-ml-3  bg-white 
                    border-4 border-indigo-300 dark:border-gray-800 rounded-full z-10 text-blueGray-500 font-bold uppercase"> */}
                    <span
                      className="mt-16 lg:mt-14 leading-none items-center justify-center text-center flex inset-x-0 w-12 h-12 lg:-ml-3  bg-white 
                    border-4 border-indigo-300 dark:border-gray-800 rounded-full z-10 text-blueGray-500 font-bold uppercase"
                    >
                      Lv.<br></br>
                      {lvl}
                    </span>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <a
                        className="bg-red-500 active:bg-red-700 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        href="/homepage"
                      >
                        Return to {roomName}
                      </a>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {easy}
                        </span>
                        <span className="text-sm text-blueGray-400">Easy</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {medium}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Medium
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {hard}
                        </span>
                        <span className="text-sm text-blueGray-400">Hard</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  {/**
                   * <a class="flex justify-center items-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800" href="#">+99</a> */}
                  {/* <div class="text-center justify-center items-center flex flex-row"> */}
                  <div className="text-center justify-center items-center flex flex-row">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {firstName} {lastName}
                    </h3>
                    {/* <a class="ml-3 w-8 h-8 rounded-md border border-gray-300 bg-white text-sm font-medium leading-4 text-gray-700 
                      shadow-sm hover:bg-gray-50 focus:outline-none" href="/Profile_Information"> */}
                    <a
                      className="ml-3 w-8 h-8 rounded-md border border-gray-300 bg-white text-sm font-medium leading-4 text-gray-700 
                      shadow-sm hover:bg-gray-50 focus:outline-none"
                      href="/Profile_Information"
                    >
                      <img
                        src="Gear-icon.png"
                        alt="Settings"
                        style={{
                          width: "2rem",
                          height: "2rem",
                        }}
                      />
                    </a>
                  </div>
                  <div>
                    <span className="mb-2 text-center text-blueGray-500">
                      {email}
                    </span>
                  </div>
                  <div>
                    <span className="mb-2 text-center text-blueGray-500">
                      {username}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-green-600">
                        Completed:
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {completeCount}
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        Total Points:
                      </span>
                      <span className="text-lg font-bold text-blueGray-400">
                        {total}
                      </span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-red-600">
                        Pending:
                      </span>
                      <span className="text-lg font-bold text-red-600">
                        {pendingTaskCount}
                      </span>
                    </div>
                    {/*
                    <div className="w-full lg:w-9/12 px-4">

                    
                      <ul className="mt-1 text-lg leading-relaxed text-blueGray-700">
                        {list.map((item) => (
                          <li key={item.id}>{item.name}</li>
                        ))}
                      </ul>
                     
                    </div>
                     */}
                  </div>
                  <div className="mt-10 py-4 border-t border-blueGray-200 text-center"></div>
                  <div className="mt-1">
                    <p>{aboutMe}</p>
                    {/* <p
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {aboutMe}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
