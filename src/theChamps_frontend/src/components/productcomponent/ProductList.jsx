/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import soccer1 from "../../assets/images/soccer-1.jpeg";
import { Link } from "react-router-dom";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Fake activityData
/* ----------------------------------------------------------------------------------------------------- */
const ProductData = [
  {
    image: soccer1,
    mintVal: "# 2156",
    owner: "dummy",

    Rarity: "# 450",

    time: " 19h ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2157",
    owner: "dummy",
    Rarity: "# 450",

    time: " 19h ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2158",
    owner: "dummy",
    Rarity: "# 450",

    time: " 19h ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2159",
    owner: "dummy",
    Rarity: "# 450",

    time: " 19h ago",
    status: "Bought",
  },
  {
    image: soccer1,
    mintVal: "# 2160",
    owner: "dummy",
    Rarity: "# 450",

    time: " 19h ago",
    status: "Bought",
  },
];

const ProductLists = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 md:text-sm font-bold uppercase  text-xs p-4 text-white bg-gradient-to-r   from-[#FC001E] to-[#FF7D57]  rounded-lg">
        <span className="flex items-center justify-center">MINT #</span>
        <span className="flex items-center justify-center">PRICE</span>
        <span className="flex items-center justify-center">Rarity</span>

        <span className="flex items-center justify-center">owner</span>
        <span className="flex items-center justify-center">TIME</span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {ProductData.map((activity, index) => (
          <ProductList key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
};

const ProductList = ({ activity }) => {
  const { image, mintVal, owner, time, Rarity } = activity;

  return (
    <Link to="/collections/collection/a">
      <div className="grid grid-cols-5 md:text-sm font-bold text-xs bg-white border-[1px]  border-gray-400 p-4 rounded-lg">
        <div className="lg:flex gap-2 items-center justify-center">
          <img
            src={image}
            alt={mintVal}
            className="max-h-16 max-w-16 rounded-lg"
          />
          <p>{mintVal}</p>
        </div>
        <div className="flex items-center justify-center">19.99</div>
        <div className="flex items-center justify-center">{Rarity}</div>

        <div className="flex items-center justify-center">{owner}</div>
        <div className="flex items-center justify-center flex-col gap-2">
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductLists;
