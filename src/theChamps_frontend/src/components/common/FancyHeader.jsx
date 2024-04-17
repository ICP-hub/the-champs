/* eslint-disable react/prop-types */
const FancyHeader = ({ normal, fancy, small }) => {
  return (
    <div
      className={`flex justify-center items-center gap-4 font-bold text-5xl ${
        small
          ? "max-[940px]:text-2xl max-sm:text-[16px]"
          : "max-[940px]:text-3xl"
      }`}
    >
      {normal ? <h1 className="leading-10">{normal}</h1> : null}
      <span className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] inline-block text-transparent bg-clip-text pb-1">
        {fancy}
      </span>
    </div>
  );
};

export default FancyHeader;
