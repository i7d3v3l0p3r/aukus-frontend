import { Box, Typography } from "@mui/material";

export default function PlanPage() {
  return (
    <Box marginLeft={2}>
      <Typography>
        <h3>План для создания сайта Аукуса</h3>
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
        <h3>Кто нужен</h3>
        <ul>
          <li>Кто шарит за настройку домена и хостинга</li>
          <li>Дизайнер</li>
          <li>Бекендер (python?)</li>
          <li>Фронтендер (react)</li>
        </ul>
      </Typography>
    </Box>
  );
}
