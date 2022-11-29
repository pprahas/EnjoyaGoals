import React from "react";
import { useEffect, useState } from "react";
import "./VoteModal.css";
import axios from "axios";


const VoteModal = (props) => {
    if (!props.show) {
        return null;
    }
    const [userData, setUsers] = useState([]);

    const User = (props) => (
        <button
            className=" pb-2 w-full mt-2 mb-2 justify-center bg-white items-center text-white leading-none rounded-md flex lg:inline-flex"
        //role="alert"
        //onClick={() => setShow(true)}
        >
            <span className="ml-12 w-24 text-center rounded-md bg-indigo-300 uppercase px-2 py-1 text-xs font-bold mr-3">
                {props.name}
            </span>

            <span className="text-center font-semibold text-black text-left  flex-auto">
            </span>
            
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                yes
            </span>
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-12">
                no
            </span>
        </button>

        /*
        <div className="h-1 w-16 right-0 mt-4 mb-12 mr-4">
            <div className="col-span-6 ml-6 text-gray-700 flex flex-row mr-4">
                <p>{props.name}</p>
                <button type="button" className="ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm  leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none">Kick</button>
                <p>0</p>
                <button type="button" className="ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm  leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none">Don't Kick</button>
                <p>0</p>
            </div>
        </div>*/
    );

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
                    users.push(<User name={name} />);
                }
                setUsers(users);
                console.log(userData);
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
                    </div>

                    <div className=" w-32 overflow-auto w-full w-20 flex flex-col bg-white text-white border-gray-100 border-t border-b">
                        {userData}
                    </div>
                    <div className="modal-footer">
                        <button
                            className="button"
                            onClick={props.onClose}
                            class="ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none"
                        >
                            Confirm
                        </button>
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
