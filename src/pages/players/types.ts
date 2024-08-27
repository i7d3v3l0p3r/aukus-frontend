import { range, sample } from "lodash";

export type Player = {
  id: string;
  name: string;
  streamLink: string;
  mapPosition: number;
  color: string;
  currentGame?: string;
};

export const playerLasqa: Player = {
  id: "lasqa",
  name: "Lasqa",
  streamLink: "https://live.vkplay.ru/lasqa",
  mapPosition: sample(range(1, 99)) as number,
  color: "red",
  currentGame: "Балдурс Гейт 3",
};

export const playerSegall: Player = {
  id: "segall",
  name: "Segall",
  streamLink: "https://www.twitch.tv/segall",
  mapPosition: sample(range(1, 99)) as number,
  color: "blue",
  currentGame: "Соник",
};

export const playerRoadhouse: Player = {
  id: "roadhouse",
  name: "Roadhouse",
  streamLink: "https://www.twitch.tv/roadhouse",
  mapPosition: sample(range(1, 99)) as number,
  color: "green",
  currentGame: "Готика",
};

export const players = [playerLasqa, playerSegall, playerRoadhouse].sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  } else {
    return -1;
  }
});
