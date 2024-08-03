import { useState } from "react";
import Slider from './Components/CustomSlider'
import sculptures from "./Assets/Images/cropped-IMG_4192.jpeg"
import sculptures2 from "./Assets/Images/cropped-IMG_41922.jpeg"
import tanjore from "./Assets/Images/Client/tanjouronwall (1).png"
import tanjore2 from "./Assets/Images/Client/tanjouronwall2.png"
import resin from "./Assets/Images/Client/Design 3 (1).png"
import resin2 from "./Assets/Images/Client/Design 32 (1).png"
import relief from "./Assets/Images/Client/Design 2 (1).png"
import relief2 from "./Assets/Images/Client/Design 22 (1).png"
import marble from "./Assets/Images/Client/Designer (2) (1).png"
import marble2 from "./Assets/Images/Client/Designer2 (2) (1).png"
import decoupage from "./Assets/Images/Client/IMG_4439 (1).jpeg"
import decoupage2 from "./Assets/Images/Client/IMG_44392 (1).jpeg"
import clay from "./Assets/Images/Client/Design 9 (4).png"
import clay2 from "./Assets/Images/Client/Design 92 (4).png"
import canvas from "./Assets/Images/Client/pixelcut-export.png"
import canvas2 from "./Assets/Images/Client/pixelcut-export2.png"

const App = () => {
  // const [index,setIndex]=useState(0)
  const images=[
    {
      src:sculptures,
      src2:sculptures2,
      text:"sculpture",
    },
    {
      src2:tanjore2,
      src:tanjore,
      text:"Tanjore",
    },
    {
      src:resin,
      src2:resin2,
      text:"Resin",
    },
    {
      src:relief,
      src2:relief2,
      text:"Relief",
    },
    {
      src:marble,
      src2:marble2,
      text:"Marble",
    },
    {
      src:decoupage,
      src2:decoupage2,
      text:"Decoupage",
    },
    {
      src:clay,
      src2:clay2,
      text:"Clay",
    },
    {
      src:canvas,
      src2:canvas2,
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
