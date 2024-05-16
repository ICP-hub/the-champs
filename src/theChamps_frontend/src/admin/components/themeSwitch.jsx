import { MdOutlineLightMode } from "react-icons/md";

const ThemeSwitch = ({ toggleTheme }) => {
  return (
    <div
      className="themeSettings flex text-white items-center justify-center right-0 w-10 h-10 shadow-lg rounded-l-lg z-90 cursor-pointer bg-red-600 bg-opacity-90"
      onClick={toggleTheme}
    >
      <MdOutlineLightMode size={24} className="animate-spin-slow" />
    </div>
  );
};

export default ThemeSwitch;
