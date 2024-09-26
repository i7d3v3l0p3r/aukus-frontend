import React, { useEffect, useState } from 'react';


export function useRefDimensions(containerRef: React.RefObject<HTMLDivElement>) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const getDimensions = () => ({
      width: containerRef.current?.offsetWidth ?? 0,
      height: containerRef.current?.scrollHeight ?? 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (containerRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  return dimensions;
}
