import { useState } from "react";
// import Header from "./Components/Header";
import sculptures from "./Assets/Images/cropped-IMG_4192.jpeg"
import tanjore from "./Assets/Images/Design (1).png"
import img3 from "./Assets/Images/pexels-w-w-889839.jpg"
import Slider from './Components/CustomSlider'

const App = () => {
  // const [index,setIndex]=useState(0)
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
      src:tanjore,
      text:"Resin",
    },
    {
      src:tanjore,
      text:"Relief",
    },
    {
      src:img3,
      text:"Marble",
    },
    {
      src:img3,
      text:"Decoupage",
    },
    {
      src:img3,
      text:"Clay",
    },
    {
      src:img3,
      text:"Canvas",
    },
  ]

  return (
    <>
    <Slider images={images}/>
    </>
  );
};

export default App;
