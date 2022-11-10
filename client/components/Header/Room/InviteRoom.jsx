import React, { useState } from "react";
import "../../Modal.css";

const Roomcode = (props) => {

    if (!props.show) {
        return null;
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
                Copy the room code shown below.
            </h4>
          </div>
          <div className="modal-body">
            {props.id}
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

export default Roomcode;
