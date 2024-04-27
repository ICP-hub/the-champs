/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import FancyHeader from "../common/FancyHeader";
import ProductCardLg from "../common/ProductCardLg";
import CollectionApi from "../../api/CollectionApi";
import { useEffect } from "react";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomeFeatured /> : Homepage featured items.
/* ----------------------------------------------------------------------------------------------------- */
const HomeFeatured = () => {
  const { getAllCollections, isLoading, collections } = CollectionApi();

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <div className="md:p-24 max-md:p-6 flex flex-col gap-8">
      <FancyHeader normal="View" fancy="All our collections" />
      {isLoading ? (
        <div className="flex justify-center items-center">
          Loading collections...
        </div>
      ) : (collections?.length ?? 0) === 0 ? (
        <div className="flex justify-center items-center">
          No collections available.
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-x-8 gap-y-8">
          {collections.slice(0, 2).map((collection, index) => (
            <ProductCardLg prod={collection} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeFeatured;
