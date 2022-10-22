import React from "react";
import "./Modal.css";
import Imgs from "./Imgs";

export const toBase64 = (image) => {
  fetch(image.src)
    .then((res) => res.blob())
    .then((blob) => {
      // Read the Blob as DataURL using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        // Logs data:image/jpeg;base64,wL2dvYWwgbW9yZ...

        // Convert to Base64 string
        window.localStorage.setItem("ProfilePic", reader.result);

        // Logs wL2dvYWwgbW9yZ...
      };
      reader.readAsDataURL(blob);
    });
};

const Modal = (props) => {
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
              Select a profile picture
            </h4>
          </div>
          <div className="modal-body">
            {Imgs.map((imgSrc, index) => (
              <div
                onClick={() => {
                  toBase64(imgSrc);
                }}
              >
                <img
                  src={imgSrc.src}
                  key={index}
                  width={60}
                  height={60}
                  alt="alttag"
                  className="mr-2 rounded-full outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                />
              </div>
            ))}
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

export default Modal;
