import React from "react";
import { CiSearch, CiFilter } from "react-icons/ci";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Searchbar = () => {
  return (
    <>
      <div className="flex justify-between ">
        <div className="flex text-xl items-center border-[1.5px] gap-4 text-gray-600 border-gray-400 rounded-md px-3 py-2 w-[60%] sm:w-[80%]  overflow-hidden  lg:w-[85%]  mb-12">
          <CiSearch />
          <input
            type="text"
            placeholder="Search our collection"
            className="bg-transparent border border-transparent outline-none  w-full"
          />
        </div>
        {/* <div className="flex text-xl items-center justify-center  gap-2 border-[1.5px]  border-gray-400 rounded-md  px-3 py-2 lg:w-[12%] mb-12 overflow-hidden">
            <div className="text-3xl">
                <CiFilter />
            </div>
            Filters
            </div>{" "} */}
        <div className=" lg:w-[12%]  ">
          <Menu as="div" className="relative inline-block text-left w-full">
            <div>
              <Menu.Button className=" flex text-xl items-center justify-center  gap-2 border-[1.5px]  border-gray-400 rounded-md  px-3 py-2 lg:w-full  overflow-hidden">
                <div className="text-3xl">
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
              <Menu.Items className="absolute right-0 mt-2 w-[330px] origin-top-right divide-y  divide-gray-100 rounded-3xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <div className="m-6 text-center">
                    <h1 className="text-md  text-left font-medium">
                      Floor Price
                    </h1>
                    <button className="mt-5  flex items-center w-full justify-center text-gray-500 px-3 py-2 border-[1.5px] border-gray-300  hover:bg-violet-500 hover:text-white rounded-lg">
                      Highest to Lowest
                    </button>
                    <button className="mt-4  flex items-center w-full justify-center text-gray-500 px-3 py-2 border-[1.5px] border-gray-300  hover:bg-violet-500  hover:text-white rounded-lg">
                      Lowest to Highest
                    </button>
                  </div>
                  <div className="m-6 mt-8 text-center">
                    <h1 className="text-md  text-left font-medium">Sort By</h1>
                    <button className="mt-5  flex items-center w-full justify-center text-gray-500 px-3 py-2 border-[1.5px] border-gray-300  hover:bg-violet-500  hover:text-white rounded-lg">
                      Recent Creations
                    </button>
                    <button className="mt-4  flex items-center w-full justify-center text-gray-500 px-3 py-2 border-[1.5px] border-gray-300 hover:bg-violet-500  hover:text-white rounded-lg">
                      Latest Creations
                    </button>
                  </div>
                  <div className="m-6 text-center">
                    <button
                      className="mt-8  flex items-center w-full justify-center  px-3 py-2 border-[1.5px] border-gray-300 bg-[#6D01F6] text-white rounded-lg"
                      style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.4)" }}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
