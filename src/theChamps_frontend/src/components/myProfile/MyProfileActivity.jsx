/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import soccer1 from "../../assets/images/soccer-1.jpeg";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Fake activityData
/* ----------------------------------------------------------------------------------------------------- */
const activityData = [
  {
    image: soccer1,
    mintVal: "# 2156",
    nri: "—",
    time: "3 months ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2157",
    nri: "—",
    time: "3 months ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2158",
    nri: "—",
    time: "3 months ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2159",
    nri: "—",
    time: "3 months ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2160",
    nri: "—",
    time: "3 months ago",
    status: "Bought",
  },
];

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <MyProfileActivity /> : my-profile/activity tab
/* ----------------------------------------------------------------------------------------------------- */
const MyProfileActivity = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 text-sm font-bold uppercase p-4 bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] text-white rounded-lg">
        <span className="flex items-center justify-center">MINT #</span>
        <span className="flex items-center justify-center">PRICE</span>
        <span className="flex items-center justify-center">TIME</span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {activityData.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <ActivityCard /> : Card to display activity 
/* ----------------------------------------------------------------------------------------------------- */
const ActivityCard = ({ activity }) => {
  const { image, mintVal, time, status } = activity;

  return (
    <div className="grid grid-cols-3 text-sm font-bold  bg-white border-2 p-4 rounded-lg">
      <div className="flex gap-2 items-center justify-center">
        <img
          src={image}
          alt={mintVal}
          className="max-h-16 max-w-16 rounded-md"
        />
        <p>{mintVal}</p>
      </div>
      <div className="flex items-center justify-center">3</div>
      <div className="flex items-center justify-center flex-col gap-2">
        <p>{time}</p>
        <span className="text-xs font-normal text-[#8A8A8A]">{status}</span>
      </div>
    </div>
  );
};

export default MyProfileActivity;
