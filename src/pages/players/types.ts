import { range, sample } from "lodash";

export type Player = {
  id: string;
  name: string;
  streamLink: string;
  mapPosition: number;
  color: string;
  currentGame?: string;
  isOnline?: boolean;
};

export const playerLasqa: Player = {
  id: "lasqa",
  name: "Lasqa",
  streamLink: "https://live.vkplay.ru/lasqa",
  mapPosition: 0,
  color: "#283593",
  currentGame: "Балдурс Гейт 3",
  isOnline: false,
};

export const playerSegall: Player = {
  id: "segall",
  name: "Segall",
  streamLink: "https://www.twitch.tv/segall",
  mapPosition: sample(range(1, 99)) as number,
  color: "blue",
  currentGame: "Соник",
  isOnline: true,
};

export const playerRoadhouse: Player = {
  id: "roadhouse",
  name: "Roadhouse",
  streamLink: "https://www.twitch.tv/roadhouse",
  mapPosition: sample(range(1, 99)) as number,
  color: "#455A64",
  currentGame: "Готика",
  isOnline: true,
};

export const players = [playerLasqa, playerSegall, playerRoadhouse].sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  } else {
    return -1;
  }
});
