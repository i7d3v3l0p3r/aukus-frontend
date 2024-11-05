import { Box, Divider, Link } from '@mui/material'
import LinkSpan from './LinkSpan'
import { Color } from 'src/utils/types'

export default function BottomSectionMobile() {
  return (
    <Box style={{ backgroundColor: Color.greyDarkest }} marginTop={'100px'}>
      <Box
        paddingTop={'20px'}
        paddingBottom={'100px'}
        display="flex"
        justifyContent="start"
        flexDirection="column"
        margin={'auto'}
        width={'fit-content'}
        textAlign="left"
      >
        <Box fontSize={'16px'} fontWeight={700}>
          Поддержать сайт
        </Box>
        <Box marginTop={'8px'} fontSize={'14px'} fontWeight={500}>
          <Link
            href="https://boosty.to/aukus"
            rel="noopener nereferrer"
            target="_blank"
          >
            <LinkSpan color={Color.blue}>https://boosty.to/aukus</LinkSpan>
          </Link>
        </Box>
        <Box fontSize={'16px'} fontWeight={700} marginTop={'27px'}>
          Контакты
        </Box>
        <Box marginTop={'8px'} fontSize={'14px'} fontWeight={500}>
          <Link
            href="https://discord.gg/SHsyYTjNb5"
            rel="noopener nereferrer"
            target="_blank"
          >
            <LinkSpan color={Color.blue}>Дискорд: Аукус Разработка</LinkSpan>
          </Link>
        </Box>
        <Box fontSize={'16px'} fontWeight={700} marginTop={'27px'}>
          GitHub
        </Box>
        <Box marginTop={'8px'} fontSize={'14px'} fontWeight={500}>
          <Link
            href="https://github.com/aukus-devs"
            rel="noopener nereferrer"
            target="_blank"
          >
            <LinkSpan color={Color.blue}>
              https://github.com/aukus-devs
            </LinkSpan>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
