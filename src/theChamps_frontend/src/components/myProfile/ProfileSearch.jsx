import { HiMagnifyingGlass } from "react-icons/hi2";

const ProfileSearch = () => {
  return (
    <div className="flex gap-2 flex-1 w-full border border-gray-400 rounded-md px-4 py-3 relative bg-transparent">
      <span className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] absolute top-0 left-0 bottom-0 flex items-center px-2 rounded-l-md">
        <HiMagnifyingGlass size={24} color="white" />
      </span>
      <input
        type="text"
        placeholder="Search profile data"
        className="h-full w-full outline-none pl-8 bg-transparent"
      />
    </div>
  );
};

export default ProfileSearch;
