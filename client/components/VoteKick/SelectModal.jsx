import React from "react";
import { useEffect, useState } from "react";
import "./VoteModal.css";
import axios from "axios";
import VoteModal from "./VoteModal";
import CompleteTaskVote from "./CompleteTaskVote";
import PendingTaskVote from "./PendingTaskVote";


const SelectModal = (props) => {
    if (!props.show) {
        return null;
    }
    const [showVote, setShowVote] = useState(false);
    const openVote = async(e) => {
        setShowVote(true);
    }
    
    const [showCompleted, setShowCompleted] = useState(false);
    const openCompleted = async(e) => {
        setShowCompleted(true);
    }
    const [showPending, setShowPending] = useState(false);
    const openPending = async(e) => {
        setShowPending(true);
    }
      
    return (
        <div className="overlay" class="fixed pin z-50 overflow-auto flex">
            <div className="modal" onClick={props.onClose}>
                <div className="select-modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col justify-center items-center w1/4 pt-6 ">
                        <button
                            className="button"
                            onClick={openVote}
                            class="ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none"
                        >
                            Kick a Team Member
                        </button>
       

                        <VoteModal
                        onClose={() => setShowVote(false)}
                        show={showVote}
                        data={props.data} //roomID
                        />
                        <button
                            className="button"
                            onClick={openCompleted}
                            class="ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none"
                        >
                            Remove a Completed Task
                        </button>

                        <CompleteTaskVote
                        onClose={() => setShowCompleted(false)}
                        show={showCompleted}
                        data={props.data} //roomID
                        />

                        <button
                            className="button"
                            onClick={openPending}
                            class="ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none"
                        >
                            Delete a Pending Task
                        </button>

                        <PendingTaskVote
                        onClose={() => setShowPending(false)}
                        show={showPending}
                        data={props.data} //roomID
                        />

                    </div>
                    <div className=" w-32 overflow-auto w-full w-20 flex bg-white text-white border-gray-100 border-b">
                        <div className="modal-body">
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

export default SelectModal;
