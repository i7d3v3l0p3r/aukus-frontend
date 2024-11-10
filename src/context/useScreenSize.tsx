import { useEffect, useState } from 'react'

type Params = {
  updateOnResize?: boolean
}

export default function useScreenSize({ updateOnResize = false }: Params = {}) {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    // Function to update the window size state
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    // Add event listener to handle window resize
    if (updateOnResize) {
      window.addEventListener('resize', handleResize)
    }

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array ensures this runs only once on mount

  const isMobile = width < 768
  const headerSize = isMobile ? '36px' : '48px'

  return { width, height, isMobile, headerSize }
}
