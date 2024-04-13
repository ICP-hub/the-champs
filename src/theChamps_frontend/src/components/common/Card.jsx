import React from "react";
import { MdOutlineContentCopy } from "react-icons/md";

const Card = ({ nftgeek, toniq }) => {
  return (
    <>
      <div
        className=" bg-white rounded-xl w-full h-[400px] "
        style={{ boxShadow: " 4px 4px 10px rgba(0, 0, 0, 0.4)" }}
      >
        <img
          src="https://s3-alpha-sig.figma.com/img/c95d/5dd3/584da49eb53713d2f06a775d13085d75?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fGtkGDPMg53FPYGIDASuxb4-~dFL8ikNGIlNlKcRHkAVbB34PW5JVaSCBy7tIvTuIdkJwyf3haWFOzhApv4dTljC-Sficd2WkGXedWagLGwGUYsWys1VXITmJg5vKRsu1fTV9OVi6jPkOhd6CRb6N0lOE15GjG0RrM2qjey5eTIa2Nclg9f5pbLBIzVD6BYYFPP2Yay~yUCjLie-7mcYY-7m2J13TQMg4ntvTQTZxkVO4GxGHWzDzb6DxXxLOWRGHPO3QM-Kba9zURwBFIYH92GQJ8eSY8xkhx9VxTt99a1MLv~mxksjygteyMIWGM5qzLIzG8a14Qg3H4-tbhCK0w__
        "
          alt=""
          className="object-cover w-full rounded-3xl h-[80%] p-3"
        />
        <div className="w-full flex items-center justify-between px-12 py-6">
          <img src={toniq} alt="" className="w-7" />
          <img src={nftgeek} alt="" className="w-7" />
          <MdOutlineContentCopy size={28} />
        </div>
      </div>
    </>
  );
};

export default Card;
