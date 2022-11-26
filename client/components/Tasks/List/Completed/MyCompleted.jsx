import React, { useState } from "react";
import Tasks from "../../CompletedTask/CompletedTask";
import "../../TaskModal.css";
import Missed from "../../MissedTask/Missed";

const MyCompleted = (props) => {
    // let user_object = window.localStorage.getItem("user_data");
    // user_object = JSON.parse(user_object);
    // let userRooms = user_object.rooms;
    // let completedTask = userRooms.completedTasks;

    let completedTasks = props.data;
    let mypoints = 0;
    let completed = 0;
    let eachTask = [];

    for (let i = 0; i < completedTasks.length; i++) {
        let task = props.data[i];
        const id = task._id;
        const name = task.name;
        const desc = task.description;
        const difficulty = task.difficulty;
        const date = task.deadline.slice(0, 10);
        const points = task.points;
        const assigned = task.assignedUser;
        const feedback = task.feedback;
        const completedDate = task.completedTime.slice(0, 10);
        const completedBy = task.assignedUser;
        const userID = task.completedBy;

        const status = task.status;
        let hasFile = false;
        if (task.file) {
            hasFile = true;
        } else {
            hasFile = false;
        }
        if (props.UID === userID) {

            if (status === "complete") {
                completed+=1;
                mypoints+=points;
                eachTask.push(<Tasks
                    date={date}
                    desc={desc}
                    difficulty={difficulty}
                    assigned={assigned}
                    name={name}
                    points={points}
                    completedDate={completedDate}
                    completedBy={completedBy}
                    id={id}
                    feedback={feedback}
                    flag={hasFile}
                />)
            }

            if (status === "missed") {
                eachTask.push(<Missed
                    date={date}
                    desc={desc}
                    difficulty={difficulty}
                    assigned={assigned}
                    name={name}
                    points={points}
                    completedDate={completedDate}
                    completedBy={completedBy}
                    id={id}
                    feedback={feedback}
                    flag={hasFile}
                />)
            }
        }
    }
    /*
    const eachTask = completedTasks.map((d) => {
        const id = Object.values(d)[0];
        const name = Object.values(d)[1];
        const desc = Object.values(d)[2];
        const difficulty = Object.values(d)[3];
        const date = Object.values(d)[4].slice(0, 10);
        const points = Object.values(d)[5];
        const assigned = Object.values(d)[10];
        const feedback = Object.values(d)[15];
        let completedDate;
        if (Object.values(d)[14]) {
            completedDate = Object.values(d)[14].slice(0, 10);
        }
        const completedBy = Object.values(d)[10];
        const status = Object.values(d)[6];
        if (props.UID === Object.values(d)[8]) {
            if (status === "complete") {
                completed+=1;
                mypoints+=points;
                return (
                    <Tasks
                        date={date}
                        desc={desc}
                        difficulty={difficulty}
                        assigned={assigned}
                        name={name}
                        points={points}
                        completedDate={completedDate}
                        completedBy={completedBy}
                        key={id}
                        feedback={feedback}
                    />
                );
            } else if (status === "missed") {
                return (
                    <Missed
                        date={date}
                        desc={desc}
                        difficulty={difficulty}
                        assigned={assigned}
                        name={name}
                        points={points}
                        completedDate={completedDate}
                        completedBy={completedBy}
                        key={id}
                        feedback={feedback}
                    />
                );
            }
        }
    });
*/
    if (!props.show) {
        return null;
    }

    return (
        <div className="fixed pin z-50 flex">
            <div className="modal">
                <div className="task-content">
                    <div className="taskHeader">
                        <h1 className="text-center text-5xl font-semibold pt-4 mb-3 text-indigo-500">
                            My Completed Tasks
                        </h1>
                        <div className="flex mt-4 mb-1 justify-center">
                            <span className="w-24 text-center rounded-full bg-green-500 text-white px-2 py-1 text-xs font-bold mr-3">
                                Completed
                            </span>
                            <span className="w-24 text-center rounded-full bg-red-700 text-white px-2 py-1 text-xs font-bold mr-3">
                                Pending
                            </span>
                            <span className="w-24 text-center rounded-full bg-indigo-500 text-white px-2 py-1 text-xs font-bold mr-3">
                                Unassigned
                            </span>
                            <span className="w-24 text-center rounded-full bg-yellow-600 text-white px-2 py-1 text-xs font-bold mr-3">
                                Late
                            </span>
                        </div>
                        <div className="text-center text-indigo-500 font-bold text-lg">
                            Tasks Completed: {completed}
                        </div>
                        <div className="pb-2 text-center text-indigo-500 font-bold text-lg">
                            Points Earned: {mypoints}
                        </div>
                    </div>
                    <div className="rounded-md pt-40 pb-10 bg-indigo-900">{eachTask}</div>
                </div>
                <div className="taskFoot">
                    <button
                        type="button"
                        className="flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={props.onClose}
                    >
                        Close
                    </button>{" "}
                </div>
            </div>
        </div>
    );
};

export default MyCompleted;
