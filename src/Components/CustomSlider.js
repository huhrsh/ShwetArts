import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomSlider = ({ images }) => {
  const [scale, setScale] = useState(1);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => {
      // Scale down the image before changing slides
      setTimeout(() => {
        // Slide to the next image after a delay
        sliderRef.current.slickGoTo(next);
      }, 600);
    },

    afterChange: () => {
      // Scale up the new image after changing slides
      setTimeout(() => {
        setScale(1);
      }, 400);
    }
  };

  function goNext() {
    setScale(0.8)
    setTimeout(() => {
      sliderRef.current.slickNext()
    }, 800)
  }
  function goPrev() {
    setScale(0.8)
    setTimeout(() => {
      sliderRef.current.slickPrev()
    }, 800)
  }

  return (
    <div className="fixed h-screen w-screen top-0">
      <Slider ref={sliderRef} {...settings} className="" style={{ maxHeight: '100%' }}>
        {images.map((image, index) => (
          <div key={index} className="bg-white flex items-center justify-center h-screen w-screen" style={{ maxHeight: '100%' }}>
            <div className="relative w-full h-full">
              <img
                className='w-full aspect-[16/9]'
                src={image.src}
                alt={`Slide ${index + 1}`}
                style={{ transform: `scale(${scale})`, transition: 'transform 0.6s ease-in-out', maxHeight: '100%' }}
              />
              <p className='text-white text-center w-full text-9xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-[outfit] antialiased ' style={{ opacity: `${scale === 1 ? "1" : "0"}`, transition: 'all 0.6s ease-in-out', WebkitTextStroke: '1.5px #000', WebkitTextFillColor: '#ffffff10' }}>
                {image.text}
              </p>

              {/* <p className='text-white text-center w-full text-9xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-[outfit] antialiased ' style={{
                opacity: `${scale == 1 ? "1" : "0"}`, transition: 'all 0.6s ease-in-out',
                textShadow: '-1.5px -1.5px 0 #333, 1.5px -1.5px 0 #333, -1.5px 1.5px 0 #333, 1.5px 1.5px 0 #333'
                // textShadow: '1.5px 1.5px 0 #333' 
              }}>{image.text}</p> */}
            </div>
          </div>
        ))}
      </Slider>
      <button className="prev-button absolute top-1/2 transform -translate-y-1/2 left-4 bg-white bg-opacity-50 text-black px-4 py-2 rounded-full" onClick={() => goPrev()}>&#10094;</button>
      <button className="next-button absolute top-1/2 transform -translate-y-1/2 right-4 bg-white bg-opacity-50 text-black px-4 py-2 rounded-full" onClick={() => goNext()}>&#10095;</button>
    </div>
  );
};

export default CustomSlider;
