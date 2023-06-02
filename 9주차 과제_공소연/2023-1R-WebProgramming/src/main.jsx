import ReactDOM from "react-dom/client";
import "./index.css";
import Worldcup from "./Worldcup/Worldcup.jsx";
import { RecoilRoot } from "recoil";
import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        메인페이지
        <Outlet />
      </div>
    ),
    errorElement: <div>아이고 에러가 났어요</div>,
    children: [
      {
        path: "/worldcup",
        element: <Worldcup />, // 메인페이지도 화면에 보여주고, Worldcup도 보여줘야 하기 때문에 Outlet을 사용한다.
      },
      {
        path: "/app",
        element: <App />, // 메인페이지도 화면에 보여주고, App도 보여줘야 하기 때문에 Outlet을 사용한다.
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
