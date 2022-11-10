import React, { useState } from "react";
import "../../Tasks/TaskModal.css";
import Calendar from "react-calendar";
import "./Calendar.css";
import Tasks from "../../Tasks/CompletedTask/CompletedTask";
import Pending from "../../Tasks/PendingTask/Pending";
import TempTasks from "./TempTasks";
import Unaccepted from "../../Tasks/UnassignedTask/Unassigned";

const CalendarView = (props) => {
  if (!props.show) {
    return null;
  }
  let completedTasks = props.data;
  const eachTask = completedTasks.map((d) => {
    const id = Object.values(d)[0];
    const name = Object.values(d)[1];
    const desc = Object.values(d)[2];
    const difficulty = Object.values(d)[3];
    const date = Object.values(d)[4];
    const points = Object.values(d)[5];
    const assigned = Object.values(d)[5];
    const status = Object.values(d)[6];
    // return <Tasks date={task.deadline} name={task.name} points={task.points} />;

    if (status === "pending") {
      return (
        <Pending
          date={date.slice(0, 10)}
          desc={desc}
          difficulty={difficulty}
          assigned={assigned}
          name={name}
          points={points}
        />
      );
    } else if (status === "complete") {
      return (
        <Tasks
          date={date}
          desc={desc}
          difficulty={difficulty}
          assigned={assigned}
          name={name}
          points={points}
        />
      );
    } else if (status === "unassigned") {
      return (
        <Unaccepted
          id={id}
          date={date.slice(0, 10)}
          desc={desc}
          difficulty={difficulty}
          name={name}
          points={points}
          status={status}
        />
      );
    }
  });

  const marked = new Set();

  const [showAll, setShowAll] = useState(false);

  const [taskArray, setTasks] = useState([]);

  const onSelect = (e) => {
    const locale = "fr-CA";
    const date = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(e);
    //console.log(date);
    //console.log(marked.has(date));
    if (!marked.has(date)) {
      return;
    } else {
      let temp = [];
      for (let val of eachTask.values()) {
        if (date === val.props.date) {
          temp.push(val);
        }
      }
      setTasks([temp]);
      setShowAll(true);
    }
  };

  return (
    // <div className="overlay" class="fixed pin z-50 overflow-auto flex">
    <div className="fixed pin z-50 overflow-auto flex">
      <div className="modal">
        <div className="modal-content">
          <h1 className="text-center text-6xl font-semibold pt-8 text-indigo-400	">
            Calendar
          </h1>
          <div className="grid justify-items-center">
            <Calendar
              tileClassName={({ date }) => {
                const locale = "fr-CA";
                const dateConv = new Intl.DateTimeFormat(locale, {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(date);
                for (let val of eachTask.values()) {
                  let deadline = val.props.date;
                  if (!marked.has(deadline)) {
                    marked.add(deadline);
                  }
                }
                if (marked.has(dateConv)) {
                  return "highlight";
                }
              }}
              onClickDay={(e) => onSelect(e)}
            />
            <TempTasks
              onClose={() => setShowAll(false)}
              show={showAll}
              tasks={taskArray}
            />
          </div>
          <button
            type="button"
            className="mt-4 group relative flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default CalendarView;
