/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import FancyHeader from "../common/FancyHeader";
import ProductCardLg from "../common/ProductCardLg";
import CollectionApi from "../../api/CollectionApi";
import { useEffect } from "react";
import NotAvailable from "../common/NotAvailable";
import { useSelector } from "react-redux";
import ProducrCardLgLoader from "../productcomponent/ProducrCardLgLoader";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomeFeatured /> : Homepage featured items.
/* ----------------------------------------------------------------------------------------------------- */
const HomeFeatured = () => {
  const { getAllCollections, isLoading } = CollectionApi();
  const collectionSelector = useSelector((state) => state.collections);

  useEffect(() => {
    getAllCollections();
  }, []);

  return (
    <div className="md:p-24 max-md:p-6 flex flex-col gap-8">
      <FancyHeader normal="View" fancy="All our collections" small />
      {isLoading ? (
        <div className="grid lg:grid-cols-3 xl:grid-cols-3 gap-8 max-lg:grid-cols-2 mt-8 max-sm:grid-cols-1  ">
          {Array.from({ length: 3 }, (_, index) => (
            <ProducrCardLgLoader key={index} />
          ))}
        </div>
      ) : (collectionSelector.featuredCollections?.length ?? 0) === 0 ? (
        <div className="flex justify-center items-center">
          <NotAvailable>No Collection Available</NotAvailable>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-x-8 gap-y-8">
          {collectionSelector.featuredCollections
            .slice(0, 3)
            .map((collection, index) => (
              <div key={index}>
                <ProductCardLg prod={collection} key={index} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default HomeFeatured;
