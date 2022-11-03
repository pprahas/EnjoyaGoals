import React from "react";
import "./Modal.css";
import axios from "axios";
import { useState } from "react";

const TextInput = (props) => {
  if (!props.show) {
    return null;
  }
  const [feedback, setFeedback] = useState(" ");
  const [selectedFile, setSelectedFile] = useState(null);

  const feedbackHandler = (event) => {
    setFeedback(event.target.value);
  };

  const handleFile = (e) => {
    let file = e.target.files[0];
    // console.log(e.target.files, "$$$$");
    // console.log(e.target.files[0], "$$$$");
    setSelectedFile({ file: file });
  };

  const submitTask = async (e) => {
    const roomId = window.localStorage.getItem("currentRoom");
    e.preventDefault();
    let file = selectedFile.file;
    let formData = new FormData();
    formData.append("file", file);
    formData.append("task_id", props.id);
    // formData.append("name", "Prahas");
    console.log(selectedFile, "STATE $$$$$");

    // let json = await convert2JSON(formData);
    axios({
      url: "http://localhost:8080/task/pending_tasks/upload",
      method: "POST",
      data: formData,
      //   data: json,
    }).then((res) => {
      console.log("here", res);
    });

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

    const form = new FormData();
    form.append("file", selectedFile.data);
    // for (var pair of form.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    //   console.log(pair[1]);
    // }

    /*
        axios.post(("http://locahost:8080/task/pending_tasks/upload"), {
            task_id: props.id,
            file: form,
        }).then((res) => {
            console.log("cool");
        }).catch((err) => {
            console.log("AAAAAAAAAAA");
        });
        */
    axios
      .post("http://localhost:8080/task/pending_tasks/submit", {
        room_id: roomId,
        task_id: props.id,
        feedback: feedback,
      })
      .then((res) => {
        // console.log("printing task data", res.data[0]);
        // console.log("frontend sends:", res.data);
        // window.localStorage.setItem("team_tasks", JSON.stringify(list_2));
        // console.log("its here", teamList);
        console.log("worked", res);
      })
      .catch((err) => {
        // setMessage(err.response.data.message);

        console.log("error", err);
      });
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
            <textarea
              id="about"
              name="about"
              rows={7}
              className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Write a comment here"
              onChange={feedbackHandler}
              value={feedback}
            />
          </div>
          <input type="file" name="file" onChange={handleFile} />
          <div className="modal-footer">
            <button
              className="button"
              onClick={submitTask}
              class="mt-4 ml-2 mb-0 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-500 
                            shadow-sm hover:bg-gray-200 focus:outline-none"
            >
              Submit
            </button>
            <button
              className="button"
              onClick={props.onClose}
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
