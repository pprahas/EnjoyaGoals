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

                    <div className=" w-32 overflow-auto w-full w-20 flex bg-white text-white border-gray-100 border-t border-b">
                        <div className="modal-body">
                        {userData}
                        </div>
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
