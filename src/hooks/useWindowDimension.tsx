'use client';

import { useState, useEffect } from 'react';
type WindowDimension = {
    width: number,
    height: number
}

const useWindowDimensions = (): WindowDimension => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimension>(
        {
            width: window.innerWidth,
            height: window.innerHeight
        }
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export default useWindowDimensions
