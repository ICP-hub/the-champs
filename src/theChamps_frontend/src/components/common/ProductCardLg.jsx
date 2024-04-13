import { CiHeart } from "react-icons/ci";

const ProductCardLg = ({ prod }) => {
  return (
    <div className="rounded-lg shadow-lg p-6 border-2">
      <div className="grid grid-cols-3 gap-x-8">
        <div className="col-span-2">
          <img
            src={prod.imageUrl}
            alt={prod.title}
            className="rounded-lg h-full object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-y-8">
          <img
            src={prod.image1}
            alt="image-1"
            className="rounded-lg row-span-2 w-full object-cover h-full"
          />
          <img
            src={prod.image2}
            alt="image-2"
            className="rounded-lg h-full w-full"
          />
        </div>
      </div>
      <div className="py-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">Name</h1>
            <p className="text-sm text-[#7B7583] font-normal">By name</p>
          </div>
          <CiHeart size={48} className="cursor-pointer" />
        </div>
        <div className="flex justify-between pt-6 gap-4 text-sm">
          <button className="px-4 py-2 bg-[#6D01F6] text-white cursor-pointer border-2 border-[#6D01F6] rounded-lg w-full">
            View Collection
          </button>
          <button className="px-4 py-2 border-2 border-[#6D01F6] cursor-pointer rounded-lg w-full">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardLg;
