import FancyHeader from "../common/FancyHeader";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import AccordionComponent from "../common/Accordion";
import FaqData from "./faqData.json";

const FAQ = () => {
  return (
    <div className="md:px-24 max-md:px-6">
      <div className="flex">
        <FancyHeader fancy="FAQ" />
      </div>
      {/* <FaqSearch /> */}
      <FaqContents />
    </div>
  );
};

const FaqSearch = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center md:p-16 p-6 faq rounded-lg gap-4">
        <h1 className="text-xl md:text-3xl font-medium">
          Hello, how can we help?
        </h1>
        <p className="text-gray-500">
          or choose a category to quickly find the help you need
        </p>
        <div className="md:w-6/12">
          <span className="md:mx-auto flex items-center relative">
            <HiMiniMagnifyingGlass size={24} className="absolute left-2" />
            <input
              type="text"
              placeholder="Search Article"
              className="outline-none pl-10 py-2 rounded-lg w-full"
            />
          </span>
        </div>
      </div>
    </>
  );
};

const FaqContents = () => {
  return (
    <div className="flex flex-col my-4 overflow-hidden">
      {FaqData.map((faq, index) => (
        <div className="md:py-2" key={index}>
          <AccordionComponent
            question={faq.question}
            answer={faq.answer}
            opened={index === 0}
          />
        </div>
      ))}
    </div>
  );
};

export default FAQ;
