'use client';
import { useState, useEffect } from 'react';
type WindowDimension = {
    width: number,
    height: number
}

const getWindowDimension = (): WindowDimension => {
    if (typeof window !== 'undefined') {
        const { innerHeight: width, innerHeight: height } = window;
        return {
            width,
            height
        }
    }
    else{
        return {
            width:0,
            height:0
        }
    }
}

const useWindowDimensions = (): WindowDimension => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimension>(getWindowDimension());


    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimension());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export default useWindowDimensions
