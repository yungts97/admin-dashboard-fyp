import React, { useState, useEffect } from "react";
import classNames from "classnames";

const ThemeSwitch = () => {
  const THEME = { DARK: true, LIGHT: false };
  const [checked, setChecked] = useState(localStorage.darkTheme === "true");

  const labelClasses = classNames(
    "block",
    "overflow-hidden",
    "h-6",
    "rounded-full",
    "bg-gray-300",
    "cursor-pointer",
    { "bg-purple-500": checked }
  );

  const checkboxClasses = classNames(
    "outline-none",
    "focus:outline-none",
    "right-4",
    "duration-200",
    "ease-in",
    "absolute",
    "block",
    "w-6",
    "h-6",
    "rounded-full",
    "bg-white",
    "border-4",
    "appearance-none",
    "cursor-pointer",
    "checked:right-0"
  );

  const changeTheme = () => {
    setChecked(!checked);
    localStorage.darkTheme = !checked;
    switch (!checked) {
      case THEME.DARK:
        document.documentElement.classList.add("dark");
        break;
      case THEME.LIGHT:
        document.documentElement.classList.remove("dark");
        break;
    }
  };

  useEffect(() => {
    switch (checked) {
      case THEME.DARK:
        document.documentElement.classList.add("dark");
        break;
      case THEME.LIGHT:
        document.documentElement.classList.remove("dark");
        break;
    }
  }, []);

  return (
    <div class="flex">
      <span class="text-gray-400 font-medium mx-8">Dark Theme</span>

      <div class="relative inline-block w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          name="toggle"
          id="Purple"
          checked={checked}
          onClick={changeTheme}
          class={checkboxClasses}
        />
        <label for="Purple" class={labelClasses}></label>
      </div>
    </div>
  );
};

export default ThemeSwitch;
