export type PreviousGame = {
  game_title: string
  rating: string
  review: string
  dropped: boolean
}

const SegallGamesAukus1: PreviousGame[] = [
  {
    game_title: 'Bomjman',
    rating: '8/10',
    review: 'отличная игра, жаль, что второй части скорее всего не будет',
    dropped: false,
  },
  {
    game_title: "Marvel's Guardian Of Galaxy",
    rating: '7.5/10',
    review:
      'выдроченная игра и незаслуженно обосраная, даже как не самый большой фанат (немного хуйтер) комиксов могу сказать, что это топ',
    dropped: false,
  },
  {
    game_title: 'SOMA',
    rating: '5/10',
    review: 'геймплей хуйня полная, но концовка топ',
    dropped: false,
  },
  {
    game_title: 'Star Wars: Fallen Order',
    rating: '6.5/10',
    review:
      'слишком дохуя пытались засунуть в игру, но в целом нигде до идеала так и не довели',
    dropped: false,
  },
  {
    game_title: 'Call Of Duty 2',
    rating: '9/10',
    review: 'ласт глава подзаебала, иначе было бы 10',
    dropped: false,
  },
  {
    game_title: 'Барби: Приключения на Ранчо',
    rating: '10 счастливых билетов из 10',
    review: '',
    dropped: false,
  },
  {
    game_title: 'Cyberpunk 2077',
    rating: '8.5/10',
    review: 'отличная игра, но концовка (моя) не зашла',
    dropped: false,
  },
  {
    game_title: 'NIER: AUTOMATA',
    rating: '4/10',
    review: 'хуйня полная, но жопа ту би это что-то с чем-то',
    dropped: false,
  },
  {
    game_title: 'Serious sam 4',
    rating: '0/10',
    review: 'худшая игра в истории',
    dropped: false,
  },
  {
    game_title: 'Serious sam: Siberian Mayhem',
    rating: '8/10',
    review: 'НАШИ исправили всю кривоту и уебищность предыдущей части, малаца!',
    dropped: false,
  },
  {
    game_title: 'Death Stranding',
    rating: '',
    review: 'гениально, но долго',
    dropped: true,
  },
  {
    game_title: 'COD:MW2',
    rating: '9/10',
    review: 'классика',
    dropped: false,
  },
  {
    game_title: 'Factorio',
    rating: '',
    review: 'игра кайф полный, но разбираться долго',
    dropped: true,
  },
  {
    game_title: 'Ride To Hell: Retribution',
    rating: '1/10',
    review: 'за мемность',
    dropped: false,
  },
  {
    game_title: 'U.F.O.S',
    rating: '6/10',
    review: 'не очень напряжный квест',
    dropped: false,
  },
  {
    game_title: 'Medal Of Honor: Pacific Assault',
    rating: '-5000000/10',
    review: 'уебищная мокрота дохлой мокрицы',
    dropped: false,
  },
  {
    game_title: 'Serious Sam First Encounter HD',
    rating: '7/10',
    review:
      'кайфовый шутан, который лучше проходить за неск дней с кайфом, если разом рашить быстро заебет',
    dropped: false,
  },
  {
    game_title: 'Serious Sam 2',
    rating: 'дерьмище каких поискать/10',
    review: '',
    dropped: false,
  },
  {
    game_title: 'Fifa 19',
    rating: '7/10',
    review: 'норм фифка',
    dropped: false,
  },
  {
    game_title: 'Serious Sam DD XXL',
    rating: '5/10',
    review: 'легкий платформер для ценителей Сэмов',
    dropped: false,
  },
  {
    game_title: 'Space Chanel 5 Part 2',
    rating: '4/10',
    review: 'ебанутая ритм игра, к счастью проходима',
    dropped: false,
  },
  {
    game_title: 'One Hand Clapping',
    rating: '10/10',
    review:
      'оригинальная игра в которой нужно петь, чтобы продвигаться по сюжету',
    dropped: false,
  },
  {
    game_title: 'Worms Armageddon',
    rating: '',
    review: 'pft,fkj xtn',
    dropped: true,
  },
  {
    game_title: 'HADES',
    rating: '7/10',
    review:
      'норм игра (но проходить нужно на трезвяк и без тильта, иначе она не пройдется никогда)',
    dropped: false,
  },
  {
    game_title: 'Before Your Eyes',
    rating: '6/10',
    review: 'Грустнявое коротенькое кинцо',
    dropped: false,
  },
  {
    game_title: 'Warlords BattleCry 3',
    rating: '',
    review: 'стратежка жестковатая, к тому же без руссика',
    dropped: true,
  },
  {
    game_title: 'Final Fanstasy 7 remake',
    rating: '4/10',
    review: 'Прикольное кинцо, но настолько отвратный геймплей, что всего лишь',
    dropped: false,
  },
  {
    game_title: 'Max payne 3',
    rating: '8.5/10',
    review: 'Классика жанра, один из лучших шутанов от 3-го лица',
    dropped: false,
  },
  {
    game_title: 'Serious Sam 3',
    rating: '4/10',
    review: 'Проходится побыстрее 4-й и 2-й части - это большой плюс',
    dropped: false,
  },
  {
    game_title: 'Serious Sam Second Encounter',
    rating: '7/10',
    review: 'хорошая часть, топ3 из всех частей',
    dropped: false,
  },
  {
    game_title: 'Mafia Definitive Edition',
    rating: '8/10',
    review: 'годный ремейк неповторимой классики',
    dropped: false,
  },
  {
    game_title: 'oni!',
    rating: '1/10',
    review:
      'полнейшая хуета: завышенная сложность, кривое управление, уебищная стрельба, однобразный геймплей(постоянно надо активировать ебаные рубильники) НО за боевку + бальчик 1/10',
    dropped: true,
  },
  {
    game_title: 'Neon White',
    rating: '7/10',
    review:
      'прикольная игра в стиле сёрф серверов в ксе, с угарным музоном и стилем, под конец душновато, но терпимо',
    dropped: false,
  },
  {
    game_title: 'Painkiller: Hell & Damnation',
    rating: '8/10',
    review:
      'Офигенный шутан, который незаслуженно засрали. На голову выше всех сэмов кроме 5-го, в игре есть: обалденная физика, хорошая графика, клевый сеттинг. Что ещё надо???',
    dropped: false,
  },
  {
    game_title: 'Mafa 2 (classic)',
    rating: '9.5/10',
    review: 'классика',
    dropped: false,
  },
  {
    game_title: 'Как достать соседа',
    rating: '8/10',
    review: 'игра для ума',
    dropped: false,
  },
  {
    game_title: 'Как достать соседа 2',
    rating: '8/10',
    review: 'хорошее продолжение 1-й части',
    dropped: false,
  },
  {
    game_title: 'neverwiner dlc hz',
    rating: '',
    review: 'сложна и долго',
    dropped: true,
  },
  {
    game_title: 'chaser',
    rating: '2/10',
    review:
      'заеба грешная, прикольноe земедло в игре + угарные диалоги - это всё хорошее, что есть в игре, остальное полный кал',
    dropped: false,
  },
  {
    game_title: 'Flatout 2',
    rating: '',
    review: 'to be continued...',
    dropped: false,
  },
]

const LasqaGamesAukus1: PreviousGame[] = [
  {
    game_title: 'NIOH',
    rating: '',
    review: 'Прикольная тематика, но слишком долгая',
    dropped: true,
  },
  {
    game_title: 'Axiom Verge',
    rating: '6.5/10',
    review: 'Метроидвания душненькая, я русский',
    dropped: false,
  },
  {
    game_title: 'Hollow Knight',
    rating: '10/10',
    review: 'Просто топ, одна из лучших игр',
    dropped: false,
  },
  {
    game_title: 'Postal 2',
    rating: '8/10',
    review: 'Культовая тематика',
    dropped: false,
  },
  {
    game_title: 'Star Wars: BattleFront 2 (2005)',
    rating: '8.5/10',
    review: 'Каеф, игра детства',
    dropped: false,
  },
  {
    game_title: 'Hitman 1 (2016)',
    rating: '9/10',
    review:
      'Новые хитманы являются потрясающими. Множество способов прохождения, балдёж',
    dropped: false,
  },
  {
    game_title: 'Dishonored',
    rating: '8/10',
    review: 'Прикольная игрушечка, желательно проходить по стелсу как нормикс',
    dropped: false,
  },
  {
    game_title: 'The Beast Inside',
    rating: '7/10',
    review:
      'Обьективно неплохой хоррор (7/10), но я такое не люблю — всё засрано головоломками и скримерами (2/10)',
    dropped: false,
  },
  {
    game_title: 'Superliminal',
    rating: '8.5/10',
    review:
      'Не слишком сложная головоломка, прикольная игруха вообще, разработчики молодцы',
    dropped: false,
  },
  {
    game_title: 'DreadOut',
    rating: '3/10',
    review: 'Кривозадый хоррор',
    dropped: false,
  },
  {
    game_title: 'Death Stranding',
    rating: '9.5/10',
    review: 'Кайф, понравилось. Каджимбо выморозился по полной программе',
    dropped: false,
  },
  {
    game_title: 'Metal Gear Solid V: The Phantom Pain',
    rating: '',
    review:
      'Наверняка великая игра, жаль что не могу себе позволить её сейчас проходить из-за долговизны',
    dropped: true,
  },
  {
    game_title: 'World in Conflict: Complete Edition',
    rating: '7.5/10',
    review: 'Клёвая стратежка',
    dropped: false,
  },
  {
    game_title: 'F.E.A.R.',
    rating: '8/10',
    review: 'Один из лучших шутеров всех времён',
    dropped: false,
  },
  {
    game_title: 'Cry of Fear',
    rating: '8/10 как хоррор, 4/10 моя оценка',
    review:
      'Прикольный фришный хоррор с интересными моментиками и порой душноватый',
    dropped: false,
  },
  {
    game_title: "Ninja Gaiden 3: Razor's Edge",
    rating: '7.5/10',
    review:
      'Всем хардкорным любителям Дарк Соулса рекомендуется пройти на харде. Очень сложно и долго было. Если бы я хотел долгой игры, было бы 9.5/10',
    dropped: false,
  },
  {
    game_title: 'The Talos Principle',
    rating: '',
    review: 'Долго, сложно, прикольно, дроп',
    dropped: true,
  },
  {
    game_title: 'Grand Theft Auto 4',
    rating: '9/10',
    review: 'Годнота, одна из любимых частей',
    dropped: false,
  },
  {
    game_title: 'Grand Theft Auto 3',
    rating: '9/10',
    review: 'Классика, играется весело',
    dropped: false,
  },
  {
    game_title: 'Call of Duty 2',
    rating: '9/10',
    review: 'Очередная классика на Аукусе',
    dropped: false,
  },
  {
    game_title: 'Elasto Mania Remastered',
    rating: '',
    review:
      'Прикольная игруха в стиле Gravity Defied со времён школотрона. Но очень задротская и сложная, так что дроп',
    dropped: true,
  },
  {
    game_title: 'My Friend Pedro',
    rating: '7/10',
    review: 'Неплохая недолгая игруха от разрабов Хотлайн Майами',
    dropped: false,
  },
  {
    game_title: 'Katana Zero',
    rating: '8/10',
    review: 'Игруха в стиле Хотлайн Майами, получше Педро',
    dropped: false,
  },
  {
    game_title: 'Battlefield 3',
    rating: '8.5/10',
    review: 'Неплохая кампаха, взрывы сочные',
    dropped: false,
  },
  {
    game_title: 'The Lord of the Rings: The Battle for Middle-Earth II',
    rating: '9/10',
    review: 'Любимая игруха детства, но компания больше нравится в 1-й части',
    dropped: false,
  },
  {
    game_title: 'Chrono Trigger',
    rating: '',
    review:
      'Прикольная темка, вроде как культовая ЖРПГ, но на неё у нас сейчас времени нет',
    dropped: true,
  },
  {
    game_title: 'Factorio',
    rating: '',
    review: 'Чрезвычайно долгая годнота',
    dropped: true,
  },
  {
    game_title: 'NASCAR Racing 2003 Season',
    rating: '',
    review: 'Надо было попасть на лесенку',
    dropped: true,
  },
  {
    game_title: 'Sekiro: Shadows Die Twice',
    rating: '',
    review:
      'Очень крутая, но чрезвычайно долгая для меня игра. Как-нить потом пройдем',
    dropped: true,
  },
  {
    game_title: 'Minecraft',
    rating: '',
    review: 'Майкрафт хорош',
    dropped: false,
  },
  {
    game_title: 'Zanzarah: The Hidden Portal',
    rating: '8/10',
    review: 'Заебатая тема',
    dropped: false,
  },
  {
    game_title: 'Touhou 6',
    rating: '',
    review:
      'Задорный скролл-шутер, прошёл бы его часов за 15-20, но сегодня у нас такого времени нет, к сожалению',
    dropped: true,
  },
  {
    game_title: 'Max Payne 1',
    rating: '9/10',
    review: 'Культовая тематика',
    dropped: false,
  },
  {
    game_title: 'Dead Space 1',
    rating: '',
    review: 'Охуенная игра, дропнули чтобы попыпаться выловить коротуху',
    dropped: true,
  },
  {
    game_title: 'The Plan',
    rating: '',
    review: 'Игра про муху на 5 минут',
    dropped: false,
  },
  {
    game_title: 'Meteor 60 Seconds!',
    rating: '',
    review: 'Великая игра, тоже на 5 минут',
    dropped: false,
  },
  {
    game_title: 'Oni',
    rating: '',
    review:
      'Старый слешер про анимешную тяночку, выглядел годно, но надо было дропать в последний день',
    dropped: true,
  },
  {
    game_title: 'Need For Speed: Most Wanted',
    rating: '',
    review: '',
    dropped: true,
  },
]

type GamesItem = {
  games: PreviousGame[]
  link: string
}

export const aukus1Games: { [key: string]: GamesItem } = {
  segall: {
    games: SegallGamesAukus1,
    link: 'https://docs.google.com/spreadsheets/d/1iGjS41dpxbgjtMTGODZ-j3OG9eMDaZh5kBRiWH-FPk0/edit?gid=1969770239#gid=1969770239',
  },
  lasqa: {
    games: LasqaGamesAukus1,
    link: 'https://docs.google.com/spreadsheets/d/1iGjS41dpxbgjtMTGODZ-j3OG9eMDaZh5kBRiWH-FPk0/edit?gid=1235582040#gid=1235582040',
  },
}

export const aukus2Games: { [key: string]: GamesItem } = {}
