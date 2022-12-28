import React from "react";

const PrimaryButton = ({ children, classes, handler }) => {
  return (
    <button
      onClick={handler}
      className={`hover:text-gray-100 bg-gradient-to-r from-cyan-500 to-sky-600 text-white ${classes}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
