/* eslint-disable react/prop-types */
const FancyHeader = ({ normal, fancy }) => {
  return (
    <div className="flex justify-center items-center gap-4 font-bold text-6xl max-[900px]:text-3xl leading-snug">
      {normal ? <h1 className="leading-10">{normal}</h1> : null}
      <span className="bg-gradient-to-tr from-[#2600FC] to-[#FF00EA] inline-block text-transparent bg-clip-text">
        {fancy}
      </span>
    </div>
  );
};

export default FancyHeader;
