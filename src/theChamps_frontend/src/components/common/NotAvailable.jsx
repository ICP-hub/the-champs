const NotAvailable = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] inline-block font-bold text-transparent bg-clip-text pb-1">
        {children}
      </div>
    </div>
  );
};
export default NotAvailable;
