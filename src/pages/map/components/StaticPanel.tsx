import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
}

export default function StaticPanel({ children }: Props) {
  const [isFixed, setIsFixed] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // Empty dependency array ensures the effect runs only on mount and unmount

  const containerRef = useRef<HTMLDivElement>(null)
  const mapBottom = document.getElementById('map-cell-0')

  if (containerRef.current && mapBottom) {
    const makeFixed =
      window.innerHeight - mapBottom.getBoundingClientRect().bottom < 295

    if (!makeFixed && isFixed) {
      setIsFixed(false)
    }

    if (makeFixed && !isFixed) {
      setIsFixed(true)
    }
  }

  return (
    <Box display={'flex'} justifyContent="center">
      <Box
        minWidth={'1300px'}
        width={'1300px'}
        sx={{
          position: isFixed ? 'fixed' : 'absolute',
          zIndex: 20,
          ...(isFixed ? { bottom: 100 } : { marginTop: '30px' }),
        }}
        ref={containerRef}
      >
        {children}
      </Box>
    </Box>
  )
}
