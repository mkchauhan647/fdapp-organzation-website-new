import React from "react";

interface Props {
  hidden: boolean;
}

const NewsLetter = ({ hidden }: Props) => {
  return (
    <div className={`${hidden ? "hidden" : "flex"} mt-4 `}>
      <div className="w-full flex-col">
        <p className="footer-title">Subscribe to Our Newsletter</p>
        <div className="flex md:flex-row flex-col gap-[1rem] w-full">
          <input
            type="text"
            placeholder="Enter Email"
            className="px-[1.5rem] py-[1rem] rounded-md"
          />
          <button className="px-[1.5rem] py-[1rem] rounded-md bg-[var(--c-secondary)] text-white w-[10rem]">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
