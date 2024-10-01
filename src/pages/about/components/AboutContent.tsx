import { Box, Link, Typography } from '@mui/material'
import LinkSpan from 'components/LinkSpan'
import { Color } from 'utils/types'

const creators = [
  'лепус — Дизайн интерфейсов',
  'Wabar (Ваки) — Графический дизайн',
  'CorruptedMushroom — Бекенд сервер',
  'olegsvs — Сайт, домен, хостинг',
  'gawk — Домен, хостинг',
  'madf12 — Фронтенд, канвас картинок',
  '提督_ポイ(ADmiral_POI) — Организация дискорда',
  'pechenka242 — Тестирование, обсуждение',
  'ShiroiKumo — Тестирование, обсуждение',
  'Virtuoz — Обсуждение, идеи',
  'mapcar — Фронтенд, организация',
]

const sponsors: String[] = []

export default function AboutContent() {
  return (
    <Box display="flex" justifyContent="center">
      <Box textAlign={'center'} width={'800px'}>
        <Typography fontSize={'32px'} fontWeight={600}>
          Специально для ивента АУКУС 2024
        </Typography>
        <Box marginTop={6} display={'flex'} justifyContent={'space-between'}>
          <Box width={'300px'}>
            <Box marginBottom={2}>
              <Typography fontSize={'24px'}>Создатели</Typography>
            </Box>

            {creators.map((item, index) => {
              return (
                <Box marginTop={2} key={index}>
                  <Typography fontSize={'16px'}>{item}</Typography>
                </Box>
              )
            })}
          </Box>

          <Box width={'300px'}>
            <Box marginBottom={2} fontSize={'24px'}>
              <Link
                href="https://boosty.to/aukus"
                rel="noopener nereferrer"
                target="_blanc"
              >
                <LinkSpan color={Color.blue}>Спонсоры</LinkSpan>
              </Link>
            </Box>

            {sponsors.map((item, index) => {
              return (
                <Box marginTop={2} key={index}>
                  <Typography fontSize={'16px'}>{item}</Typography>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
