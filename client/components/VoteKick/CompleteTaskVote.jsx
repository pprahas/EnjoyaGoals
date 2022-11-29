import React from "react";
import { useEffect, useState } from "react";
import "./VoteModal.css";
import axios from "axios";
import Tasks from "../Tasks/CompletedTask/CompletedTask";
import Missed from "../Tasks/MissedTask/Missed";

const CompleteTaskVote = (props) => {
    if (!props.show) {
        return null;
    }
    const [userData, setUsers] = useState([]);
    const [completedTasks, setcompletedList] = useState([]);
    const [displayTasks, setDisplayedTasks] = useState([]);
    const submitCompleted = async (e) => {
        setShowCompleted(true);
        e.preventDefault();
        let completed_list = [];
        axios
            .post("http://localhost:8080/task/completed_tasks", {
                id: roomId,
            })
            .then((res) => {
                completed_list = res.data;
                setcompletedList(completed_list);
                console.log("working", res.data);
            })
            .catch((err) => {
                console.log("error", err);
            });
    };


    const Task = (props) => (
        <span
            className="justify-center pb-2 w-full mt-2 mb-2 bg-white items-center text-white leading-none rounded-md flex "
        //role="alert"
        //onClick={() => setShow(true)}
        >
            <span className="ml-12 w-24 text-center rounded-md bg-indigo-300 uppercase px-2 py-1 text-xs font-bold mr-3">
                {props.name}
            </span>


            <button className="flex rounded-full bg-red-600 uppercase px-2 py-1 text-xs font-bold mr-3">
                +
            </button>
            <button className="flex rounded-full  bg-green-600 uppercase px-2 py-1 text-m font-extrabold mr-4">
                -
            </button>
            <button className="flex rounded-md text-gray-700 bg-white uppercase px-2 py-1 text-m font-medium mr-12 border border-gray-300">
                0
            </button>
        </span>
    );
    /*
    const getUsers = async () => {
        axios
            .post("http://localhost:8080/user/getRoomUsers", {
                id: props.data,
            })
            .then((res) => {
                let users = [];

                for (let i = 0; i < res.data.length; i++) {
                    let data = res.data[i];
                    let name = data.name;
                    users.push(<Task name={name} />);
                }
                setUsers(users);
                console.log(userData);
            })
            .catch((err) => {
                console.log("error", err);
            });
    };*/
    useEffect(() => {
        submitCompleted;
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

export default CompleteTaskVote;
