import React from "react";
import { motion } from "framer-motion";

const Card = ({ nftgeek, toniq }) => {
  return (
    <>
      <div
        className="bg-white rounded-xl w-full h-[400px] overflow-hidden"
        style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.4)" }}
      >
        <div className="w-full h-full">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            src="https://s3-alpha-sig.figma.com/img/7a4c/b37b/155e7f59d0a8b94c4168cb5240bd1e65?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jPOZEotrdDZi1xKBEDTq5RJa8YTfs75rb1PMOad5E9ZOI6O7q91KWS3XdE3Tumq-UWYJ44XZkmG~UnAPXXxbGw3yPiKwT-acKZfwlkatj6thE2CSMZXVWthAFQ5eUUh69OgfP6Cfu5zUE6WDXjVJQFV7AKjwuJxmDkTzckX3SZpg0qDPIXqMyeKozZEerYOlh9htYXzrKSkhIxPqlmj4sP2n~WVV1V4H3LpE9u8SCvEn494H-eyBG8YkC0C6Q~O6o6~n2o7hSsuojX8inIqC-~op7ObDkGbmzWsqb88L1dUOfRo7I6-X~f2mKNxKrJ84xGgKjYwYcELK0Y~L505YFQ__"
            alt=""
            className="object-cover w-full h-full rounded-3xl p-3"
          ></motion.img>
        </div>
      </div>
    </>
  );
};

export default Card;
