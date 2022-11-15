import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';

import "./Home.css";

const Home = () => {
  const [index, setIndex] = useState(0);
  
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselItems = [
    {    
      title: "Grilled Corn",
      img: "Grilled-Corn.jpg",
      caption: "You know you can't resist the crispy, buttery goodness."
    },
    {
      title: "Corn Milk",
      img: "Corn-Milk.jpg",
      caption: "Never had it before, but it sounds kinda good actually!"
    },
    {
      title: "Shepherd's Pie",
      img: "Shepherd's-Pie.jpg",
      caption: "Damn, now I'm hungry!"
    },
    {      
      title: "Regrets?",
      img: "Meme.png",
      caption: "The cream corn is suspiciously sweet. Don't think about it, just enjoy."
    }
  ];

  const renderedCarouselItems = carouselItems.map((carouselItem) => {
    return (
      <Carousel.Item>
        <div className="home-carousel-img-container">
          <img  
            className="d-block w-100"
            src={"/img/" + carouselItem.img}
            alt=""
          />
        </div>
        <div className="home-carousel-caption-container">
          <Carousel.Caption>
            <h3>{carouselItem.title}</h3>
            <p>{carouselItem.caption}</p>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    );
  });

  return (
    <div className="home-container">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {renderedCarouselItems}
      </Carousel>
    </div>
  );
};

export default Home;