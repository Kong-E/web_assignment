import { atom } from "recoil";

export const gameAtom = atom({
  key: "gameAtom",
  default: [],
});

export const roundAtom = atom({
  key: "roundAtom",
  default: 0,
});

export const nextGameAtom = atom({
  key: "nextGameAtom",
  default: [],
});

export const showContentAtom = atom({
  key: "showContentAtom",
  default: false,
});

export const assetsLoadedAtom = atom({
  key: "assetsLoadedAtom",
  default: false,
});

export const statAtom = atom({
  key: "statAtom",
  default: {
    개: 0,
    고슴도치: 0,
    고양이: 0,
    기린: 0,
    꿀꿀이: 0,
    바다표범: 0,
    부엉이: 0,
    "주둥이가 큰 새": 0,
    앵무새: 0,
    원숭이: 0,
    쥐: 0,
    토끼: 0,
    판다: 0,
    하마: 0,
    하프물범: 0,
    호랑이: 0,
  },
});
