import { Box, Button, Link } from '@mui/material'
import { Color } from 'utils/types'

const creators = [
  {
  name: 'лепус',
  text: 'Дизайн интерфейсов',
  },
  {
  name: 'Wabar (Ваки)',
  text: 'Графический дизайн',
  },
  {
  name: 'CorruptedMushroom',
  text: 'Бекенд сервер',
  },
  {
  name: 'olegsvs',
  text: 'Сайт, домен, хостинг',
  },
  {
  name: 'gawk',
  text: 'Домен, хостинг',
  },
  {
  name: 'madf12',
  text: 'Фронтенд, канвас картинок',
  },
  {
  name: '提督_ポイ(ADmiral_POI)',
  text: 'Организация дискорда',
  },
  {
  name: 'pechenka242',
  text: 'Тестирование, обсуждение',
  },
  {
  name: 'ShiroiKumo',
  text: 'Тестирование, обсуждение',
  },
  {
  name: 'Virtuoz',
  text: 'Обсуждение, идеи',
  },
  {
  name: 'mapcar',
  text: 'Фронтенд, организация',
  },
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
          Вы можете поддержать сайт и разработчиков
        </Box>
        <Box marginTop={'50px'}>
          <Link
            href="https://boosty.to/aukus"
            rel="noopener nereferrer"
            target="_blank"

          >
        <Button style={{fontSize: '16px', fontWeight: 500}}>
          Поддержать на бусти
        </Button>
          </Link>
        </Box>

        <Box marginTop={'100px'} fontSize={'32px'}>
          Наши спонсоры
        </Box>
        <Box marginTop={'10px'} fontSize={'20px'}>
          {sponsors.map((item, index) => {
            return (
              <Box marginTop={'20px'} key={index} color={'white'}>
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
              <Box key={index} marginTop={'20px'}>
                <span style={{ color: 'white' }}>{item.name}</span>
                {' '}
                <span style={{ color: Color.greyNew }}>— {item.text}</span>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
