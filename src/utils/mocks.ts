import { range, sample } from "lodash";
import { Player } from "./types";

export const playerLasqa: Player = {
  id: "lasqa",
  name: "Lasqa",
  stream_link: "https://live.vkplay.ru/lasqa",
  map_position: 0,
  current_game: "Балдурс Гейт 3",
  is_online: false,
  url_handle: "lasqa",
};

export const playerSegall: Player = {
  id: "segall",
  name: "Segall",
  stream_link: "https://www.twitch.tv/segall",
  map_position: sample(range(1, 99)) as number,
  current_game: "Соник",
  is_online: true,
  url_handle: "segall",
};

export const playerRoadhouse: Player = {
  id: "roadhouse",
  name: "Roadhouse",
  stream_link: "https://www.twitch.tv/roadhouse",
  map_position: sample(range(1, 99)) as number,
  current_game: "Готика",
  is_online: true,
  url_handle: "roadhouse",
};

export const players = [playerLasqa, playerSegall, playerRoadhouse].sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  } else {
    return -1;
  }
});
