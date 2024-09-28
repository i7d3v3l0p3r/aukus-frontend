import { styled } from '@mui/system'

interface LinkSpanProps {
  color?: string
  active?: boolean
  defaultColor?: string
}

const LinkSpan = styled('span', {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'defaultColor', // This prevents the `active` prop from being passed to the DOM element
})<LinkSpanProps>(({
  color,
  active,
  defaultColor = 'white',
}: LinkSpanProps) => {
  return {
    borderBottom: `2px solid ${color || defaultColor}`,
    color: active ? color : defaultColor,
    ':hover': {
      color: color || defaultColor,
      cursor: 'pointer',
    },
  }
})

export default LinkSpan
