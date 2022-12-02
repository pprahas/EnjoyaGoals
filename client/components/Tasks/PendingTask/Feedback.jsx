import React from "react";
import "../../Modal.css";
import axios from "axios";
import { useState } from "react";
import Confirm from "./Confirm";

const TextInput = (props) => {
  if (!props.show) {
    return null;
  }
  const [feedback, setFeedback] = useState(" ");
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  //false means there is no file, true means file
  const [hasFile, setFileFlag] = useState(true);
  const [uid, setUID] = useState(null);

  const feedbackHandler = (event) => {
    setFeedback(event.target.value);
  };

  const handleFile = (e) => {
    let file = e.target.files[0];
    setSelectedFile({ file: file });
  };

  const fileHandler = (event) => {
    let testfile = event.target.files;
    let file = null;
    let fileName = "";
    //Check File is not Empty
    if (testfile.length > 0) {
      // Select the very first file from list
      let fileToLoad = testfile[0];
      fileName = fileToLoad.name;
      // FileReader function for read the file.
      let fileReader = new FileReader();
      // Onload of file read the file content
      fileReader.onload = function (fileLoadedEvent) {
        file = fileLoadedEvent.target.result;
        setSelectedFile({ fileData: file, fileName: fileName });
      };
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  };

  const submitTask = async (e) => {
    let user_object = window.localStorage.getItem("user_data");
    user_object = JSON.parse(user_object);
    setUID(user_object._id);
    const roomId = window.localStorage.getItem("currentRoom");
    e.preventDefault();
    if (selectedFile != null) {
      /*
      // original file upload system
      let file = selectedFile.file;
      let formData = new FormData();
      formData.append("file", file);
      formData.append("task_id", props.id);
      // formData.append("name", "Prahas");
      console.log(props.id, "task id isssssssssss");

      // let json = await convert2JSON(formData);
      axios({
        url: "http://localhost:8080/task/pending_tasks/upload",
        method: "POST",
        data: formData,
        //   data: json,
      }).then((res) => {
        console.log("here", res);
      });
      */
      if (selectedFile != null) {
        axios
          .post("http://localhost:8080/task/pending_tasks/test_upload", {
            task_id: props.id,
            fileData: selectedFile.fileData,
            fileName: selectedFile.fileName,
          })
          .then((res) => {
            console.log("testing", res);
          });
      }
      axios
        .post("http://localhost:8080/task/pending_tasks/submit", {
          room_id: roomId,
          task_id: props.id,
          feedback: feedback,
          completedBy: user_object._id,
        })
        .then((res) => {
          if (res.data.msg === "put more words pls") {
            console.log("Feedback should be 7 or more characters long.");
            props.createNotif(
              "warning",
              "Error!",
              "Feedback should be 7 or more characters long."
            );
            return;
          }
          console.log("worked", res);

          console.log("trying to update the progress bar 2");
          props.createNotif(
            "success",
            "Success!",
            "Task submitted successfully."
          );
        })
        .catch((err) => {
          // setMessage(err.response.data.message);
          console.log("error", err);
        });
    } else {
      //alert("You have not attached a file to the task.")
      setShow(true);
      console.log(hasFile);
    }
    // axios
    //   .post("http://localhost:8080/task/pending_tasks/upload", {
    //     // task_id: props.id,
    //     // room_id: roomId,
    //     formData,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);

    //const form = new FormData();

    //form.append("file", selectedFile.data);
    // for (var pair of form.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    //   console.log(pair[1]);
    // }

    /*
        axios.post(("http://locahost:8080/task/pending_tasks/upload"), {
            task_id: props.id,
            file: form,
        }).then((res) => {
        }).catch((err) => {
        });
        */
  };

  function convert2JSON(formData) {
    let obj = {};
    for (let key of formData.keys()) {
      obj[key] = formData.get(key);
    }
    return JSON.stringify(obj);
  }

  return (
    <div className="overlay" class="fixed pin z-50 overflow-auto flex">
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-body">
            <div className="ml-2 text-gray-500">Feedback:</div>
            <textarea
              id="about"
              name="about"
              rows={7}
              className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Submit your feedback here"
              onChange={feedbackHandler}
              value={feedback}
            />
          </div>

          <input
            type="file"
            name="file"
            onChange={fileHandler}
            //File handler button
          />

          <div className="modal-footer">
            <button
              className="button"
              onClick={submitTask}
              class="mt-4 ml-2 mb-0 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-600 
                            shadow-sm hover:bg-gray-200 focus:outline-none"
            >
              Submit
            </button>

            <Confirm
              onClose={() => setShow(false)}
              show={show}
              hasFile={setFileFlag}
              setShow={setShow}
              roomId={window.localStorage.getItem("currentRoom")}
              id={props.id}
              feedback={feedback}
              completedBy={uid}
              createNotif={props.createNotif}
            />

            <button
              className="button"
              onClick={props.onClose}
              s
              class="mt-4 ml-2 mb-0 rounded-md border border-gray-300 bg-red-500 py-2 px-4 text-sm font-medium leading-4 text-white 
                            shadow-sm hover:bg-red-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
