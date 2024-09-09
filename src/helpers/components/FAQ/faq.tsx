import { RootState, useAppSelector } from "@/helpers/hooks/useStoreHooks";
import { FAQ } from "@/utils/schema/ApiInterface";
import { Skeleton } from "@nextui-org/react";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import Title from "../Title/Title";

const Question: React.FC = () => {
  const { all_faq_data } = useAppSelector((state: RootState) => state.FAQ);
  const { isPending, isFulfilled, isRejected, fulfilledResponse } =
    all_faq_data;
  let Faq: FAQ[] = fulfilledResponse?.data;
  Faq = Faq?.filter((faq, index, self) => {
    return index === self.findIndex((t) => t.question === faq.question);
  });
  console.log(all_faq_data);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpansion = (index: number) => {
    setExpandedIndex((prevIndex: number | null) =>
      prevIndex === index ? null : index
    );
  };

  return (
    <section className="bg-white dark:bg-gray-900" id="faq">
      <div className="container xl:px-20 2xl:px-0 mx-auto relative pt-12 pb-12">
        <div className="mb-[1rem] text-center">
          <Title title={"FAQS"} className="text-secondary border-secondary" />
          <h1 className="text-[2rem] font-[600] text-primary font-poppins">
            Find Your{" "}
            <span className="text-secondary text-[2rem]">Solution</span> Here
          </h1>
        </div>

        <div className="w-full sm:w-4/5 lg:w-4/5 mx-auto flex flex-col gap-2">
          {!isPending &&
            !isRejected &&
            isFulfilled &&
            Faq?.map((faq: FAQ, index: number) => (
              <div
                key={index}
                className={`mb-3 bg-white rounded-lg ${
                  expandedIndex === index ? "shadow-lg" : "shadow-sm "
                }`}
              >
                <div
                  onClick={() => toggleExpansion(index)}
                  className="p-4 sm:p-4 cursor-pointer"
                >
                  <button className="w-full flex items-center focus:outline-none">
                    <svg
                      className={`flex-shrink-0 w-[10px] h-[10px] sm:w-4 sm:h-6 text-white ${
                        expandedIndex === index ? "transform rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="#ffffff"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
                    <div className="w-full flex justify-between items-center ">
                      <h3 className="px-2 text-[14px] sm:text-[16px] font-bold text-primary text-left">
                        {faq.question}
                      </h3>
                    </div>
                  </button>
                  {expandedIndex === index && (
                    <div className="mt-4 bg-white p-4 ">
                      <p className="max-w-full text-[12px] sm:text-[14px] text-primary text-left">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          {(Faq?.length === 0 || isPending || isRejected) &&
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton isLoaded={false} key={index}>
                <div className="w-full h-6 mb-3"></div>
              </Skeleton>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Question;
