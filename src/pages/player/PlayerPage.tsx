import { Box, Grid } from "@mui/material";
import { players } from "pages/players/types";
import { sample } from "lodash";
import { Link, useParams } from "react-router-dom";
import { GameRecord } from "./types";
import { useState } from "react";

type Props = {};

export default function PlayerPage(props: Props) {
  const { id } = useParams();

  const itemsAmount = 10;
  const [gameData, setGameData] = useState<GameRecord[]>(() => {
    const dates = generateDateRange(new Date("2024-11-01"), new Date("2024-12-01"));
    const data: GameRecord[] = [];
    let currentPosition = 0;
    for (let i = 0; i < itemsAmount; i++) {
      const status: GameRecord["status"] = sample(["drop", "completed"]);
      const diceRoll = sample([1, 2, 3, 4, 5, 6]);
      if (status === "drop") {
        currentPosition -= diceRoll;
        if (currentPosition < 0) {
          currentPosition = 0;
        }
      } else {
        currentPosition += diceRoll;
      }

      data.push({
        startDate: dates[i].toDateString(),
        endDate: dates[i].toDateString(),
        turn: i + 1,
        game: sample(["Готика", "Соник", "Ведьмак", "Смута"]),
        status,
        diceRoll,
        nextPosition: currentPosition,
        review: sample(["норм", "топ", "агуша", "кал"]),
        vodLink: "link",
      });
    }
    return data;
  });

  const player = players.find((player) => player.id === id);
  if (!player) {
    return <h1>Игрок не найден</h1>;
  }

  return (
    <Box>
      <h1>Страница участника {player.name}</h1>
      <Link to={player.streamLink}>{player.streamLink}</Link>

      <Box marginTop={2} />
      <Grid container>
        <Grid container columns={8}>
          {" "}
          <Grid item xs={1}>
            Дата
          </Grid>
          <Grid item xs={1}>
            Ход
          </Grid>
          <Grid item xs={1}>
            Игра
          </Grid>
          <Grid item xs={1}>
            Результат
          </Grid>
          <Grid item xs={1}>
            Ролл кубика
          </Grid>
          <Grid item xs={1}>
            Новая позиция
          </Grid>
          <Grid item xs={1}>
            Отзыв
          </Grid>
          <Grid item xs={1}>
            Ссылка на вод
          </Grid>
        </Grid>
        {gameData.map((game) => (
          <Grid container columns={8} paddingTop={1} borderTop={1}>
            <Grid item xs={1}>
              {game.startDate}
            </Grid>
            <Grid item xs={1}>
              {game.turn}
            </Grid>
            <Grid item xs={1}>
              {game.game}
            </Grid>
            <Grid item xs={1}>
              {game.status}
            </Grid>
            <Grid item xs={1}>
              {game.status === "drop" ? -game.diceRoll : game.diceRoll}
            </Grid>
            <Grid item xs={1}>
              {game.nextPosition}
            </Grid>
            <Grid item xs={1}>
              {game.review}
            </Grid>
            <Grid item xs={1}>
              <Link to={game.vodLink}>{game.vodLink}</Link>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function generateDateRange(startDate: Date, endDate: Date) {
  // Create an array to store the dates
  const dateArray = [];

  // Create a new Date object for the start date to avoid modifying the original startDate
  let currentDate = new Date(startDate);

  // Loop until the current date is greater than the end date
  while (currentDate <= endDate) {
    // Add the current date to the array
    dateArray.push(new Date(currentDate));

    // Increment the current date by one day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Return the array of dates
  return dateArray;
}
