import React, { Fragment, useState } from "react";
import { CiSearch, CiFilter } from "react-icons/ci";
import { Menu, Transition } from "@headlessui/react";
import { IoGridOutline } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import toast from "react-hot-toast";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Searchbar = ({
  grid,
  setGrid,
  gridrequired,
  value,
  handleSearch,
  collection,
  setSearchResults,
  setSearch,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSortByName = () => {
    setSelectedOption("name");
  };

  const handleSortByNameReverse = () => {
    setSelectedOption("name_reverse");
  };

  const handleSortByDate = () => {
    setSelectedOption("date");
  };

  const handleSortByDateReverse = () => {
    setSelectedOption("date_reverse");
  };

  const applyFilters = () => {
    setSearch(true);
    let sortedResults;
    switch (selectedOption) {
      case "name":
        sortedResults = [...collection].sort((a, b) =>
          a.details.name.localeCompare(b.details.name)
        );
        break;
      case "name_reverse":
        sortedResults = [...collection].sort((a, b) =>
          b.details.name.localeCompare(a.details.name)
        );
        break;
      case "date":
        sortedResults = [...collection].sort((a, b) => {
          const dateA = Number(BigInt(a.details.created_at) / BigInt(1000000));
          const dateB = Number(BigInt(b.details.created_at) / BigInt(1000000));
          return dateB - dateA;
        });
        break;
      case "date_reverse":
        sortedResults = [...collection].sort((a, b) => {
          const dateA = Number(BigInt(a.details.created_at) / BigInt(1000000));
          const dateB = Number(BigInt(b.details.created_at) / BigInt(1000000));
          return dateA - dateB;
        });
        break;
      default:
        sortedResults = collection;
    }
    setSearchResults(sortedResults);
  };

  // return (
  //   <div className="flex">
  //     <div className="flex gap-2 flex-1 w-full border border-gray-400 rounded-md px-4 py-2 bg-white">
  //       <span>
  //         <HiMagnifyingGlass size={24} />
  //       </span>
  //       <input
  //         type="text"
  //         placeholder="Search our collection"
  //         value={value}
  //         onChange={handleSearch}
  //         className="h-full w-full outline-none"
  //       />
  //     </div>
  //     <div className="">two</div>
  //   </div>
  // );
  return (
    <>
      <div className="flex justify-between gap-2 ">
        <div
          className={`flex text-xl items-center border-[1px] gap-4 text-gray-600 border-gray-400 rounded-md px-3 md:py-2 ${
            gridrequired ? " sm:w-[80%]" : "sm:w-[85%]"
          } overflow-hidden w-[60%] mb-4`}
        >
          <CiSearch size={24} />
          <input
            type="text"
            placeholder="Search our collection"
            className="bg-transparent   outline-none  w-full"
            value={value}
            onChange={handleSearch}
          />
        </div>
        <div className=" lg:w-[12%] ">
          <Menu as="div" className="relative inline-block text-left w-full ">
            <div>
              <Menu.Button className="flex text-xl items-center justify-center gap-2 border-[1px] border-gray-400 rounded-md px-3 md:py-2 lg:w-full overflow-hidden ">
                <div className="md:text-3xl">
                  <CiFilter />
                </div>
                Filters
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-[330px] bg-gradient-to-r from-purple-50 to-pink-50 origin-top-right divide-y divide-gray-100 rounded-3xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1">
                  <div className="m-6 text-center">
                    <h1 className="text-md text-left font-medium">By Name</h1>
                    <button
                      className={`mt-2 flex items-center w-full justify-center text-gray-500 px-3 py-2 border-[1.5px] border-gray-300 bg-gradient-to-r hover:from-[#FF7D57] hover:to-[#FC001E] hover:border-white hover:text-white rounded-lg ${
                        selectedOption === "name"
                          ? "bg-gradient-to-r from-[#FF7D57] to-[#FC001E] border-white text-white"
                          : ""
                      }`}
                      onClick={handleSortByName}
                    >
                      Sort by Name(A TO Z)
                    </button>
                    <button
                      className={`mt-2 flex items-center w-full justify-center text-gray-500 px-3 py-2 border-[1.5px] border-gray-300 bg-gradient-to-r hover:from-[#FF7D57] hover:to-[#FC001E] hover:border-white hover:text-white rounded-lg ${
                        selectedOption === "name_reverse"
                          ? "bg-gradient-to-r from-[#FF7D57] to-[#FC001E] border-white text-white"
                          : ""
                      }`}
                      onClick={handleSortByNameReverse}
                    >
                      Sort by Name(Z to A)
                    </button>
                  </div>
                  <div className="m-6 mt-2 text-center">
                    <h1 className="text-md text-left font-medium">Sort By</h1>
                    <button
                      className={`mt-2 flex items-center w-full justify-center text-gray-500 px-3 py-2 border-[1.5px] border-gray-300 bg-gradient-to-r hover:from-[#FF7D57] hover:to-[#FC001E] hover:border-white hover:text-white rounded-lg ${
                        selectedOption === "date"
                          ? "bg-gradient-to-r from-[#FF7D57] to-[#FC001E] border-white text-white"
                          : ""
                      }`}
                      onClick={handleSortByDate}
                    >
                      Recent Creations
                    </button>
                    <button
                      className={`mt-2 flex items-center w-full justify-center text-gray-500 px-3 py-2 border-[1.5px] border-gray-300 bg-gradient-to-r hover:from-[#FF7D57] hover:to-[#FC001E] hover:border-white hover:text-white rounded-lg ${
                        selectedOption === "date_reverse"
                          ? "bg-gradient-to-r from-[#FF7D57] to-[#FC001E] border-white text-white"
                          : ""
                      }`}
                      onClick={handleSortByDateReverse}
                    >
                      Latest Creations
                    </button>
                  </div>
                  <div className="m-6 text-center">
                    <button
                      className="flex items-center w-full justify-center px-3 py-2 border-[1.5px] button border-white text-white rounded-lg bg-gradient-to-r from-[#FF7D57] to-[#FC001E]"
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {gridrequired && (
          <button
            className="flex text-xl items-center justify-center border-[1px] border-gray-400 rounded-md lg:w-[5%] sm:w-10 md:h-12 h-8 overflow-hidden"
            onClick={() => setGrid(!grid)}
          >
            {grid ? <CiBoxList size={24} /> : <IoGridOutline />}
          </button>
        )}
      </div>
    </>
  );
};

export default Searchbar;
