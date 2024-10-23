import { styled } from '@mui/system'

interface LinkSpanProps {
  color?: string
  active?: boolean
  defaultColor?: string
  hideUnderline?: boolean
}

const LinkSpan = styled('span', {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'defaultColor' && prop !== 'hideUnderline', // This prevents the `active` prop from being passed to the DOM element
})<LinkSpanProps>(({
  color,
  active,
  defaultColor = 'white',
  hideUnderline,
}: LinkSpanProps) => {
  return {
    borderBottom: hideUnderline ? '0' : `2px solid ${color || defaultColor}`,
    color: active ? color : defaultColor,
    ':hover': {
      color: color || defaultColor,
      cursor: 'pointer',
    },
  }
})

export default LinkSpan
