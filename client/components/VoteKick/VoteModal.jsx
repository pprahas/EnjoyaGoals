import React from "react";
import { useEffect, useState } from "react";
import "./VoteModal.css";
import axios from "axios";
//vote to kick any members of the room

const VoteModal = (props) => {
  let user_object = window.localStorage.getItem("user_data");
  user_object = JSON.parse(user_object);

  if (!props.show) {
    return null;
  }

  const [userData, setUsers] = useState([]);

  const User = (props) => (
    <span className="justify-center pb-2 w-full mt-2 mb-2 bg-white items-center text-white leading-none rounded-md flex ">
      <span className="ml-12 w-24 text-center rounded-md bg-indigo-300 uppercase px-2 py-1 text-xs font-bold mr-3">
        {props.name}
      </span>

      <button
        className="flex rounded-full bg-red-600 uppercase px-2 py-1 text-xs font-bold mr-3"
        onClick={() => {
          updateVotes(props.UID, true);
        }}
      >
        +
      </button>
      <button
        className="flex rounded-full  bg-green-600 uppercase px-2 py-1 text-m font-extrabold mr-4"
        onClick={() => {
          updateVotes(props.UID, false);
        }}
      >
        -
      </button>
      <button className="flex rounded-md text-gray-700 bg-white uppercase px-2 py-1 text-m font-medium mr-12 border border-gray-300">
        {props.votes}
      </button>
    </span>
  );

  const updateVotes = async (UID, action) => {
    let roomId = props.data;
    const currentRoomID = window.localStorage.getItem("currentRoom");
    const user_object = JSON.parse(window.localStorage.getItem("user_data"));
    const userID = user_object._id;
    axios
      .post("http://localhost:8080/vote/kick/team_member", {
        roomId: roomId,
        userId: UID,
        action: action,
      })
      .then((res) => {
        console.log(res.status);
        if (res.status == 201) {
          // remove User from Room Object's users[] array
          axios
            .post("http://localhost:8080/room/update", {
              id: currentRoomID,
              fieldName: "users",
              remove: true,
              value: UID,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });

          // remove Room from User Object's rooms[] array
          axios
            .post("http://localhost:8080/user/updateOM", {
              id: UID,
              fieldName: "rooms",
              remove: true,
              value: currentRoomID,
            })
            .then((res2) => {
              console.log(res2.data);
              // window.localStorage.setItem(
              //   "currentRoom",
              //   res2.data.rooms[0]._id
              // );
              // window.localStorage.setItem(
              //   "user_data",
              //   JSON.stringify(res2.data)
              // );
            })
            .catch((err2) => {
              console.log(err2);
            });
          console.log("the user is gonna get kicked.");
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
        window.location.reload();
      });
  };
  const getUsers = async () => {
    axios
      .post("http://localhost:8080/vote/show/team_member", {
        roomId: props.data,
      })
      .then((res) => {
        let users = [];
        console.log(res.data);

        for (const [key, value] of Object.entries(res.data)) {
          //console.log(key, value);
          let UID = key;
          let name = value.split("!@#$")[0];
          let votes = value.split("!@#$")[1];
          if (user_object._id != UID) {
            users.push(<User name={name} UID={UID} votes={votes} />);
          }
        }
        setUsers(users);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="overlay" class="fixed pin z-50 overflow-auto flex">
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4
              className="modal-title"
              class="text-center font-medium text-2xl leading-4 text-gray-700 mb-4 mt-4 "
            >
              Choose someone to vote out.
            </h4>
            <h5
              className="modal-title"
              class="text-center font-medium text-xl leading-4 text-gray-700 mb-4 mt-4 "
            >
              (+) = vote out, (-) = keep in
            </h5>
            <h6
              className="modal-title"
              class="text-center font-medium text-l leading-4 text-gray-700 mb-4 mt-4 "
            >
              X Votes to Kick
            </h6>
          </div>

          <div className=" items-center justify-center w-32 overflow-auto w-full w-20 flex bg-white text-white border-gray-100 border-t border-b">
            <div className="modal-body">{userData}</div>
          </div>
          <div className="modal-footer">
            <button
              className="button"
              onClick={props.onClose}
              class="ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
