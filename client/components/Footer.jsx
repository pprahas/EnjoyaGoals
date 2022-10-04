import React from "react";

const Footer = (props) => {
  return (
    <>
      <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between min-h-fit dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 min-h-min">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Enjoyagoals™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
