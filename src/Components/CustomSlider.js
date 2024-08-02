import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context';

const CustomSlider = ({ images }) => {
  const [scale, setScale] = useState(1);
  const { setLoading } = useUser();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: () => setIsAnimating(true),
    afterChange: () => {
      setScale(1);
      setIsAnimating(false);
    },
  };

  const goNext = () => {
    if (!isAnimating) {
      setScale(0.8);
      setIsAnimating(true);
      setTimeout(() => {
        sliderRef.current.slickNext();
      }, 800);
    }
  };

  const goPrev = () => {
    if (!isAnimating) {
      setScale(0.8);
      setIsAnimating(true);
      setTimeout(() => {
        sliderRef.current.slickPrev();
      }, 800);
    }
  };

  const handleClick = async (e, link) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('gallery/' + link.toLowerCase());
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed h-screen w-screen top-0">
      <Slider ref={sliderRef} {...settings} style={{ maxHeight: '100%' }}>
        {images.map((image, index) => (
          <Link
            onClick={(e) => handleClick(e, image.text)}
            to={'gallery/' + image.text.toLowerCase()}
            key={index}
            className="bg-white flex items-center justify-center h-screen w-screen"
            style={{ maxHeight: '100%' }}
          >
            <div className="relative w-full h-full">
              <img
                className='w-full h-full aspect-[16/9] object-cover'
                src={window.innerWidth < 640 ? image.src2 : image.src}
                alt={`Slide ${index + 1}`}
                style={{ transform: `scale(${scale})`, transition: 'transform 0.6s ease-in-out', maxHeight: '100%' }}
              />
              <p className='capitalize text-white text-center w-full text-9xl absolute overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-shrink-0 whitespace-nowrap antialiased pb-6 bg-black bg-opacity-50 max-sm:text-6xl max-sm:pb-6 max-sm:pt-4'
                style={{ opacity: scale === 1 ? "1" : "0", width: scale === 1 ? "100%" : "80%", transition: 'all 0.6s ease-in-out' }}
              >
                {image.text}
              </p>
            </div>
          </Link>
        ))}
      </Slider>
      <button
        className="prev-button absolute top-1/2 transform -translate-y-1/2 left-4 bg-white bg-opacity-50 text-black px-4 py-2 rounded-full"
        onClick={goPrev}
        disabled={isAnimating}
        style={{ cursor: isAnimating ? 'not-allowed' : 'pointer' }}
      >
        &#10094;
      </button>
      <button
        className="next-button absolute top-1/2 transform -translate-y-1/2 right-4 bg-white bg-opacity-50 text-black px-4 py-2 rounded-full"
        onClick={goNext}
        disabled={isAnimating}
        style={{ cursor: isAnimating ? 'not-allowed' : 'pointer' }}
      >
        &#10095;
      </button>
    </div>
  );
};

export default CustomSlider;
