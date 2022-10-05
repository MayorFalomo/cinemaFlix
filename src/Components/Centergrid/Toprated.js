import React from "react";
import Rated from "./Rated";
import "./Toprated.css";
import Carousel from "react-multi-carousel";

const Toprated = ({
  movies,
  topRated,
  watchList,
  setWatchList,
  searchInput,
}) => {
  const responsive = {
    Monitor: {
      breakpoint: { max: 2000, min: 1850 },
      items: 5,
      slidesToSlide: 2, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1850, min: 1650 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    system: {
      breakpoint: { max: 1650, min: 1070 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1070, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="rating">
      <div className="topratedSect">
        <h1>Top Rated⭐ </h1>
      </div>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        keyBoardControl={true}
        customTransition="all 5 ease"
        transitionDuration={2000}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {topRated.map((top) => {
          return (
            <Rated
              key={top.id}
              top={top}
              watchList={watchList}
              setWatchList={setWatchList}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default Toprated;
