import { useState } from "react";
import Header from "./Components/Header";
import sculptures from "./Assets/Images/cropped-IMG_4192.jpeg"
import tanjore from "./Assets/Images/Design (1).png"
import img3 from "./Assets/Images/pexels-w-w-889839.jpg"
import Slider from './Components/CustomSlider'

const App = () => {
  const [index,setIndex]=useState(0)
  const images=[
    {
      src:sculptures,
      text:"sculptures",
    },
    {
      src:tanjore,
      text:"Tanjore",
    },
    {
      src:img3,
      text:"Wall Painting",
    }
  ]
  function handleImageClick(){
    const imgTag=document.querySelector('#img-tag')
    // imgTag.style.transform="scale(0.2)"
    
    setIndex((index+1)%3)
  }

  return (
    <>
    <Slider images={images}/>
    </>
  );
};

export default App;
