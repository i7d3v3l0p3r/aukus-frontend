import { Box, Typography } from '@mui/material'
import BottomSection from 'components/BottomSection'

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

      <BottomSection />
    </Box>
  )
}
