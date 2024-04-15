import React from "react";

import Footer from "../components/common/Footer";
import ProductCard from "../components/common/productcomponent/productCard";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Searchbar from "../components/common/Searchbar";

const CollectionPage = ({ name }) => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/c95d/5dd3/584da49eb53713d2f06a775d13085d75?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fGtkGDPMg53FPYGIDASuxb4-~dFL8ikNGIlNlKcRHkAVbB34PW5JVaSCBy7tIvTuIdkJwyf3haWFOzhApv4dTljC-Sficd2WkGXedWagLGwGUYsWys1VXITmJg5vKRsu1fTV9OVi6jPkOhd6CRb6N0lOE15GjG0RrM2qjey5eTIa2Nclg9f5pbLBIzVD6BYYFPP2Yay~yUCjLie-7mcYY-7m2J13TQMg4ntvTQTZxkVO4GxGHWzDzb6DxXxLOWRGHPO3QM-Kba9zURwBFIYH92GQJ8eSY8xkhx9VxTt99a1MLv~mxksjygteyMIWGM5qzLIzG8a14Qg3H4-tbhCK0w__",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/8240/ea84/f0a9c9c792671f3aadc4ade11c868b9c?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SKoHpvOepttJ2GwP55MJzid-rxT5MajqBPonPmftYWnJQw3FMLWYJfht-l6YYjD3QGISLFT94uPaa6D~TCAt~HFTpP-c8lJbmJ2mmSXqG0pbl-JJgVWF9dE9HLetwz6OXdn7t5EpH11SrVq1sDtmYb~KQCSjfV2W5yMNRU-yrG8op3PTgXyTtc-5Tr3-jjROpSLN77vlYmwkqp~B9OG~7N7KibaEXnSOqBCQG5FN7mBdWEj-XtIKhmZypuLY6Jh3MUwAC5DR9ZmzhK5ntcWuVaAxilaHD6oqsJrL6f52aeDMwgNH-Re1QV4m1BkydQvmzAhBlSnHBQMKoUBlPLlIqA__",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/48da/3389/e0819ea25b6af0c626494aa261acced5?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mwhBZQ~DOe3WSTK5tScBg-joDMOBrAwxyrU3kdiMwSFNQnxv0NXRC~55JsoEnl4NZvV3aW8bqMkmT1keVKINZptewRv6F88nB9W96KY~EthzYMWQ-MwaI0KG7ty4rubLuTkEJ-jOk4-Qd1cqAop-tvkkus3famAE93Wga~cijaqf5vHAvToQXItrryRhgk-DhfIS679BSigISx~joVRj~n01acy6GbMQy3ymXicEXB3DglH~vpI7jLvxzE63O2musdJvDXcfEJ--ZGUGadPGqlZCwoGt-8kv3HEdyS2WseePG-pPCVK~X-lHnOMXs51QYmOdJBDRjRJSjQ-abtO7AQ__",
    },
    {
      id: 4,
      name: "Product 1",
      price: 19.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/c95d/5dd3/584da49eb53713d2f06a775d13085d75?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fGtkGDPMg53FPYGIDASuxb4-~dFL8ikNGIlNlKcRHkAVbB34PW5JVaSCBy7tIvTuIdkJwyf3haWFOzhApv4dTljC-Sficd2WkGXedWagLGwGUYsWys1VXITmJg5vKRsu1fTV9OVi6jPkOhd6CRb6N0lOE15GjG0RrM2qjey5eTIa2Nclg9f5pbLBIzVD6BYYFPP2Yay~yUCjLie-7mcYY-7m2J13TQMg4ntvTQTZxkVO4GxGHWzDzb6DxXxLOWRGHPO3QM-Kba9zURwBFIYH92GQJ8eSY8xkhx9VxTt99a1MLv~mxksjygteyMIWGM5qzLIzG8a14Qg3H4-tbhCK0w__",
    },
    {
      id: 5,
      name: "Product 2",
      price: 29.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/8240/ea84/f0a9c9c792671f3aadc4ade11c868b9c?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SKoHpvOepttJ2GwP55MJzid-rxT5MajqBPonPmftYWnJQw3FMLWYJfht-l6YYjD3QGISLFT94uPaa6D~TCAt~HFTpP-c8lJbmJ2mmSXqG0pbl-JJgVWF9dE9HLetwz6OXdn7t5EpH11SrVq1sDtmYb~KQCSjfV2W5yMNRU-yrG8op3PTgXyTtc-5Tr3-jjROpSLN77vlYmwkqp~B9OG~7N7KibaEXnSOqBCQG5FN7mBdWEj-XtIKhmZypuLY6Jh3MUwAC5DR9ZmzhK5ntcWuVaAxilaHD6oqsJrL6f52aeDMwgNH-Re1QV4m1BkydQvmzAhBlSnHBQMKoUBlPLlIqA__",
    },
    {
      id: 6,
      name: "Product 3",
      price: 39.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/48da/3389/e0819ea25b6af0c626494aa261acced5?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mwhBZQ~DOe3WSTK5tScBg-joDMOBrAwxyrU3kdiMwSFNQnxv0NXRC~55JsoEnl4NZvV3aW8bqMkmT1keVKINZptewRv6F88nB9W96KY~EthzYMWQ-MwaI0KG7ty4rubLuTkEJ-jOk4-Qd1cqAop-tvkkus3famAE93Wga~cijaqf5vHAvToQXItrryRhgk-DhfIS679BSigISx~joVRj~n01acy6GbMQy3ymXicEXB3DglH~vpI7jLvxzE63O2musdJvDXcfEJ--ZGUGadPGqlZCwoGt-8kv3HEdyS2WseePG-pPCVK~X-lHnOMXs51QYmOdJBDRjRJSjQ-abtO7AQ__",
    },
    {
      id: 7,
      name: "Product 1",
      price: 19.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/c95d/5dd3/584da49eb53713d2f06a775d13085d75?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fGtkGDPMg53FPYGIDASuxb4-~dFL8ikNGIlNlKcRHkAVbB34PW5JVaSCBy7tIvTuIdkJwyf3haWFOzhApv4dTljC-Sficd2WkGXedWagLGwGUYsWys1VXITmJg5vKRsu1fTV9OVi6jPkOhd6CRb6N0lOE15GjG0RrM2qjey5eTIa2Nclg9f5pbLBIzVD6BYYFPP2Yay~yUCjLie-7mcYY-7m2J13TQMg4ntvTQTZxkVO4GxGHWzDzb6DxXxLOWRGHPO3QM-Kba9zURwBFIYH92GQJ8eSY8xkhx9VxTt99a1MLv~mxksjygteyMIWGM5qzLIzG8a14Qg3H4-tbhCK0w__",
    },
    {
      id: 8,
      name: "Product 2",
      price: 29.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/8240/ea84/f0a9c9c792671f3aadc4ade11c868b9c?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SKoHpvOepttJ2GwP55MJzid-rxT5MajqBPonPmftYWnJQw3FMLWYJfht-l6YYjD3QGISLFT94uPaa6D~TCAt~HFTpP-c8lJbmJ2mmSXqG0pbl-JJgVWF9dE9HLetwz6OXdn7t5EpH11SrVq1sDtmYb~KQCSjfV2W5yMNRU-yrG8op3PTgXyTtc-5Tr3-jjROpSLN77vlYmwkqp~B9OG~7N7KibaEXnSOqBCQG5FN7mBdWEj-XtIKhmZypuLY6Jh3MUwAC5DR9ZmzhK5ntcWuVaAxilaHD6oqsJrL6f52aeDMwgNH-Re1QV4m1BkydQvmzAhBlSnHBQMKoUBlPLlIqA__",
    },
    {
      id: 9,
      name: "Product 3",
      price: 39.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/48da/3389/e0819ea25b6af0c626494aa261acced5?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mwhBZQ~DOe3WSTK5tScBg-joDMOBrAwxyrU3kdiMwSFNQnxv0NXRC~55JsoEnl4NZvV3aW8bqMkmT1keVKINZptewRv6F88nB9W96KY~EthzYMWQ-MwaI0KG7ty4rubLuTkEJ-jOk4-Qd1cqAop-tvkkus3famAE93Wga~cijaqf5vHAvToQXItrryRhgk-DhfIS679BSigISx~joVRj~n01acy6GbMQy3ymXicEXB3DglH~vpI7jLvxzE63O2musdJvDXcfEJ--ZGUGadPGqlZCwoGt-8kv3HEdyS2WseePG-pPCVK~X-lHnOMXs51QYmOdJBDRjRJSjQ-abtO7AQ__",
    },
    {
      id: 10,
      name: "Product 1",
      price: 19.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/c95d/5dd3/584da49eb53713d2f06a775d13085d75?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fGtkGDPMg53FPYGIDASuxb4-~dFL8ikNGIlNlKcRHkAVbB34PW5JVaSCBy7tIvTuIdkJwyf3haWFOzhApv4dTljC-Sficd2WkGXedWagLGwGUYsWys1VXITmJg5vKRsu1fTV9OVi6jPkOhd6CRb6N0lOE15GjG0RrM2qjey5eTIa2Nclg9f5pbLBIzVD6BYYFPP2Yay~yUCjLie-7mcYY-7m2J13TQMg4ntvTQTZxkVO4GxGHWzDzb6DxXxLOWRGHPO3QM-Kba9zURwBFIYH92GQJ8eSY8xkhx9VxTt99a1MLv~mxksjygteyMIWGM5qzLIzG8a14Qg3H4-tbhCK0w__",
    },
    {
      id: 11,
      name: "Product 2",
      price: 29.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/8240/ea84/f0a9c9c792671f3aadc4ade11c868b9c?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SKoHpvOepttJ2GwP55MJzid-rxT5MajqBPonPmftYWnJQw3FMLWYJfht-l6YYjD3QGISLFT94uPaa6D~TCAt~HFTpP-c8lJbmJ2mmSXqG0pbl-JJgVWF9dE9HLetwz6OXdn7t5EpH11SrVq1sDtmYb~KQCSjfV2W5yMNRU-yrG8op3PTgXyTtc-5Tr3-jjROpSLN77vlYmwkqp~B9OG~7N7KibaEXnSOqBCQG5FN7mBdWEj-XtIKhmZypuLY6Jh3MUwAC5DR9ZmzhK5ntcWuVaAxilaHD6oqsJrL6f52aeDMwgNH-Re1QV4m1BkydQvmzAhBlSnHBQMKoUBlPLlIqA__",
    },
    {
      id: 12,
      name: "Product 3",
      price: 39.99,
      imageUrl:
        "https://s3-alpha-sig.figma.com/img/48da/3389/e0819ea25b6af0c626494aa261acced5?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mwhBZQ~DOe3WSTK5tScBg-joDMOBrAwxyrU3kdiMwSFNQnxv0NXRC~55JsoEnl4NZvV3aW8bqMkmT1keVKINZptewRv6F88nB9W96KY~EthzYMWQ-MwaI0KG7ty4rubLuTkEJ-jOk4-Qd1cqAop-tvkkus3famAE93Wga~cijaqf5vHAvToQXItrryRhgk-DhfIS679BSigISx~joVRj~n01acy6GbMQy3ymXicEXB3DglH~vpI7jLvxzE63O2musdJvDXcfEJ--ZGUGadPGqlZCwoGt-8kv3HEdyS2WseePG-pPCVK~X-lHnOMXs51QYmOdJBDRjRJSjQ-abtO7AQ__",
    },
    // Add more products as needed
  ];
  return (
    <>
      <div className=" mt-44 left-0 right-0  px-6 lg:px-24 ">
        <div className=" z-0 ">
          <h1 className="text-5xl font-bold font-sans mb-12 gap-1 ">
            <span className="relative  text-transparent ml-2 bg-gradient-to-r   from-[#FC001E] to-[#FF7D57] bg-clip-text">
              {name}
            </span>
          </h1>
          <div>
            <Searchbar />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  gap-12 mt-4 justify-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-12 gap-2 text-gray-300">
          <div className="border border-gray-400 rounded-full p-1 hover:bg-gray-400">
            <IoIosArrowBack size={20} />
          </div>
          <div className="border border-gray-400 rounded-full p-1 hover:bg-gray-400">
            <IoIosArrowForward size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionPage;
