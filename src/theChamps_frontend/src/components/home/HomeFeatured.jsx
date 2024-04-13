/* ----------------------------------------------------------------------------------------------------- */
/*  @ imports.
/* ----------------------------------------------------------------------------------------------------- */
import FancyHeader from "../common/FancyHeader";
import ProductCardLg from "../common/ProductCardLg";
import FakeDB from "../../FakeProdDatbase.json";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomeFeatured /> : Homepage featured items.
/* ----------------------------------------------------------------------------------------------------- */
const HomeFeatured = () => {
  return (
    <div className="md:p-24 max-md:p-6 flex flex-col gap-8">
      <FancyHeader normal="View" fancy="All our collections" />
      <div className="grid min-[948px]:grid-cols-2 gap-x-8 gap-y-8">
        {FakeDB.slice(0, 2).map((prod, index) => (
          <ProductCardLg prod={prod} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeatured;
