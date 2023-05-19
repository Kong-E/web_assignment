import { useLayoutEffect, useEffect, useState } from "react";
import p1 from "../assets/개.jpg";
import p2 from "../assets/고슴도치.jpg";
import p3 from "../assets/고양이.jpg";
import p4 from "../assets/기린.jpg";
import p5 from "../assets/꿀꿀이.jpg";
import p6 from "../assets/바다표범.jpg";
import p7 from "../assets/부엉이.jpg";
import p8 from "../assets/새1.jpg";
import p9 from "../assets/새2.jpg";
import p10 from "../assets/원숭이.jpg";
import p11 from "../assets/쥐.jpg";
import p12 from "../assets/토끼.jpg";
import p13 from "../assets/판다.jpg";
import p14 from "../assets/하마.jpg";
import p15 from "../assets/하프물범.jpg";
import p16 from "../assets/호랑이.jpg";
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

function preloadImage(obj) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve({ ...obj, img });
    };
    img.onerror = img.onabort = function () {
      reject(obj.src);
    };
    img.src = obj.src;
  });
}

function Worldcup() {
  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [stat, setStat] = useState({
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
  });

  useEffect(() => {
    const 월드컵LocalStorageData = localStorage.getItem("월드컵");
    월드컵LocalStorageData && setStat(JSON.parse(월드컵LocalStorageData));

    let isCancelled = false;

    async function effect() {
      if (isCancelled) {
        return;
      }

      const imagesPromiseList = candidate.map((obj) => preloadImage(obj));

      console.log(imagesPromiseList);
      try {
        const loadedImages = await Promise.all(imagesPromiseList);
        if (isCancelled) {
          return;
        }
        console.log(loadedImages);

        const shuffledGame = loadedImages
          .sort(() => Math.random() - 0.5)
          .map((c) => ({ name: c.name, src: c.img.src }));

        setGame(shuffledGame);
        setAssetsLoaded(true);
      } catch (error) {
        console.error("Failed to load images:", error);
      }
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleRound = (r) => {
    setShowContent(true);

    setTimeout(() => {
      setShowContent(false);
      setRound((prev) => prev + 1);
    }, 3000);

    setNextGame((prev) => prev.concat(game[r]));
  };

  useLayoutEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);
  // console.log(candidate);

  // 11주차 실습
  const left = round * 2;
  const right = round * 2 + 1;

  const leftFunction = () => {
    setStat({ ...stat, [game[left].name]: stat[game[left].name] + 1 });
  };

  const rightFunction = () => {
    setStat({ ...stat, [game[right].name]: stat[game[right].name] + 1 });
  };

  if (round + 1 > game.length / 2 || !assetsLoaded) {
    if (game.length !== 1)
      return (
        <Root>
          <Title>로딩중...</Title>
        </Root>
      );
  }

  if (game.length === 1) {
    localStorage.setItem("월드컵", JSON.stringify(stat));
    return (
      <Root>
        <WinnerTitle>우승</WinnerTitle>
        <ImgContainer>
          <Img src={game[0].src} width="500px" />
          <LeftImgTypo>{game[0].name}</LeftImgTypo>
          <RightImgTypo>{stat[game[0].name]}번 승리</RightImgTypo>
          <table>
            {Object.keys(stat).map((name) => {
              return (
                <tr key={name}>
                  <td>{name}</td>
                  {stat[name]}
                </tr>
              );
            })}
          </table>
        </ImgContainer>
      </Root>
    );
  }

  // 승리횟수를 막대기로 표기하기

  return (
    <Root>
      <Title>
        귀여운 동물 월드컵 {round + 1} / {game.length / 2}{" "}
        <b>&lt;{game.length === 2 ? "결승" : game.length + "강"}&gt;</b>
      </Title>
      <ImgRoot>
        {showContent && nextGame.length != 0 ? (
          <ImgContainer>
            <Img src={nextGame[nextGame.length - 1]?.src} />
            <LeftImgTypo>{nextGame[nextGame.length - 1]?.name}</LeftImgTypo>
          </ImgContainer>
        ) : (
          <>
            <ImgContainer
              onClick={() => {
                leftFunction();
                handleRound(round * 2);
              }}
            >
              <Img src={game[round * 2]?.src} />
              <LeftImgTypo>{game[round * 2]?.name}</LeftImgTypo>
            </ImgContainer>
            <ImgContainer
              onClick={() => {
                rightFunction();
                handleRound(round * 2 + 1);
              }}
            >
              <Img src={game[round * 2 + 1]?.src} />
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
