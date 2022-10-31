import React, { useState } from "react";
import axios from "axios";
import "./TaskModal.css";
import Calendar from "react-calendar";
import "./Calendar.css";
import Tasks from "./Task";

//import "react-calendar/dist/Calendar.css";

const CalendarView = (props) => {
  if (!props.show) {
    return null;
  }
  let completedTasks = [];

  var obj = new Object();
  obj.name = "task-name";
  obj.description = "task-desc";
  obj.difficulty = "easy";
  obj.deadline = "2022-10-03T00:00:00.000+00:00";
  obj.points = 34;
  obj.assigned = "prado156";
  completedTasks.push(obj);

  var obj2 = new Object();
  obj2.name = "task-name";
  obj2.description = "task-desc";
  obj2.difficulty = "easy";
  obj2.deadline = "2022-10-05T00:00:00.000+00:00";
  obj2.points = 34;
  obj2.assigned = "prado156";
  completedTasks.push(obj2);


  const eachTask = completedTasks.map((d) => {
    const name = Object.values(d)[0];
    const desc = Object.values(d)[1];
    const difficulty = Object.values(d)[2];
    const date = Object.values(d)[3];
    const points = Object.values(d)[4];
    const assigned = Object.values(d)[5];

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
  });
  
  const marked = new Set()
/*
  const onSelect=(e)=>{
    const locale = 'fr-CA';
    const date = new Intl.DateTimeFormat(
      locale, 
      {
        year: "numeric", 
        month: "2-digit", 
        day: "2-digit"
      }).format(e)
      console.log(date);
      console.log(marked.has(date));
  }
  */

  return (
    <div className="overlay" class="fixed pin z-50 overflow-auto flex">
      <div className="modal">
        <div className="modal-content">
          <h1 className="text-center text-6xl font-semibold pt-8 text-indigo-400	">
            Calendar
          </h1>
          <div className="grid justify-items-center">
            
            <Calendar
            tileClassName={({ date }) => {
              const locale = 'fr-CA';
              const dateConv = new Intl.DateTimeFormat(
                locale, 
                {
                  year: "numeric", 
                  month: "2-digit", 
                  day: "2-digit"
                }).format(date)
                for (let val of eachTask.values()) {
                  let deadline=val.props.date;
                  if (!marked.has(deadline)){
                    marked.add(deadline.slice(0,10));
                  }
                }
              if(marked.has(dateConv)){
               return  'highlight'
              }
            }}
        
            //onClickDay={(e)=>onSelect(e)}
            />
          </div>
          {/* <h1 className="text-center text-8xl text-red-400	">Homepage</h1>; */}
          {/* <a href="/forgot_password" className="content-center text-8xl bg-red-400">
        Create Task
      </a> */}
          {/* <button className="text-center text-8xl text-red-400	">Homepage</button>; */}
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
