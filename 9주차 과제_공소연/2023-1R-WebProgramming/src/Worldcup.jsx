import { useState, useEffect } from "react";
import p1 from "./assets/개.jpg";
import p2 from "./assets/고슴도치.jpg";
import p3 from "./assets/고양이.jpg";
import p4 from "./assets/기린.jpg";
import p5 from "./assets/꿀꿀이.jpg";
import p6 from "./assets/바다표범.jpg";
import p7 from "./assets/부엉이.jpg";
import p8 from "./assets/새1.jpg";
import p9 from "./assets/새2.jpg";
import p10 from "./assets/원숭이.jpg";
import p11 from "./assets/쥐.jpg";
import p12 from "./assets/토끼.jpg";
import p13 from "./assets/판다.jpg";
import p14 from "./assets/하마.jpg";
import p15 from "./assets/하프물범.jpg";
import p16 from "./assets/호랑이.jpg";

function Worldcup() {
  const candidate = [
    { name: "개", src: p1 },
    { name: "고슴도치", src: p2 },
    { name: "고양이", src: p3 },
    { name: "기린", src: p4 },
    { name: "꿀꿀이", src: p5 },
    { name: "바다표범", src: p6 },
    { name: "부엉이", src: p7 },
    { name: "새1", src: p8 },
    { name: "새2", src: p9 },
    { name: "원숭이", src: p10 },
    { name: "쥐", src: p11 },
    { name: "토끼", src: p12 },
    { name: "판다", src: p13 },
    { name: "하마", src: p14 },
    { name: "하프물범", src: p15 },
    { name: "호랑이", src: p16 },
  ];

  // candidate.sort(() => Math.random() - 0.5);

  const [game, setGame] = useState([]);
  const [round, setRound] = useState(0);
  const [nextGame, setNextGame] = useState([]); // 다음 라운드에 진출한 동물들

  useEffect(() => {
    setGame(
      candidate
        .map((c) => {
          return { name: c.name, src: c.src, order: Math.random() };
        })
        .sort((l, r) => {
          return l.order - r.order;
        })
    );
  }, []);

  useEffect(() => {
    if (game.length > 1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  }, [round]);
  console.log(candidate);

  if (game.length === 0 || round + 1 > game.length / 2) {
    return <h1>로딩중...</h1>;
  }

  if (game.length === 1) {
    return (
      <div>
        <h1>우승</h1>
        <img src={game[0].src} width="500px" />
        <p>{game[0].name}</p>
      </div>
    );
  }
  /* 텍스트 쉐도우 표현, vs 표현, 타이틀은 이미지와 겹치게 opacity 부여해서, 선택하면 바로 넘어가는게 아니라
  애니메이션이 포함돼서 선택한게 무엇인지 보여주게 끔 */

  return (
    <div>
      <h1>
        귀여운 동물 월드컵 {round + 1} / {game.length / 2}{" "}
        <b>{game.length === 2 ? "결승" : game.length + "강"}</b>
      </h1>
      <div>
        <img
          src={game[round * 2].src}
          width="600px"
          height="650px"
          style={{ objectFit: "cover", cursor: "pointer" }}
          onClick={() => {
            setNextGame((prev) => prev.concat(game[round * 2]));
            setRound((prev) => prev + 1);
          }}
        />
        <img
          src={game[round * 2 + 1].src}
          width="600px"
          height="650px"
          style={{ objectFit: "cover", cursor: "pointer" }}
          onClick={() => {
            setNextGame((prev) => prev.concat(game[round * 2 + 1]));
            setRound((prev) => prev + 1);
          }}
        />
      </div>
    </div>
  );
}

export default Worldcup;
