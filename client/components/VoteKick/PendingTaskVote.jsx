import React from "react";
import { useEffect, useState } from "react";
import "./VoteModal.css";
import axios from "axios";


const PendingTaskVote = (props) => {
    if (!props.show) {
        return null;
    }
    const [displayTasks, setDisplayedTasks] = useState([]);

    const Task = (props) => (
        <span className="justify-center pb-2 w-full mt-2 mb-2 bg-white items-center text-white leading-none rounded-md flex ">
        <span className="ml-12 w-24 text-center rounded-md bg-indigo-300 uppercase px-2 py-1 text-xs font-bold mr-3">
          {props.name}
        </span>
  
        <button
          className="flex rounded-full bg-red-600 uppercase px-2 py-1 text-xs font-bold mr-3"
          onClick={() => {
            updateVotes(props.ID, true);
          }}
        >
          +
        </button>
        <button
          className="flex rounded-full  bg-green-600 uppercase px-2 py-1 text-m font-extrabold mr-4"
          onClick={() => {
            updateVotes(props.ID, false);
          }}
        >
          -
        </button>
        <button className="flex rounded-md text-gray-700 bg-white uppercase px-2 py-1 text-m font-medium mr-12 border border-gray-300">
          {props.votes}
        </button>
      </span>
    );

    const updateVotes = async (ID, action) => {
        let roomId = props.data;
        console.log(ID, action);
        
        axios
          .post("http://localhost:8080/vote/kick/pending_tasks", {
            roomId: roomId,
            taskId: ID,
            action: action,
          })
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((err) => {
            console.log("error", err);
            window.location.reload();
          });
      };
    
    const getTasks = async () => {
        axios
          .post("http://localhost:8080/vote/show/pending_tasks", {
            roomId: props.data,
          })
          .then((res) => {
            let tasks = [];            
            for (const [key, value] of Object.entries(res.data)) {
                //console.log(key, value);
                let ID = key;
                let name = value.split("!@#$")[0];
                let votes = value.split("!@#$")[1];
           //   if (user_object._id != UID) {
                tasks.push(<Task name={name} ID={ID} votes={votes} />);
          //    }
            }
            setDisplayedTasks(tasks);
          })
          .catch((err) => {
            console.log("error", err);
          });
      };
      useEffect(() => {
        getTasks();
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
                            Choose a task to remove from the List.
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
                            X Votes to Remove
                        </h6>
                    </div>

                    <div className=" items-center justify-center w-32 overflow-auto w-full w-20 flex bg-white text-white border-gray-100 border-t border-b">
                        <div className="modal-body">
                        {displayTasks}
                        </div>
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

export default PendingTaskVote;
