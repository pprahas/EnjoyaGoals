//You have not attached a file with your submission. Mark as completed anyway?
import React, { useState } from "react";
import "../../Modal.css";
import axios from "axios";

const Confirm = (props) => {

    if (!props.show) {
        return null;
    }
    const close = () => {
        console.log("waaaaa");
        props.hasFile(false);
        props.setShow(false);
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