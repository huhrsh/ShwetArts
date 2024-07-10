import { useState } from "react";
// import Header from "./Components/Header";
import sculptures from "./Assets/Images/cropped-IMG_4192.jpeg"
// import tanjore from "./Assets/Images/tanjore.jpeg"
// import relief from "./Assets/Images/relief.jpg"
// import resin from "./Assets/Images/resin.jpg"
import img3 from "./Assets/Images/pexels-w-w-889839.jpg"
// import decoupage from "./Assets/Images/decoupage.jpeg"
// import clay from "./Assets/Images/clay.jpeg"
// import marble from "./Assets/Images/marble.jpeg"
import Slider from './Components/CustomSlider'

import tanjore from "./Assets/Images/Client/tanjouronwall (1).png"
import resin from "./Assets/Images/Client/Design 3 (1).png"
import relief from "./Assets/Images/Client/Design 2 (1).png"
import marble from "./Assets/Images/Client/Designer (2) (1).png"
import decoupage from "./Assets/Images/Client/IMG_4439 (1).jpeg"
import clay from "./Assets/Images/Client/Design 9 (4).png"
import canvas from "./Assets/Images/Client/pixelcut-export.png"

const App = () => {
  // const [index,setIndex]=useState(0)
  const images=[
    {
      src:sculptures,
      text:"sculpture",
    },
    {
      src:tanjore,
      text:"Tanjore",
    },
    {
      src:resin,
      text:"Resin",
    },
    {
      src:relief,
      text:"Relief",
    },
    {
      src:marble,
      text:"Marble",
    },
    {
      src:decoupage,
      text:"Decoupage",
    },
    {
      src:clay,
      text:"Clay",
    },
    {
      src:canvas,
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
