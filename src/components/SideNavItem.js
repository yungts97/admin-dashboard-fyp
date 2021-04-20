import React from "react";
import classNames from "classnames";

const SideNavItem = ({ title, icon, active = false }) => {
  const baseClasses = classNames(
    "w-full",
    "font-thin",
    "uppercase",
    "flex",
    "items-center",
    "p-4",
    "my-2",
    "transition-colors",
    "duration-200",
    "justify-start"
  );

  const statusClasses = active
    ? classNames(
        "text-purple-500",
        "bg-gradient-to-r",
        "from-white",
        "to-purple-100",
        "border-r-4",
        "border-purple-500",
        "dark:from-gray-700",
        "dark:to-gray-800"
      )
    : classNames("text-gray-500", "dark:text-gray-200");

  return (
    <a class={`${baseClasses} ${statusClasses}`} href="#">
      <span class="text-left">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 2048 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
        </svg>
      </span>
      <span class="mx-4 text-sm font-medium">{title}</span>
    </a>
  );
};

export default SideNavItem;
