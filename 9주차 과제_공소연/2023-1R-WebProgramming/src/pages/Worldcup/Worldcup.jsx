import { useEffect } from "react";
import { useRecoilState } from "recoil";
import p1 from "../../assets/개.jpg";
import p2 from "../../assets/고슴도치.jpg";
import p3 from "../../assets/고양이.jpg";
import p4 from "../../assets/기린.jpg";
import p5 from "../../assets/꿀꿀이.jpg";
import p6 from "../../assets/바다표범.jpg";
import p7 from "../../assets/부엉이.jpg";
import p8 from "../../assets/새1.jpg";
import p9 from "../../assets/새2.jpg";
import p10 from "../../assets/원숭이.jpg";
import p11 from "../../assets/쥐.jpg";
import p12 from "../../assets/토끼.jpg";
import p13 from "../../assets/판다.jpg";
import p14 from "../../assets/하마.jpg";
import p15 from "../../assets/하프물범.jpg";
import p16 from "../../assets/호랑이.jpg";
import {
  Img,
  ImgContainer,
  ImgRoot,
  LeftImgTypo,
  RightImgTypo,
  Root,
  Title,
  VSTypo,
  WinnerTitle,
} from "./styles.js";
import { preloadImage } from "../../utils/preloadImage";
import {
  assetsLoadedAtom,
  gameAtom,
  nextGameAtom,
  roundAtom,
  showContentAtom,
  statAtom,
} from "../../store/atom";

const candidate = [
  { name: "개", src: p1 },
  { name: "고슴도치", src: p2 },
  { name: "고양이", src: p3 },
  { name: "기린", src: p4 },
  { name: "꿀꿀이", src: p5 },
  { name: "바다표범", src: p6 },
  { name: "부엉이", src: p7 },
  { name: "주둥이가 큰 새", src: p8 },
  { name: "앵무새", src: p9 },
  { name: "원숭이", src: p10 },
  { name: "쥐", src: p11 },
  { name: "토끼", src: p12 },
  { name: "판다", src: p13 },
  { name: "하마", src: p14 },
  { name: "하프물범", src: p15 },
  { name: "호랑이", src: p16 },
];

/* const initialState = {
  game: [],
  round: 0,
  nextGame: [],
  showContent: false,
  assetsLoaded: false,
  stat: {
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
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GAME":
      return { ...state, game: action.payload };
    case "SET_ROUND":
      return { ...state, round: action.payload };
    case "SET_NEXT_GAME":
      return { ...state, nextGame: action.payload };
    case "SET_SHOW_CONTENT":
      return { ...state, showContent: action.payload };
    case "SET_ASSETS_LOADED":
      return { ...state, assetsLoaded: action.payload };
    case "SET_STAT":
      return { ...state, stat: action.payload };
    default:
      return state;
  }
}; */

function Worldcup() {
  const [game, setGame] = useRecoilState(gameAtom);
  const [round, setRound] = useRecoilState(roundAtom);
  const [nextGame, setNextGame] = useRecoilState(nextGameAtom);
  const [showContent, setShowContent] = useRecoilState(showContentAtom);
  const [assetsLoaded, setAssetsLoaded] = useRecoilState(assetsLoadedAtom);
  const [stat, setStat] = useRecoilState(statAtom);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const loadedImages = await Promise.all(
          candidate.map((obj) => preloadImage(obj))
        );

        console.log(loadedImages);

        const shuffledGame = loadedImages
          .sort(() => Math.random() - 0.5)
          .map((c) => ({ name: c.name, src: c.img.src }));

        console.log(shuffledGame);

        setGame(shuffledGame);
        setAssetsLoaded(true);
      } catch (error) {
        console.error("Failed to load images:", error);
      }
    };

    loadImage();
  }, []);

  const handleRound = (r) => {
    setShowContent(true);
    setNextGame([...nextGame, game[r]]);

    const updatedStat = { ...stat, [game[r].name]: stat[game[r].name] + 1 };
    setStat(updatedStat);

    setTimeout(() => {
      setShowContent(false);
      setRound(round + 1);
    }, 800);
  };

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round, game.length, nextGame]);

  if (round + 1 > game.length / 2 || !assetsLoaded) {
    if (game.length !== 1) {
      return (
        <Root>
          <Title>로딩중...</Title>
        </Root>
      );
    }
  }

  if (game.length === 1) {
    return (
      <Root>
        <WinnerTitle>{game[0].name} 우승!</WinnerTitle>
        <ImgContainer>
          <Img src={game[0].src} alt={game[0].name} />
          <LeftImgTypo>{game[0].name}</LeftImgTypo>
          <RightImgTypo>{stat[game[0].name]} wins</RightImgTypo>
          {/*           <table>
            {Object.keys(stat).map((name) => {
              return (
                <tr key={name}>
                  <td>{name}</td>
                  {stat[name]}
                </tr>
              );
            })}
          </table> */}
        </ImgContainer>
      </Root>
    );
  }

  return (
    <Root>
      <Title>
        🐶🐺🐱🐷🐭🐰🐼🐸🐯 {round + 1} / {game.length / 2}{" "}
        <b>&lt;{game.length === 2 ? "결승" : `${game.length}강`}&gt;</b>
      </Title>
      <ImgRoot>
        {showContent ? (
          <ImgContainer>
            <Img
              src={nextGame[nextGame.length - 1]?.src}
              alt={nextGame[nextGame.length - 1]?.name}
            />
            <LeftImgTypo>{nextGame[nextGame.length - 1]?.name}</LeftImgTypo>
          </ImgContainer>
        ) : (
          <>
            <ImgContainer onClick={() => handleRound(round * 2)}>
              <Img src={game[round * 2]?.src} alt={game[round * 2]?.name} />
              <LeftImgTypo>{game[round * 2]?.name}</LeftImgTypo>
            </ImgContainer>
            <ImgContainer onClick={() => handleRound(round * 2 + 1)}>
              <Img
                src={game[round * 2 + 1]?.src}
                alt={game[round * 2 + 1]?.name}
              />
              <RightImgTypo>{game[round * 2 + 1]?.name}</RightImgTypo>
            </ImgContainer>
            <VSTypo>VS</VSTypo>
          </>
        )}
      </ImgRoot>
    </Root>
  );
}

export default Worldcup;
