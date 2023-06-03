import "../../App.css";
import { useEffect, useState } from "react";

function App() {
  const [row, setRow] = useState([]);

  function onClickAPILoad() {
    fetch(
      "http://openapi.seoul.go.kr:8088/72534779436772613635674d596a53/json/RealtimeCityAir/1/25"
    )
      .then((res) => res.json())
      .then((res) => setRow(res.RealtimeCityAir.row));
  }

  const onClickTitleChange = () => {
    document.title = "서울시 미세먼지 조회"; // 원하는 타이틀로 변경합니다.
  };

  // 첫번째 useEffect
  useEffect(() => {
    console.log("mount or update");
    return () => {
      console.log("unmount");
    };
  });

  // 빈배열을 던지는 useEffect
  useEffect(() => {
    console.log("mount only");
  }, []);

  // row가 업데이트 될 때만 실행되는 useEffect
  useEffect(() => {
    console.log("update only", row);
  }, [row]);

  // console.log(row);

  return (
    <div className="root">
      {/* MSRRGN_NM, O3, PM10, IDEX_NM */}
      <button onClick={onClickAPILoad}>불러오기</button>
      <table>
        <thead>
          <tr>
            <th>MSRRGN_NM</th>
            <th>O3</th>
            <th>PM10</th>
            <th>IDEX_NM</th>
          </tr>
        </thead>
        <tbody>
          {row.map((item, idx) => (
            <tr key={`${item.MSRSTE_NM}_${idx}`}>
              <td>{item.MSRRGN_NM}</td>
              <td>{item.O3}</td>
              <td>{item.PM10}</td>
              <td>{item.IDEX_NM}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div>
        <a href={newLocal} target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.d`ev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
          </div>`
      <h1>Vite + Resort</h1> */}
      <div className="card">
        <button onClick={onClickTitleChange}>Title Change</button>
        {/*         <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      {/*       <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  );
}

export default App;

// 과제: 버튼 누르면 창의 title이 바뀌도록
