import { Outlet } from "react-router";

const Root = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "5px",
          left: "10px",
          width: "fit-content",
          height: "50px",
          fontSize: "30px",
          fontWeight: "bold",
          color: "thistle",
        }}
      >
        공소연 웹프
      </div>
      <Outlet />
    </>
  );
};

export default Root;
