/* eslint-disable react/prop-types */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ <DataBlock /> : <HomepPageD />.
/* ----------------------------------------------------------------------------------------------------- */
const DataBlock = ({ value, label }) => {
  return (
    <div className="p-6 flex flex-col gap-4 sm:items-center sm:justify-center">
      <h1 className="font-bold text-7xl max-lg:text-3xl max-sm:text-lg">
        {value}
      </h1>
      <p className="max-lg:text-sm sm:min-w-max text-[#7B7583]">{label}</p>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageD /> : Counts wallet, artists, value.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageD = () => {
  const dataBlocks = [
    { value: "400k+", label: "Wallets Connected" },
    { value: "400k+", label: "Wallets Connected" },
    { value: "230+", label: "Creative artists" },
    { value: "2.5x", label: "Estimated value" },
  ];

  return (
    <div className="md:p-24 max-md:p-6 grid grid-cols-4 max-md:grid-cols-2 md:divide-x-2">
      {dataBlocks.map((block, index) => (
        <DataBlock key={index} {...block} />
      ))}
    </div>
  );
};

export default HomePageD;
