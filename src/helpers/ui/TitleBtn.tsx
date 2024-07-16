import * as React from 'react';

interface TitleBtnProps {
  title: string;
  type: string;
}

const TitleBtn: React.FC<TitleBtnProps> = ({ title, type }) => {
  return (
    <>
      {type === "color" ? (
        <span className="bg-[#CC0177] px-[1rem] py-[.2rem] rounded-[2rem] text-white  text-[.8rem] font-[600]">
          {title}
        </span>
      ) : (
        <span className="bg-[#EBECFF] px-[1rem] py-[.2rem] rounded-[2rem] text-[#CC0177] text-[.8rem] font-[600]">
          {title}
        </span>
      )}
    </>
  );
};

export default TitleBtn;