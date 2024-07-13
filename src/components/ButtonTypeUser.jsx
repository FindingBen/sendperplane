import React from "react";

const ButtonTypeUser = ({ onSelect }) => {
  const handleButtonClick = (type) => {
    onSelect(type);
  };
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <button
        onClick={() => handleButtonClick("retail")}
        className="px-2 py-1 lg:px-4 lg:py-2 rounded-lg hover:bg-slate-700 cursor-pointer duration-200 bg-slate-900 text-white"
      >
        Retail
      </button>
      <button
        onClick={() => handleButtonClick("individual")}
        className="px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-slate-700 cursor-pointer duration-200 bg-slate-900 text-white"
      >
        Individual
      </button>
    </div>
  );
};

export default ButtonTypeUser;
