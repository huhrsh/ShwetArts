// Loading.js
import React, { useState, useEffect } from 'react';
import { useUser } from '../context';

const Loading = () => {
    const [fade, setFade] = useState(false);
    const { loading } = useUser()
    // useEffect(() => {
    //     if (!loading) {
    //         const timer = setTimeout(() => {
    //             setFade(true);
    //         }, 1000); // Duration before transition

    //         return () => clearTimeout(timer);
    //     }
    // }, [loading]);

    return (
        <div className={`loading-container fixed left-0 top-0 w-screen flex items-center justify-center z-50 transition-all ease-in-out duration-1000 bg-white ${loading? 'h-screen':'h-0'} ` }>
            <div className="blob"></div>
            {/* <div className="blob"></div> */}
            {/* <div className="blob"></div> */}
            <div className='absolute w-screen text-9xl font-[outfit] text-white font-bold justify-center items-center flex  h-screen top-0 left-0 backdrop-blur-none z-10'>ShwetArts</div>
        </div>
    );
};

export default Loading;
