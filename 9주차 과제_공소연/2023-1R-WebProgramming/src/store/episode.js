// html문법을 포함하지 않기 때문에 js로 함
import { atom } from "recoil";

export const EpisodeState = atom({
  key: "epi",
  default: 0,
});
