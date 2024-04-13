import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

const AccordionComponent = ({ question, answer, opened }) => {
  const [isOpen, setIsOpen] = useState(opened);

  useEffect(() => {
    setIsOpen(opened);
  }, [opened]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div role="accordion" className="rounded-lg">
      <button
        type="button"
        className="w-full text-base font-semibold text-left py-4 px-6 bg-gray-100  flex items-center justify-between rounded-lg"
        onClick={toggleAccordion}
      >
        <span className="mr-4">{question}</span>
        {isOpen ? (
          <IoIosArrowDown size={20} />
        ) : (
          <IoIosArrowForward size={20} />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
          >
            <p className="p-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionComponent;
