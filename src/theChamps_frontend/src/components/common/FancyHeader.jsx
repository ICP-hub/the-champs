/* eslint-disable react/prop-types */
const FancyHeader = ({ normal, fancy }) => {
  return (
    <div className="flex justify-center items-center gap-4 font-bold text-5xl max-[900px]:text-3xl">
      {normal ? <h1 className="leading-10">{normal}</h1> : null}
      <span className="bg-gradient-to-tr from-[#2600FC] to-[#FF00EA] inline-block text-transparent bg-clip-text pb-1">
        {fancy}
      </span>
    </div>
  );
};

export default FancyHeader;
