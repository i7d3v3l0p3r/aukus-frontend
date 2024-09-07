import { range, sample } from "lodash";
import { Player } from "./types";

const playerLasqa: Player = {
  id: 1,
  name: "Lasqa",
  stream_link: "https://live.vkplay.ru/lasqa",
  map_position: 0,
  current_game: "Балдурс Гейт 3",
  is_online: false,
  url_handle: "lasqa",
};

const playerSegall: Player = {
  id: 2,
  name: "Segall",
  stream_link: "https://www.twitch.tv/segall",
  map_position: sample(range(1, 99)) as number,
  current_game: "Соник",
  is_online: true,
  url_handle: "segall",
};

const playerRoadhouse: Player = {
  id: 3,
  name: "Roadhouse",
  stream_link: "https://www.twitch.tv/roadhouse",
  map_position: sample(range(1, 99)) as number,
  current_game: "Готика",
  is_online: true,
  url_handle: "roadhouse",
};

export const playersMock = [playerLasqa, playerSegall, playerRoadhouse].sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  } else {
    return -1;
  }
});
