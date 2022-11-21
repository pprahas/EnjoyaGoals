//You have not attached a file with your submission. Mark as completed anyway?
import React, { useState } from "react";
import "../../Modal.css";
import axios from "axios";

const Confirm = (props) => {

    if (!props.show) {
        return null;
    }
    const close = () => {

        axios
            .post("http://localhost:8080/task/pending_tasks/submit", {
                room_id: props.roomId,
                task_id: props.id,
                feedback: props.feedback,
                completedBy: props.completedBy,
            })
            .then((res) => {
                // console.log("printing task data", res.data[0]);
                // console.log("frontend sends:", res.data);
                // window.localStorage.setItem("team_tasks", JSON.stringify(list_2));
                // console.log("its here", teamList);
                if (res.data.msg === "put more words pls") {
                    console.log("Feedback should be 7 or more characters long.");
                    alert("Feedback should be 7 or more characters long.");
                    return;
                }
                console.log("worked", res);
                alert("Task submitted successfully!");
            })
            .catch((err) => {
                // setMessage(err.response.data.message);
                console.log("error", err);
            });

    }

    const submitFileless = () => {

    }

    return (
        <div className="overlay" class="fixed pin z-50 overflow-auto flex">
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h4
                            className="modal-title"
                            class="font-medium leading-4 text-gray-700"
                        >
                            <p>You have not attached a file with your submission. </p>
                            <p>Mark as completed anyway?</p>
                        </h4>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="button"
                            onClick={close}
                            class="ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                      shadow-sm hover:bg-gray-50 focus:outline-none"

                        >
                            Yes
                        </button>
                        <button
                            className="button"
                            onClick={props.onClose}
                            class="ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                      shadow-sm hover:bg-gray-50 focus:outline-none"
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirm;