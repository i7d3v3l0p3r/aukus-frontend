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

const sponsors: string[] = ['Стань первым']

export default function AboutContent() {
  return (
    <Box display="flex" justifyContent="center">
      <Box textAlign={'left'} width={'740px'}>
        <Box fontSize={'48px'} fontWeight={700}>
          Сайт сделан специально для третьего сезона АУКУСа
        </Box>

        <Box marginTop={'30px'} fontSize={'20px'} fontWeight={500}>
          Вы можете поддержать сайт и разработчиков через бусти
        </Box>
        <Box marginTop={'20px'} fontSize={'14px'} fontWeight={500}>
          <LinkSpan color={Color.greyNew}>
            <Link
              href="https://boosty.to/aukus"
              rel="noopener nereferrer"
              target="_blank"
              style={{color: Color.greyNew}}
            >
              boosty.to/aukus/donate
            </Link>
          </LinkSpan>
        </Box>

        <Box marginTop={'100px'} fontSize={'32px'}>
          Наши спонсоры
        </Box>
        <Box marginTop={'10px'} fontSize={'20px'}>
          {sponsors.map((item, index) => {
            return (
              <Box marginTop={'20px'} key={index} color={Color.greyNew}>
                {item}
              </Box>
            )
          })}
        </Box>
        <Box marginTop={'100px'} fontSize={'32px'}>
          Команда разработки сайта
        </Box>
        <Box marginTop={'10px'} fontSize={'20px'}>
          {creators.map((item, index) => {
            return (
              <Box key={index} marginTop={'20px'} color={Color.greyNew}>
                {item}
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
