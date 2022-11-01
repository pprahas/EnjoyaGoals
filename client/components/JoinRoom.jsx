import React, { useState } from "react";
import axios from "axios";
import "./TaskModal.css";

const JoinRoom = (props) => {
	if (!props.show) {
		return null;
	}

	const [roomId, setRoomId] = useState("");


	const handleSubmit = async (e) => {
		e.preventDefault();
		let user_object = window.localStorage.getItem("user_data");
		user_object = JSON.parse(user_object);

		axios
			.post("http://localhost:8080/room/update", {
				id: roomId,
				fieldName: "users",
				add: true,
				value: user_object._id,
			})
			.then((res) => {
				console.log("Posting data", res);
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});
		
		axios
			.post("http://localhost:8080/user/update", {
				id: user_object._id,
				fieldName: "rooms",
				add: true,
				value: roomId,
			})
			.then((res) => {
				console.log("Posting data", res);
//        user_object.rooms.push(roomId);
//        window.localStorage.setItem("user_data", JSON.stringify(user_object));
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});

      axios.post("http://localhost:8080/query_database/user", {
          id: user_object._id,
      })
      .then((res) => {
        console.log("res = ", res);
      })
      .catch((err) => {
        console.log(err);
      })
	};

return (
    <div className="overlay" class="fixed pin z-50 overflow-auto flex">
      <div className="modal">
        <div className="modal-content">
          <h1 className="text-center text-6xl font-semibold pt-8 text-indigo-400	">
            Join Room
          </h1>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div class="w-full border-b border-gray-100"></div>
            <div className=" rounded-md px-4">
              <input
                id="roomId"
                name="roomId"
                type="text"
                autoComplete="roomId"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Room Id"
                onChange={(e) => setRoomId(e.target.value)}
              />

              <div className="border-t border-gray-200"></div>
            </div>
            <div class="w-full border-b border-gray-100"></div>
            <div className="px-4">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Join Room
              </button>
              <button
                type="button"
                className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={props.onClose}
              >
                Cancel
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
export default JoinRoom;