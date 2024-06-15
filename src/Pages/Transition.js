// Loading.js
import React, { useState, useEffect } from 'react';
import { useUser } from '../context';
import { useLocation } from 'react-router-dom';

const Transition = () => {
    const {setLoading}=useUser()
    const location = useLocation();
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); 
        return () => clearTimeout(timer);
    }, [location]);
    
    return (
        <div className={`loading-container fixed left-0 top-0 w-screen flex items-center justify-center z-50 transition-all ease-in-out duration-1000 bg-white` }>
            <div className="blob"></div>
            {/* <div className="blob"></div> */}
            {/* <div className="blob"></div> */}
            <div className='absolute w-screen text-9xl font-[outfit] text-white font-bold justify-center items-center flex  h-screen top-0 left-0 backdrop-blur-none z-10'>ShwetArts</div>
        </div>
    );
};

export default Transition;
