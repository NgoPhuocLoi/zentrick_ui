import React from "react";

const NoFileOpen = () => {
  return (
    <div className="flex gap-4 flex-col w-full h-full justify-center items-center">
      <h2 className="font-semibold text-2xl">No file is open</h2>
      <span className="text-blue-600 cursor-pointer">Create a new note</span>
    </div>
  );
};

export default NoFileOpen;
