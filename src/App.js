import { useState } from "react";
import Header from "./Components/Header";
import img1 from "./Assets/pexels-daian-gan-102127.jpg"
import img2 from "./Assets/pexels-min-an-962312.jpg"
import img3 from "./Assets/pexels-w-w-889839.jpg"
import Slider from './Components/CustomSlider'

const App = () => {
  const [index,setIndex]=useState(0)
  const images=[
    {
      src:img1,
      text:"Water Color",
    },
    {
      src:img2,
      text:"Brush Pen",
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
    <Header/>
    {/* <div  className="h-screen w-screen overflow-hidden fixed top-0 bottom-0" onClick={()=>{handleImageClick()}}>
      <img id="img-tag" className="transition object-scale-down object-top aspect-[9/16]" src={images[index]}/>
    </div> */}
    <Slider images={images}/>
    </>
  );
};

export default App;
