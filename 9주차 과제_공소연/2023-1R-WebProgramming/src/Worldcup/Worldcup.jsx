import { useEffect, useState } from "react";
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
  ImgTypoLeft,
  ImgTypoRight,
  Root,
  Title,
  VSTypo,
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

function Worldcup() {
  // candidate.sort(() => Math.random() - 0.5);

  const [game, setGame] = useState(
    candidate
      .map((c) => {
        return { name: c.name, src: c.src, order: Math.random() };
      })
      .sort((l, r) => {
        return l.order - r.order;
      })
  );
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]); // 다음 라운드에 진출한 동물들
  const [showContent, setShowContent] = useState(false);

  const handleRound = (r) => {
    setShowContent(true);

    setTimeout(() => {
      setShowContent(false);
    }, 1000);
    setNextGame((prev) => prev.concat(game[r]));
    setRound((prev) => prev + 1);
  };

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);
  // console.log(candidate);

  if (round + 1 > game.length / 2) {
    if (game.length === 1) {
      return (
        <Root>
          <Title>우승</Title>
          <ImgContainer>
            <Img src={game[0].src} width="500px" />
            <ImgTypoLeft>{game[0].name}</ImgTypoLeft>
          </ImgContainer>
        </Root>
      );
    } else
      <Root>
        <Title>로딩중...</Title>
      </Root>;
  }
  /* 텍스트 쉐도우 표현, vs 표현, 타이틀은 이미지와 겹치게 opacity 부여해서, 선택하면 바로 넘어가는게 아니라
  애니메이션이 포함돼서 선택한게 무엇인지 보여주게 끔 */

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
            <ImgTypoLeft>{nextGame[nextGame.length - 1]?.name}</ImgTypoLeft>
          </ImgContainer>
        ) : (
          <>
            <ImgContainer onClick={() => handleRound(round * 2)}>
              <Img src={game[round * 2]?.src} />
              <ImgTypoLeft>{game[round * 2]?.name}</ImgTypoLeft>
            </ImgContainer>
            <ImgContainer onClick={() => handleRound(round * 2 + 1)}>
              <Img src={game[round * 2 + 1]?.src} />
              <ImgTypoRight>{game[round * 2 + 1]?.name}</ImgTypoRight>
            </ImgContainer>
            <VSTypo>VS</VSTypo>
          </>
        )}
      </ImgRoot>
    </Root>
  );
}

export default Worldcup;
