import React from "react";
import { useEffect, useState } from "react";
import "./VoteModal.css";
import axios from "axios";


const VoteModal = (props) => {
    if (!props.show) {
        return null;
    }
    const [userData, setUsers] = useState([]);
    let users = [];
    let test = ["a","b","c"]
    const getUsers = async () => {
        axios
            .post("http://localhost:8080/user/getRoomUsers", {
                id: props.data,
            })
            .then((res) => {
                console.log("userobjs", res);
                setUsers(res.data);
                for (let i = 0; i < userData.length; i++) {
                    let data = userData[i];
                    let name = data.name;
                    users.push(
                        <div>
                        name
                        </div>);
                }
        
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
                            class="text-center font-medium leading-4 text-gray-700"
                        >
                            Users
                        </h4>
                    </div>

                    <div className="modal-body">
                        {users}
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
