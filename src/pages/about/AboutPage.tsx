import { Box, Link, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Box margin={2}>
      <Typography variant="h3">О Сайте</Typography>
      <Typography variant="body1">Сайт создан энтузиастами для улучшения ивента Аукус.</Typography>
      <Typography variant="h4" marginTop={4}>
        Все кто хочет присоединиться к разработке заходите в дискорд:{" "}
        <Link href="https://discord.gg/SHsyYTjNb5">https://discord.gg/SHsyYTjNb5</Link>
      </Typography>
      <Typography>
        <h3>Кто нужен</h3>
        <ul>
          <li>Мемолог для наполнения ивента мемами</li>
          <li>Спец по правилам аукуса для тестировани и консультации</li>
          <li>Кто шарит за настройку домена и хостинга</li>
          <li>Дизайнер</li>
          <li>Бекендер (python?)</li>
          <li>Фронтендер (react)</li>
        </ul>
        <h3>План создания сайта Аукуса</h3>
        <ul>
          <li>Зарегистрировать домен</li>
          <li>Найти хостинг</li>
          <li>
            Сделать простой бекенд
            <ul>
              <li>REST API</li>
              <li>Логин для участников</li>
              <li>База данных</li>
            </ul>
          </li>
          <li>Сделать дизайн сайта</li>
          <li>
            Допиливать фичи фронтенда
            <ul>
              <li>Бросок кубика</li>
              <li>Перемещение по карте</li>
              <li>Горки и лестницы</li>
            </ul>
          </li>
        </ul>
      </Typography>
    </Box>
  );
}
