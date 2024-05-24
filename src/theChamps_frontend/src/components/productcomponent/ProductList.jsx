/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import soccer1 from "../../assets/images/soccer-1.jpeg";
import { Link } from "react-router-dom";
import PlaceHolderImage from "../../assets/CHAMPS.png";

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

const ProductLists = ({ product }) => {
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
        {product.map((product, index) => (
          <ProductList key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductList = ({ product }) => {
  const [image, setImage] = useState(product[0]?.fractional_token?.logo);

  const imageHandler = () => {
    setImage(PlaceHolderImage);
  };
  return (
    <div className="grid grid-cols-5 md:text-sm font-bold text-xs bg-white border-[1px]  border-gray-400 p-4 rounded-lg">
      <div className="lg:flex gap-2 items-center justify-center">
        <img
          src={image}
          alt=""
          className="max-h-16 max-w-16 rounded-lg"
          onError={imageHandler}
        />
        <p>{product[0]?.fractional_token?.name}</p>
      </div>
      <div className="flex items-center justify-center">
        {parseInt(product[0]?.fractional_token?.fee)}
      </div>
      <div className="flex items-center justify-center">Rarity</div>

      <div className="flex items-center justify-center">
        {product[0]?.nft?.owner.toText()}
      </div>
      <div className="flex items-center justify-center flex-col gap-2">
        <p>Time</p>
      </div>
    </div>
  );
};

export default ProductLists;
