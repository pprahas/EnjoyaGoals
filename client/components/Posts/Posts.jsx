import MainPost from "./MainPost";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Posts.css";

export default function Posts() {
  const [postBody, setPostBody] = useState(" ");
  const [title, setTitle] = useState(" ");
  const [posts, setPosts] = useState([]);

  let user_object = window.localStorage.getItem("user_data");
  let roomID = window.localStorage.getItem("currentRoom");

  user_object = JSON.parse(user_object);
  const UID = user_object._id;
  const first = user_object.firstName;
  const last = user_object.lastName;

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const postHandler = (event) => {
    setPostBody(event.target.value);
  };

  const submitPost = (e) => {
    //console.log(UID);
    //console.log(roomID);
    //console.log(first);
    //console.log(last);

    axios
      .post("http://localhost:8080/post/create/post", {
        firstName: first,
        lastName: last,
        title: title,
        content: postBody,
        roomId: roomID,
        userId: UID,
      })
      .then((res) => {
        console.log("testing", res);
      })
      .catch((err) => {
        // setMessage(err.response.data.message);
        console.log("error", err);
      });
    window.location.reload();
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    axios
      .post("http://localhost:8080/post/get/post", {
        roomId: roomID,
      })
      .then((res) => {
        let temp = [];
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i]);
          let postData = res.data[i];
          temp.push(
            <MainPost
              PID={postData._id}
              title={postData.title}
              content={postData.content}
              firstName={postData.firstName}
              lastName={postData.lastName}
              datePosted={postData.datePosted.slice(0, 10)}
              UID={UID}
            />
          );
        }
        setPosts(temp);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <section className="w-auto bg-white dark:bg-gray-900 ml-32">
      <div class="contain">
        <div class="">
          <section class="inset-0 bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-full lg:py-16 lg:px-6">
              <div class="mb-4 font-bold text-gray-900 text-3xl">Posts</div>
              <div class="flex-grow border-t border-gray-200"></div>

              <div class="flex items-center space-x-4 mb-4 mt-2">
                {/* <img
                  class="w-7 h-7 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                  alt="Jese Leos avatar"
                /> */}
                <span class="font-medium text-gray-500 dark:text-white">
                  {user_object.firstName} {user_object.lastName}
                </span>
              </div>
              <span class="font-medium text-gray-500 dark:text-white">
                Post Title
              </span>
              <textarea
                id="about"
                name="about"
                rows={1}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Make a new post . . ."
                onChange={titleHandler}
                value={title}
              />
              <span class="mt-4 font-medium text-gray-500 dark:text-white">
                Post Content
              </span>
              <textarea
                id="about"
                name="about"
                rows={7}
                className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Make a new post . . ."
                onChange={postHandler}
                value={postBody}
              />
              <button
                type="button"
                class=" mb-5 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                shadow-sm hover:bg-gray-50 focus:outline-none"
                onClick={submitPost}
              >
                Create a new Post
              </button>
              <div class="">{posts}</div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
