import { Box, Divider, Grid, Link, Typography } from '@mui/material'
import { Color } from 'utils/types'
import LinkSpan from './LinkSpan'

export default function BottomSection() {
  return (
    <Box>
      <Box display="flex" justifyContent="center" marginTop={30}>
        <Box width="85%">
          <Divider
            variant="fullWidth"
            sx={{
              backgroundColor: 'white',
              opacity: 1.0,
              textAlign: 'center',
            }}
          />
        </Box>
      </Box>
      <Box marginTop={'30px'} marginBottom={5}>
        <Grid container columns={12} sx={{ width: '100%' }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3} textAlign="left">
            <Typography variant="h6">Контакты</Typography>
            <Box marginTop={'15px'}>
              Дискорд:{' '}
              <Link
                href="https://discord.gg/SHsyYTjNb5"
                rel="noopener nereferrer"
                target="_blank"
              >
                <LinkSpan color={Color.blue}>Аукус Разработка</LinkSpan>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={3.3} textAlign="left">
            <Typography variant="h6">GitHub</Typography>
            <Box marginTop={'15px'}>
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
          </Grid>
          <Grid item xs={3} textAlign="left">
            <Typography variant="h6">Поддержать сайт</Typography>
            <Box marginTop={'15px'}>
              <Link href="#" rel="noopener nereferrer" target="_blank">
                <LinkSpan color={Color.blue}>Ссылка</LinkSpan>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
