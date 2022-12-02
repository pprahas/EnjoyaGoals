import Comments from "./Comments";
import axios from "axios";
import React, { useState, useEffect } from "react";

const MainPost = (props) => {
  let user_object = window.localStorage.getItem("user_data");
  user_object = JSON.parse(user_object);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState([]);

  const commentHandler = (event) => {
    setCommentContent(event.target.value);
  };

  const submitComment = (e) => {
    axios
      .post("http://localhost:8080/post/create/comment", {
        firstName: user_object.firstName,
        lastName: user_object.lastName,
        content: commentContent,
        postId: props.PID,
      })
      .then((res) => {
        props.createNotif("success", "Success!", "Comment created.");
        console.log("testing", res);
        // window.location.reload();
      })
      .catch((err) => {
        // setMessage(err.response.data.message);
        props.createNotif("error", "Error!", "Comment not created.");
        console.log("error", err);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    axios
      .post("http://localhost:8080/post/get/comment", {
        postId: props.PID,
      })
      .then((res) => {
        let temp = [];
        for (let i = 0; i < res.data.length; i++) {
          let commentData = res.data[i];
          temp.push(
            <Comments
              content={commentData.content}
              firstName={commentData.firstName}
              lastName={commentData.lastName}
              datePosted={commentData.datePosted.slice(0, 10)}
            />
          );
        }
        setComments(temp);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <article className="w-fit p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-11">
      <div class="flex justify-between items-center mb-5 text-gray-500">
        <div class="pt-2 flex justify-between items-center">
          <div class="flex items-center space-x-4">
            {/* <img
              class="w-7 h-7 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="Jese Leos avatar"
            /> */}
            <span class="font-medium dark:text-white">
              {props.firstName} {props.lastName}
            </span>
          </div>
        </div>

        <span class="text-sm">{props.datePosted}</span>
      </div>

      <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <a href="#">{props.title}</a>
      </h2>
      <p class="mb-5 text-gray-700 dark:text-gray-400">{props.content}</p>

      {comments.length == 1 && (
        <p className="text-gray-900 dark:text-gray-400"> 1 Comment </p>
      )}
      {comments.length != 1 && (
        <p className="text-gray-900 dark:text-gray-400">
          {" "}
          {comments.length} Comments{" "}
        </p>
      )}

      <div>
        <div class="flex items-center space-x-4 mb-4 mt-2">
          {/* <img
            class="w-7 h-7 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt="Jese Leos avatar"
          /> */}
          <span class=" text-gray-500 dark:text-white">
            {user_object.firstName} {user_object.lastName}
          </span>
        </div>
        <textarea
          id="about"
          name="about"
          rows={3}
          className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Add a comment . . ."
          onChange={commentHandler}
          value={commentContent}
        />
        <button
          type="button"
          class=" mb-5 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium leading-4 text-gray-700 
                    shadow-sm hover:bg-gray-50 focus:outline-none"
          onClick={submitComment}
        >
          Comment
        </button>
      </div>
      <div class="flex-grow border-t border-gray-200"></div>
      {/** Comments show up here */}

      {comments}
    </article>
  );
};

export default MainPost;
