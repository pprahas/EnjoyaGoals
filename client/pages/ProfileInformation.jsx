/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../components/Modal";
import axios from "axios";
import { unstable_HistoryRouter } from "react-router-dom";

export default function Example(props) {
  let user_object = window.localStorage.getItem("user_data");
  let roomId = window.localStorage.getItem("currentRoom");
  user_object = JSON.parse(user_object);

  var colors = [
    {
      value: 1,
      label: "Red",
    },
    {
      value: 2,
      label: "Green",
    },
    {
      value: 3,
      label: "White",
    },
  ];
  var [inputValue, setInputValue] = useState(colors[0].label);

  var buttonHandle = () => {
    window.localStorage.setItem("Color", inputValue);
  };

  const [show, setShow] = useState(false);
  const [banner, setBanner] = useState("");
  const uploadedImage = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;

        //change this to mongodb later
        window.localStorage.setItem("ProfilePic", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader2 = new FileReader();
      reader2.onload = (e) => {
        //change this to mongodb later
        window.localStorage.setItem("banner", reader2.result);
        setBanner(window.localStorage.getItem("banner"));
      };
      reader2.readAsDataURL(file);
    }
  };

  const upload = async (e) => {
    let user_object = window.localStorage.getItem("user_data");
    user_object = JSON.parse(user_object);
    const UID = user_object._id;

    e.preventDefault();
    let pfp = window.localStorage.getItem("ProfilePic");
    let banner = window.localStorage.getItem("banner");
    let color = window.localStorage.getItem("Color");

    if (pfp !== null) {
      let name = "pfp";
      axios
        .post("http://localhost:8080/user/pic_upload", {
          user_id: UID,
          fileData: pfp,
          fileName: name,
        })
        .then((res) => {
          console.log("testing", res);
        })
        .catch((err) => {
          // setMessage(err.response.data.message);
          console.log("error", err);
        });
    }
    if (banner !== null) {
      let name = "banner";
      axios
        .post("http://localhost:8080/user/pic_upload", {
          user_id: UID,
          fileData: banner,
          fileName: name,
        })
        .then((res) => {
          console.log("testing", res);
        })
        .catch((err) => {
          // setMessage(err.response.data.message);
          console.log("error", err);
        });
    }
    if (color !== null) {
      axios
        .post("http://localhost:8080/user/set_color", {
          user_id: UID,
          color: color,
        })
        .then((res) => {
          console.log("testing", res);
        })
        .catch((err) => {
          // setMessage(err.response.data.message);
          console.log("error", err);
        });
    }
    alert("Profile updated!");
  };

  const [aboutMe, setAboutMe] = useState("");
  const submitAboutMe = async (e) => {
    e.preventDefault();
    console.log(user_object);
    console.log(user_object._id, aboutMe);
    axios
      .post("http://localhost:8080/user_info/create/about_me", {
        roomId: roomId,
        userId: user_object._id,
        aboutMe,
      })
      .then((res) => {
        props.createNotif("success", "Success!", "About Me has been changed.");
      })
      .catch((err) => {
        props.createNotif("error", "Error!", "About Me has not been changed.");
      });
  };

  let aboutMeContent;
  if (user_object.aboutMe) {
    let aboutMeMap = user_object.aboutMe;

    aboutMeMap = new Map(Object.entries(aboutMeMap));
    aboutMeContent = aboutMeMap.get(roomId);
  } else {
    aboutMeContent = "";
  }

  // console.log(aboutMeInside);
  // console.log(aboutMeInside instanceof Map);
  // console.log(map1 instanceof Map);

  // console.log(ef);

  const [firstName, setFirstName] = useState("");
  const submitFirstName = async (e) => {
    e.preventDefault();
    // console.log(user_object);
    // console.log(user_object._id, aboutMe);
    axios
      .post("http://localhost:8080/user_info/first_name", {
        userId: user_object._id,
        firstName,
      })
      .then((res) => {
        // alert("First name has been changed.");
        props.createNotif(
          "success",
          "Success!",
          "First name has been changed.."
        );
      })
      .catch((err) => {
        props.createNotif(
          "error",
          "Error!",
          "First name has not been changed.."
        );
        // alert("First name has not been changed.");
      });
  };

  const [lastName, setLastName] = useState("");
  const submitLastName = async (e) => {
    e.preventDefault();
    // console.log(user_object);
    // console.log(user_object._id, aboutMe);
    axios
      .post("http://localhost:8080/user_info/last_name", {
        userId: user_object._id,
        lastName,
      })
      .then((res) => {
        alert("Last name has been changed.");
      })
      .catch((err) => {
        alert("Last name has not been changed.");
      });
  };

  const [newPassword, setNewPassword] = useState("");
  const submitNewPassword = async (e) => {
    e.preventDefault();
    // console.log(user_object);
    // console.log(user_object._id, aboutMe);
    axios
      .post("http://localhost:8080/user_info/change_password", {
        userId: user_object._id,
        newPassword,
      })
      .then((res) => {
        alert("Password has been changed.");
      })
      .catch((err) => {
        alert("Password has not been changed.");
      });
  };
  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="mt-10 ml-10 text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="ml-10 mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="mt-10 mr-10 shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <div className="flex">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <button onClick={submitFirstName}>Change</button>
                      </div>

                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        placeholder={user_object.firstName}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div className="flex">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <button onClick={submitLastName}>Change</button>
                      </div>

                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        placeholder={user_object.lastName}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                      {/* <button>Change</button> */}
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <div className="flex">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        {/* <button onClick={submitUsername}>Change</button> */}
                      </div>

                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={user_object.username}
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <div className="flex">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                      </div>

                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={user_object.email}
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <div className="flex">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                          placeholder="FirstLast@email.com"
                        >
                          Password
                        </label>
                        <button onClick={submitNewPassword}>Change</button>
                      </div>

                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="*********"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        About Me
                      </label>
                      <button onClick={submitAboutMe}>Change</button>
                    </div>

                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={aboutMeContent}
                        defaultValue={""}
                        onChange={(e) => setAboutMe(e.target.value)}
                        value={aboutMe}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile.
                    </p>
                  </div>

                  {/* Code for custom profile pic */}
                  <div className="mt-1 flex items-center">
                    <div
                      style={{
                        height: "62px",
                        width: "62px",
                        border: "5px black",
                        borderRadius: "31px",
                      }}
                    >
                      <img
                        src={window.localStorage.getItem("ProfilePic")}
                        ref={uploadedImage}
                        style={{
                          width: "50px",
                          height: "50px",
                          position: "absolute",
                          borderRadius: "25px",
                        }}
                        alt={"AAAAA"}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShow(true)}
                      class="ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                      shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                      Preset
                    </button>
                    <Modal onClose={() => setShow(false)} show={show} />

                    <label
                      htmlFor="custom"
                      className="relative cursor-pointer 
                      ml-2 mb-3 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 
                      shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      id="custom"
                      style={{ visibility: "hidden" }}
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {/** 
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Banner
                    </label>
                    <div
                      className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
                      //set bg
                      style={{ backgroundImage: "url('" + banner + "')" }}
                    >
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            {/** BANNER */}
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleBannerUpload}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={buttonHandle}
                      className="ml-2 mb-3 mr-2 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                      Change color
                    </button>
                    <select
                      id="select1"
                      onChange={(e) => setInputValue(e.target.value)}
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                        shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                      {colors.map((color) => (
                        <option value={color.label}>{color.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <a href="/profile">
                    <button
                      type="button"
                      className="mr-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Return
                    </button>
                  </a>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={upload}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
