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

/* ----------------------------------------------------------------------------------------------------- */
/*  @ <HomePageB /> : Soccer collection.
/* ----------------------------------------------------------------------------------------------------- */
const HomePageB = () => {
  const collectionsData = [
    { image: soccer1, title: "Name", subtitle: "By The Name" },
    { image: soccer1, title: "Name", subtitle: "By The Name" },
    { image: soccer1, title: "Name", subtitle: "By The Name" },
    { image: soccer1, title: "Name", subtitle: "By The Name" },
  ];

  return (
    <div className="md:p-24 max-md:p-6 flex flex-col gap-8">
      <FancyHeader normal="Champ's" fancy="collection" />
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="p-4"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {collectionsData.map((collection, index) => (
          <Collections
            key={index}
            image={collection.image}
            title={collection.title}
            subtitle={collection.subtitle}
          />
        ))}
      </Carousel>
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
