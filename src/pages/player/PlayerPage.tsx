import { Box, Grid } from "@mui/material";
import { players } from "utils/mocks";
import { sample } from "lodash";
import { Link, useParams } from "react-router-dom";
import { PlayerMove } from "utils/types";
import { useState } from "react";

type Props = {};

export default function PlayerPage(props: Props) {
  const { id } = useParams();

  const itemsAmount = 10;
  const [playerMoves, setPlayerMoves] = useState<PlayerMove[]>(() => {
    const dates = generateDateRange(new Date("2024-11-01"), new Date("2024-12-01"));
    const data: PlayerMove[] = [];
    let currentPosition = 0;
    for (let i = 0; i < itemsAmount; i++) {
      const status: PlayerMove["type"] = sample(["drop", "completed"]);
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
        created_at: dates[i].toDateString(),
        id: i + 1,
        item_title: sample(["Готика", "Соник", "Ведьмак", "Смута"]),
        type: status,
        dice_roll: diceRoll,
        cell_to: currentPosition,
        cell_from: currentPosition - diceRoll,
        item_review: sample(["норм", "топ", "ахуенно", "лучшая игра"]),
        item_rating: sample([1, 2, 3, 4, 5]),
        stair_from: null,
        stair_to: null,
        snake_from: null,
        snake_to: null,
        item_length: "medium",
      });
    }
    return data;
  });

  const player = players.find((player) => player.id === id);
  if (!player) {
    return <h1>Игрок не найден</h1>;
  }

  return (
    <Box marginLeft={2}>
      <h1>Страница участника {player.name}</h1>
      <Link to={player.stream_link}>{player.stream_link}</Link>

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
        {playerMoves.map((move) => (
          <Grid container columns={8} paddingTop={1} borderTop={1}>
            <Grid item xs={1}>
              {move.created_at}
            </Grid>
            <Grid item xs={1}>
              {move.id}
            </Grid>
            <Grid item xs={1}>
              {move.item_title}
            </Grid>
            <Grid item xs={1}>
              {move.type}
            </Grid>
            <Grid item xs={1}>
              {move.type === "drop" ? -move.dice_roll : move.dice_roll}
            </Grid>
            <Grid item xs={1}>
              {move.cell_to}
            </Grid>
            <Grid item xs={1}>
              {move.item_review}
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
