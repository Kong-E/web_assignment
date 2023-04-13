let chart;
let chart2;

function zeroToMinus(data) {
  if (data === 0 || data === "") {
    return "-";
  } else {
    return data;
  }
}

async function load() {
  const comfirm = confirm("데이터를 불러오시겠습니까?");
  if (!comfirm) {
    console.log("데이터 안 불러옵니다");
    return;
  }
  console.log("데이터를 불러옵니다");

  const res = await fetch(
    "http://openapi.seoul.go.kr:8088/72534779436772613635674d596a53/json/RealtimeCityAir/1/25"
  );
  const res2 = await res.json();

  if (chart && chart2) {
    chart.destroy();
    chart2.destroy();
  }

  console.log(res2.RealtimeCityAir);

  document.getElementById("head").innerHTML = `
      <th scope="col" class="px-6 py-3" style="border-top-left-radius: 15px">도시권</th>
      <th scope="col" class="px-6 py-3">지역명</th>
      <th scope="col" class="px-6 py-3">상태</th>
      <th scope="col" class="px-6 py-3">미세먼지</th>
      <th scope="col" class="px-6 py-3">초미세먼지농도</th>
      <th scope="col" class="px-6 py-3">오존</th>
      <th scope="col" class="px-6 py-3">아황산가스농도</th>
      <th scope="col" class="px-6 py-3" style="border-top-right-radius: 15px">통합대기환경지수</th>`;

  document.getElementById("data").innerHTML = "";

  const labels = [];
  const dataList = [];
  const dataList2 = [];
  const IDEX_MVL_Arr = [];

  for (var i = 0; i < 25; i++) {
    document.getElementById("data").innerHTML =
      document.getElementById("data").innerHTML +
      `<tr id="row_${i}" class="table_row">
          <td class="px-6 py-4 MSRRGN_NM">${
            res2.RealtimeCityAir.row[i].MSRRGN_NM
          }</td>
          <td class="px-6 py-4 MSRSTE_NM">${
            res2.RealtimeCityAir.row[i].MSRSTE_NM
          }</td>
          <td class="px-6 py-4 IDEX_NM">${zeroToMinus(
            res2.RealtimeCityAir.row[i].IDEX_NM
          )}</td>
          <td class="px-6 py-4 PM10">${zeroToMinus(
            res2.RealtimeCityAir.row[i].PM10
          )}
             </td>
          <td class="px-6 py-4 PM25">${zeroToMinus(
            res2.RealtimeCityAir.row[i].PM25
          )}</td>
          <td class="px-6 py-4 O3">${zeroToMinus(
            res2.RealtimeCityAir.row[i].O3
          )}</td>
          <td class="px-6 py-4 SO2">${zeroToMinus(
            res2.RealtimeCityAir.row[i].SO2
          )}</td>
          <td class="px-6 py-4 IDEX_MVL">${zeroToMinus(
            res2.RealtimeCityAir.row[i].IDEX_MVL
          )}</td>
        </tr>`;

    labels.push(res2.RealtimeCityAir.row[i].MSRSTE_NM);
    dataList.push(res2.RealtimeCityAir.row[i].PM10);
    dataList2.push(res2.RealtimeCityAir.row[i].PM25);
    IDEX_MVL_Arr.push({
      [`row_${i}`]: res2.RealtimeCityAir.row[i].IDEX_MVL,
    });
  }

  //chart
  const ctx = document.getElementById("myChart");
  const ctx2 = document.getElementById("myChart2");

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "PM10",
          data: dataList,
          borderWidth: 1,
          backgroundColor: "#ff0000",
          borderWidth: 1,
          borderRadius: 10,
          borderSkipped: false,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  chart2 = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "PM25",
          data: dataList2,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const table_rows = document.querySelectorAll(".table_row");
  const MSRRGN_NMs = document.querySelectorAll(".MSRRGN_NM");
  const IDEX_NMs = document.querySelectorAll(".IDEX_NM");
  /*   const PM10s = document.querySelectorAll(".PM10");
  const PM25s = document.querySelectorAll(".PM25");
  const O3s = document.querySelectorAll(".O3");
  const SO2s = document.querySelectorAll(".SO2");
  const IDEX_MVLs = document.querySelectorAll(".IDEX_MVL"); */

  // 도시권 구분
  // 위의 for문 안에서 숏서킷으로 구현할 수도 있음
  let prevInnerText = MSRRGN_NMs[0].innerText;
  for (let i = 1; i < MSRRGN_NMs.length; i++) {
    if (prevInnerText != MSRRGN_NMs[i].innerText) {
      table_rows[i - 1].classList.add("border_bottom");
    }
    prevInnerText = MSRRGN_NMs[i].innerText;
  }

  // 0일 경우 '-'로 표시
  /*   const elements = [...PM10s, ...PM25s, ...O3s, ...SO2s, ...IDEX_MVLs];

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].innerText === "0") {
      elements[i].innerText = "-";
    }
  } */

  // 보통, 좋음, 나쁨 색깔
  IDEX_NMs.forEach((IDEX_NM) => {
    const className = (() => {
      if (IDEX_NM.innerText === "보통") {
        return "green";
      } else if (IDEX_NM.innerText === "좋음") {
        return "blue";
      } else {
        return "red";
      }
    })();
    IDEX_NM.classList.add(className);
  });

  // 통합대기환경지수 상위 5개 구 파란색, 하위 5개 구 빨간색
  IDEX_MVL_Arr.sort(function (a, b) {
    return Object.values(a)[0] - Object.values(b)[0];
  });

  const top5 = IDEX_MVL_Arr.slice(0, 5);
  const bottom5 = IDEX_MVL_Arr.slice(-5);

  const topIDs = new Set(top5.map((obj) => Object.keys(obj)[0]));
  const bottomIDs = new Set(bottom5.map((obj) => Object.keys(obj)[0]));

  table_rows.forEach((row) => {
    if (topIDs.has(row.id)) {
      row.classList.add("blue", "font-bold");
    } else if (bottomIDs.has(row.id)) {
      row.classList.add("red", "font-bold");
    }
  });
}

/* 과제
차트를 3개 이상 그려서 표시하기 
유형이 완전 다른 차트 3개를 그리기
*/
