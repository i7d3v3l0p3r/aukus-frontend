import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'
import { Color } from 'utils/types'

const playerRules = [
  {
    title: 'Правила аукциона и хода стримера',
    content: [
      {
        title: 'Аукцион',
        content: [
          'Стример запускает аукцион на сайте pointauc.com с таймером 20 минут и минимальной ставкой 100 рублей',
          'Время на таймере можно увеличивать за донат только если остаётся менее двух минут (по минуте за донат)',
          'После завершения аукциона и выбора игры (время вращения колеса — не менее 60 секунд), стример начинает прохождение игры',
          'Участники ивента не могут заказывать друг другу игры',
        ],
      },
      {
        title: 'Совершение хода',
        content: [
          'После прохождения игры стример бросает шестигранный кубик и перемещается по игровому полю',
          'Если игра длится более 15 часов (по HLTB), стример может бросить два кубика на клетках от 1 до 80, но на клетках 81-101 — только один',
        ],
      },
    ],
  },
  {
    title: 'Прохождение игр',
    content: [
      {
        title: 'Когда игра считается пройденной',
        content: [
          'Появились финальные титры (кроме шуточных концовок)',
          'Пройдены все уровни (например, в играх "три-в-ряд")',
          'Побит рекорд установленный разработчиком (High Score)',
          'Рогалик (rogue-like) считается пройденным после первой победы над финальным боссом',
        ],
      },
      {
        title: 'Особенности игр',
        content: [
          'В играх с несколькими кампаниями (например, RTS) стример может пройти только одну кампанию на выбор',
          'Если выпала визуальная новелла, весь текст должен быть зачитан (кроме повторений)',
          'Разрешено использовать бонусы из GOTY-изданий, но донатить в игры для упрощения прохождения нельзя',
        ],
      },
    ],
  },
  {
    title: 'Дроп игры',
    content: [
      {
        title: 'Показ перед дропом',
        content: [
          'Игра должна быть показана на стриме хотя бы один час до её дропа',
        ],
      },
      {
        title: 'Наказания за дроп',
        content: [
          'Стример обязан выпить 1 шот крепкого алкоголя (35°) или сделать 30 отжиманий/50 приседаний за каждые 10 000 ₽ на аукционе с выигравшей игрой',
          'Первый шот/отжимания должны быть выполнены сразу после дропа',
          'После выполнения наказания стример бросает кубик и движется по игровому полю в обратную сторону, на клетках 81-101 бросается два кубика',
        ],
      },
    ],
  },
  {
    title: 'Поведение во время стрима',
    content: [
      {
        title: 'Запрещенные действия',
        content: [
          'Читы, трейнеры, сторонние программы для упрощения игры',
          'Использование модов, меняющих баланс игры',
          'Спидран-стратегии, если они были неизвестны до начала прохождения',
        ],
      },
      {
        title: 'Подсказки из чата',
        content: [
          'Подсказки нежелательны, но разрешены для поинт-энд-клик квестов',
          'Запрещено раскрывать абузы или спидран-стратегии',
        ],
      },
      {
        title: 'Кат-сцены и диалоги',
        content: [
          'Запрещено скипать кат-сцены и диалоги при первом прохождении в рамках аукциона',
          'Если стример точно собирается дропнуть игру, он может скипать кат-сцены за последний час перед дропом',
        ],
      },
    ],
  },
  {
    title: 'Сложность и режимы игры',
    content: [
      {
        title: 'Сложность игры',
        content: [
          'Игра должна проходиться на стандартной сложности, предлагаемой по умолчанию',
          'Если в игре нет выбора сложности, стример может выбрать более лёгкий режим, но не "изи"',
          'Если игра автоматически понижает сложность, это не аннулирует прохождение',
        ],
      },
      {
        title: 'Опциональные режимы',
        content: [
          'Если в игре есть два режима (например, "хардкор" и "обычный"), стример вправе выбирать более лёгкий',
        ],
      },
    ],
  },
  {
    title: 'Рероллы и непроходимые игры',
    content: [
      {
        title: 'Непроходимые игры',
        content: [
          'Если аукцион выиграла игра, которая не может быть завершена (например, MMO, песочница), производится реролл',
        ],
      },
      {
        title: 'Условия реролла',
        content: [
          'Игра уже была пройдена',
          'У игры нет концовки',
          'Игра не захватывается OBS или вылетает',
          'Игра запрещена к показу на платформе',
          'В игре отсутствует русский или английский интерфейс',
          'Реролл осуществляется путём повторного вращения колеса с удалением нерабочего варианта',
        ],
      },
    ],
  },
  {
    title: 'Особые правила ивента',
    content: [
      {
        title: 'Финальный рывок',
        content: [
          'Стример, попавший на клетку "Финальный рывок" (101), проводит аукцион и проходит игру, чтобы переместиться на финиш и стать победителем',
        ],
      },
      {
        title: 'Просмотровый аукцион',
        content: [
          'Стример, прошедший 5 игр подряд, может провести просмотровый аукцион по своим правилам. После просмотра фильма бросается 1d4 кубик',
          'На клетке "Финальный рывок" (101) проводить просмотровый аукцион запрещено',
        ],
      },
    ],
  },
  {
    title: 'Наказания для проигравших',
    content: [
      {
        title: 'Последнее место',
        content: [
          'Озвучить 10-12 серий аниме, выбранного другими участниками',
          'Провести одну ночь на улице в образе бомжа',
          'Записать мемное видео',
          'Внести 10 000 рублей в общий фонд на кубок победителю',
        ],
      },
      {
        title: 'Участники с 4 по 12 место',
        content: [
          'Смотреть аниме, озвученное последним местом',
          'Внести вклад в фонд на кубок (сумма зависит от занятого места)',
        ],
      },
    ],
  },
  {
    title: 'Финальные условия и завершение ивента',
    content: [
      {
        title: 'Завершение ивента',
        content: ['Ивент продолжается до 25 декабря 2024 года'],
      },
      {
        title: 'Определение победителя при отсутствии финишера',
        content: [
          'Если никто не дошёл до финиша, победитель определяется по формуле: (пройденные игры) x (этаж) - (количество дропов)',
        ],
      },
    ],
  },
]

export default function PlayerRules() {
  return (
    <Box>
      {playerRules.map((rule, index) => (
        <Box marginTop={'25px'}>
          <Box>
            <Accordion
              disableGutters
              elevation={0}
              sx={{
                borderRadius: '15px',
                background: Color.greyDark,
                boxShadow: 'none',
              }}
              square={true}
            >
              <AccordionSummary
                sx={{
                  background: Color.greyDark,
                  borderRadius: '15px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                }}
              >
                <Typography fontSize={'24px'} fontWeight={600} lineHeight={1.2}>
                  {rule.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: Color.greyDark,
                  borderRadius: '15px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: 0,
                }}
              >
                <Typography fontWeight={400} fontSize={'16px'}>
                  {rule.content.map((content, index) => (
                    <Box marginLeft={2} marginBottom={2}>
                      {content.title}
                      {':'}
                      <Box marginTop={1} />
                      <ul>
                        {content.content.map((text, index) => (
                          <li>{text}</li>
                        ))}
                      </ul>
                    </Box>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
