import { useEffect, useState } from "react";
import Products from "../../FakeProdDatbase.json";
import ProductCard from "../common/productcomponent/productCard";

const MyProfileB = ({ activeTabIndex }) => {
  // Replace the filterProducts state later
  const [filteredProducts, setFilteredProducts] = useState(Products);

  useEffect(() => {
    let filtered = [];

    switch (activeTabIndex) {
      // use filter method for real data : demo for now
      case "My NFTs":
        filtered = Products.slice(0, 3);
        break;
      case "Favorites":
        filtered = Products.slice(0, 6);
        break;
      case "Purchased":
        filtered = Products.slice(0, 8);
        break;
      default:
        filtered = Products;
    }

    setFilteredProducts(filtered);
  }, [activeTabIndex]);

  // console.log(filteredProducts);

  return (
    <div className="flex flex-col gap-8">
      <div>SearchBar component</div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-8 gap-y-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MyProfileB;
