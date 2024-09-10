import React from "react";

const Title = ({ title, className }) => {
  return (
    <div className={`flex justify-center  items-center gap-4 ${className}`}>
      <div className={`border-1 w-6 ${className}`}></div>
      <p className="font-bold uppercase">{title}</p>
      <div className={`border-1 w-6 ${className}`}></div>
    </div>
  );
};

export default Title;
