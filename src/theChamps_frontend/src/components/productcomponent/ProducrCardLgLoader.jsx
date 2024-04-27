import React from "react";

const ProducrCardLgLoader = () => {
  return (
    <div className="rounded-2xl p-6 border-2  animate-pulse">
      <div className="grid grid-cols-3 gap-x-8">
        <div className="col-span-2  h-full w-[100%] overflow-hidden rounded-2xl">
          <div className="w-full object-cover h-[400px] bg-gray-300 rounded-xl  animate-pulse"></div>
        </div>
        <div className="grid grid-rows-2 ">
          <div className="overflow-hidden rounded-2xl">
            <div className="w-full object-cover h-[192px] bg-gray-300 rounded-xl mb-2  animate-pulse"></div>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <div className="w-full object-cover h-[200px] bg-gray-300 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h4 className="h-6 w-40 bg-gray-200 rounded-full animate-pulse mb-2"></h4>
            <h4 className="h-6 w-40 bg-gray-200 rounded-full animate-pulse"></h4>
          </div>
          {/* <CiHeart size={48} className="cursor-pointer" /> */}
        </div>
        <div className="flex justify-between pt-6 gap-4 text-sm">
          <h4 className="h-6 w-40 bg-gray-200 rounded-full animate-pulse"></h4>
          <h4 className="h-6 w-40 bg-gray-200 rounded-full animate-pulse"></h4>
        </div>
      </div>
    </div>
  );
};

export default ProducrCardLgLoader;
