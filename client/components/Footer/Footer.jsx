import React from "react";

const Footer = (props) => {
  return (
    <>
      <footer className="fixed inset-x-0 bottom-0 pb-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between min-h-fit dark:bg-gray-800">
        <span className="pt-4 pl-4 text-sm text-gray-500 sm:text-center dark:text-gray-400 min-h-min">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Enjoyagoals™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="pt-4 pr-6 flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Github
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
{
  /*min-h-fit  */
}
export default Footer;
