/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */

import FancyHeader from "../common/FancyHeader";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageF /> : Subscribe email.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageF = () => {
  return (
    <div className="md:p-24 max-md:p-6">
      <div className="border-2 rounded-2xl flex py-12 flex-col gap-8">
        <FancyHeader normal="Never" fancy="miss a drop!" />
        <p className="text-[#7B7583] flex items-center justify-center max-sm:flex-col">
          <span>Subscribe to our super-rare and</span>
          <span>exclusive drops & collectibles.</span>
        </p>
        <div className="flex gap-4 items-center justify-center max-sm:flex-col max-sm:mx-2">
          <input
            className="rounded-full outline-none border-2 px-5 py-3 max-sm:w-full"
            placeholder="Enter your Email"
          />
          <button className="px-5 py-3 bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] rounded-full text-white font-medium">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageF;
