// BackToTopButton.js
import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        // Adjust this value to change when the button appears
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] fade-in text-white font-bold py-2 px-2 rounded-full ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <MdOutlineKeyboardArrowUp size={24} />
    </button>
  );
};

export default BackToTopButton;
