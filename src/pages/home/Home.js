import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';

import "./Home.css";

const Home = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="home-container">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <div className="home-carousel-img-container">
            <img
              className="d-block w-100"
              src="/img/CornGrub.png"
              alt=""
            />
          </div>
          <div className="home-carousel-caption-container">
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="home-carousel-img-container">
            <img
              className="d-block w-100"
              src="/img/Meme.png"
              alt=""
            />
          </div>
          <div className="home-carousel-caption-container">
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;