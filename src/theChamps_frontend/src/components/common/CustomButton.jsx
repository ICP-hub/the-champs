// eslint-disable-next-line react/prop-types
const CustomButton = ({ children }) => {
  return (
    <button className="bg-gradient-to-tr from-[#2600FC] to-[#FF00EA] max-w-max rounded-full md:px-10 md:py-5 max-md:px-5 max-md:py-2 font-bold text-[17px] text-white flex items-center gap-2 justify-center">
      {children}
    </button>
  );
};

export default CustomButton;
