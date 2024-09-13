import { Box, Divider, Grid, Link, Typography } from '@mui/material'

export default function AboutPage() {
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Box textAlign={'center'}>
          <Typography variant="h4">Специально для ивента АУКУС 2024</Typography>
          <Box marginTop={6} />
          <Typography variant="h4">Создатели</Typography>
          <Box marginTop={4} />
          <Typography variant="h5">лепус — Дизайн интерфейсов</Typography>
          <Box marginTop={2} />
          <Typography variant="h5">
            Wabar (Ваки) — Графический дизайн
          </Typography>
          <Box marginTop={2} />
          <Typography variant="h5">
            CorruptedMushroom — Бекенд сервер
          </Typography>
          <Box marginTop={2} />
          <Typography variant="h5">olegsvs — Сайт, домен, хостинг</Typography>
          <Box marginTop={2} />
          <Typography variant="h5">gawk — Домен, хостинг</Typography>
          <Box marginTop={2} />
          <Typography variant="h5">
            madf12 — Фронтенд, канвас картинок
          </Typography>
          <Box marginTop={2} />
          <Typography variant="h5">
            提督_ポイ(ADmiral_POI) — Организация дискорда
          </Typography>
          <Box marginTop={2} />
          <Typography variant="h5">
            pechenka242 — Тестирование, обсуждение
          </Typography>
          <Box marginTop={2} />
          <Typography variant="h5">
            ShiroiKumo — Тестирование, обсуждение
          </Typography>
          <Box marginTop={2} />
          <Typography variant="h5">Virtuoz — Обсуждение, идеи</Typography>
          <Box marginTop={2} />
          <Typography variant="h5">mapcar — Фронтенд, огранизация</Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" marginTop={20}>
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

      <Box marginTop={2} marginBottom={10}>
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
              <span className="green">Дискорд</span>
            </Link>
          </Grid>
          <Grid item xs={3.5} textAlign="left">
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
