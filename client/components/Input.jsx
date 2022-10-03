import React from "react";

const Input = (props) => {
  return (
    <>
      {props.label === "First Name" || props.label === "Last Name" ? (
        <div className="w-1/2 px-3 mb-5">
          <label htmlFor className="text-xs font-semibold px-1">
            {props.label}
          </label>
          <div className="flex">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
              <i className={props.icon} />
            </div>
            <input
              required
              type={props.type}
              className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
              placeholder={props.placeholder}
            />
          </div>
        </div>
      ) : (
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <label htmlFor className="text-xs font-semibold px-1">
              {props.label}
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className={props.icon} />{" "}
              </div>
              <input
                required
                type={props.type}
                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                placeholder={props.placeholder}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
