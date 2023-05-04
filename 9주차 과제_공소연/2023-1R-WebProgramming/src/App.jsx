import "./App.css";
import { useState } from "react";

function App() {
  const [row, setRow] = useState([]);
  const onLoad = () => {
    fetch(
      "http://openapi.seoul.go.kr:8088/72534779436772613635674d596a53/json/RealtimeCityAir/1/25"
    )
      .then((res) => res.json())
      .then((res) => setRow(res.RealtimeCityAir.row));
  };

  console.log(row);

  return (
    <>
      {/* MSRRGN_NM, O3, PM10, IDEX_NM */}
      <button onClick={onLoad}>불러오기</button>
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
          {row.map((item) => (
            <tr key={item.MSRSTE_NM}>
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
      <h1>Vite + Resort</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
