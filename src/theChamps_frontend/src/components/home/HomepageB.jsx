/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import soccer1 from "../../assets/images/soccer1.jpeg";
import CustomButton from "../common/CustomButton";
import { MdArrowOutward } from "react-icons/md";
import FancyHeader from "../common/FancyHeader";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Grid, Pagination, Navigation, Keyboard } from "swiper/modules";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageB /> : Soccer collection.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageB = () => {
  const collectionsData = [
    { image: soccer1, title: "Name1", subtitle: "By The Name" },
    { image: soccer1, title: "Name2", subtitle: "By The Name" },
    { image: soccer1, title: "Name3", subtitle: "By The Name" },
    { image: soccer1, title: "Name4", subtitle: "By The Name" },
    { image: soccer1, title: "Name5", subtitle: "By The Name" },
    { image: soccer1, title: "Name6", subtitle: "By The Name" },
    { image: soccer1, title: "Name7", subtitle: "By The Name" },
    { image: soccer1, title: "Name8", subtitle: "By The Name" },
    { image: soccer1, title: "Name9", subtitle: "By The Name" },
    { image: soccer1, title: "Name10", subtitle: "By The Name" },
    { image: soccer1, title: "Name11", subtitle: "By The Name" },
    { image: soccer1, title: "Name12", subtitle: "By The Name" },
    { image: soccer1, title: "Name13", subtitle: "By The Name" },
    { image: soccer1, title: "Name14", subtitle: "By The Name" },
    { image: soccer1, title: "Name15", subtitle: "By The Name" },
    { image: soccer1, title: "Name16", subtitle: "By The Name" },
  ];

  return (
    <div className="md:p-24 max-md:p-6 flex flex-col gap-8">
      <FancyHeader normal="Champ's" fancy="collection" />
      <div>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          keyboard={{
            enabled: true,
          }}
          navigation={true}
          modules={[Grid, Pagination, Navigation, Keyboard]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
            640: {
              slidesPerView: 2,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
            768: {
              slidesPerView: 3,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
            1024: {
              slidesPerView: 4,
              grid: {
                rows: 2,
                fill: "row",
              },
            },
          }}
          className="mySwiper"
        >
          {collectionsData.map((collection, index) => (
            <SwiperSlide key={index}>
              <Collections
                key={index}
                image={collection.image}
                title={collection.title}
                subtitle={collection.subtitle}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <span className="flex justify-center gap-4 py-6">
        <CustomButton>
          View collections <MdArrowOutward size={24} />{" "}
        </CustomButton>
      </span>
    </div>
  );
};

const Collections = ({ image, title, subtitle }) => {
  return (
    <div className="flex flex-col gap-4">
      <img src={image} alt="image" className="rounded-2xl object-contain" />
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-[28px] font-bold">{title}</h1>
        <p className="text-[15px] text-[#7B7583]">{subtitle}</p>
      </div>
    </div>
  );
};

export default HomePageB;
