import { Box, Divider, Grid, Link, Typography } from '@mui/material'

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
      <Box marginTop={2} marginBottom={5}>
        <Grid container columns={12} sx={{ width: '100%' }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3} textAlign="left">
            <Typography variant="h6">Контакты</Typography>
            Дискорд:{' '}
            <Link
              href="https://discord.gg/SHsyYTjNb5"
              rel="noopener nereferrer"
              target="_blank"
            >
              <span className="green">Аукус Разработка</span>
            </Link>
          </Grid>
          <Grid item xs={3.3} textAlign="left">
            <Typography variant="h6">GitHub</Typography>
            <Link
              href="https://github.com/aukus-devs"
              rel="noopener nereferrer"
              target="_blank"
            >
              <span className="green">https://github.com/aukus-devs</span>
            </Link>
          </Grid>
          <Grid item xs={3} textAlign="left">
            <Typography variant="h6">Поддержать сайт</Typography>
            <Link href="#" rel="noopener nereferrer" target="_blank">
              <span className="green">Ссылка</span>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
