import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter } from "react-icons/fi";

const ProfileFilter = ({ filterOptions }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="px-4 items-center relative">
      <motion.div
        whileTap={{ scale: 0.8 }}
        className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] p-2 rounded-md cursor-pointer"
        onClick={openMenu}
      >
        <FiFilter size={28} color="white" />
      </motion.div>
      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { ease: "anticipate", duration: 0.2 },
            }}
            exit={{
              y: -100,
              opacity: 0,
              transition: { ease: "anticipate", duration: 0.2 },
            }}
            className="absolute right-12"
          >
            <FilterCard filterOptions={filterOptions} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const FilterCard = ({ filterOptions }) => {
  return (
    <div className="filter-card flex flex-col bg-white">
      <span className="text-sm text-gray-400 px-4 p-2">Filter</span>
      {filterOptions.map((option) => (
        <div className="flex items-center" key={option.value}>
          <label className="flex items-center cursor-pointer hover:bg-gray-200 text-sm font-medium w-full min-w-max px-6 py-3">
            <input
              type="radio"
              name="filter"
              value={option.value}
              style={{ marginTop: "2px" }}
            />
            <span className="ml-2">{option.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default ProfileFilter;
