import { styled } from '@mui/system'

interface LinkSpanProps {
  color?: string
  active?: boolean
}

const LinkSpan = styled('span', {
  shouldForwardProp: (prop) => prop !== 'active', // This prevents the `active` prop from being passed to the DOM element
})<LinkSpanProps>(({ color, active }: LinkSpanProps) => {
  const defaultColor = 'white'
  return {
    borderBottom: `2px solid ${color || defaultColor}`,
    color: active ? color : 'white',
    ':hover': {
      color: color || defaultColor,
      cursor: 'pointer',
    },
  }
})

export default LinkSpan
