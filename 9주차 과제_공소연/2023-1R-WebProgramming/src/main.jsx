import ReactDOM from "react-dom/client";
import "./index.css";
import Worldcup from "./pages/Worldcup/Worldcup.jsx";
import { RecoilRoot } from "recoil";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Mise from "./pages/Mise/Mise";
import Root from "./components/Root";
import About from "./pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div className="root">아이고 에러가 났어요</div>,
    children: [
      {
        path: "/worldcup",
        element: <Worldcup />, // 메인페이지도 화면에 보여주고, Worldcup도 보여줘야 하기 때문에 Outlet을 사용한다.
      },
      {
        path: "/mise",
        element: <Mise />, // 메인페이지도 화면에 보여주고, App도 보여줘야 하기 때문에 Outlet을 사용한다.
      },
      {
        path: "/about",
        element: <About />, // 메인페이지도 화면에 보여주고, About도 보여줘야 하기 때문에 Outlet을 사용한다.
      },
      {
        path: "/user/:id",
        element: <div className="root">user</div>,
      },
      {
        path: "*",
        element: <div className="root">404 Not Found</div>,
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
