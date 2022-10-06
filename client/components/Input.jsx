import React from "react";

const Input = (props) => {
  return (
    <>
      <div>
        <label htmlFor={props.htmlFor} className="sr-only">
          {props.label}
        </label>
        <input
          id={props.htmlFor}
          name={props.label}
          type={props.label}
          autoComplete={props.label}
          required
          className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder={props.placeholder}
        />
      </div>
    </>
  );
};

export default Input;
