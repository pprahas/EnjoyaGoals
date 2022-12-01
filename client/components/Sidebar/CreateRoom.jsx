import React, { useState } from "react";
import axios from "axios";
import "../Tasks/TaskModal.css";

const CreateRoom = (props) => {
  if (!props.show) {
    return null;
  }
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(roomName, roomType);
    let user_object = window.localStorage.getItem("user_data");
    user_object = JSON.parse(user_object);

    const users = [user_object._id];
    axios
      .post("http://localhost:8080/room/create", {
        // creatorId: user_id,
        name: roomName,
        owner: user_object,
        type: roomType,
        users: users,
      })
      .then((res) => {
        props.createNotif("success", "Success!", "Room created.");
        console.log("Posting data", res);
      })
      .catch((err) => {
        props.createNotif("error", "Error!", "Room not created.");
        setMessage(err.response.data.msg);
        console.log(err.response.data.msg);
      });
  };

  return (
    // <div className="overlay" class="fixed pin z-50 overflow-auto flex">
    <div className="fixed pin z-50 overflow-auto flex">
      <div className="modal">
        <div className="modal-content">
          <h1 className="text-center text-6xl font-semibold pt-8 text-indigo-400	">
            Create Room
          </h1>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            {/* <div class="w-full border-b border-gray-100"></div> */}
            <div className="w-full border-b border-gray-100"></div>
            <div className=" rounded-md px-4">
              <input
                id="room_name"
                name="room_name"
                type="text"
                autoComplete="room_name"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Room Name"
                onChange={(e) => setRoomName(e.target.value)}
              />

              <input
                id="room_type"
                name="room_type"
                autoComplete="room_type"
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Room Type"
                list="type"
                onChange={(e) => setRoomType(e.target.value)}
                value={roomType}
              />
              <datalist id="type">
                <option value="Democracy" />
                <option value="Monarchy" />
              </datalist>

              <div className="border-t border-gray-200"></div>
            </div>
            {/* <div class="w-full border-b border-gray-100"></div> */}
            <div className="w-full border-b border-gray-100"></div>
            <div className="px-4">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Room
              </button>
              <button
                type="button"
                className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={props.onClose}
              >
                Abort
              </button>
              <div></div>
              &nbsp;
              <div></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateRoom;
