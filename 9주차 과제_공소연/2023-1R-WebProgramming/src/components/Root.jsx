import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();
  const url = location.href;

  return (
    <div>
      <div
        id="gnb"
        style={{
          position: "absolute",
          top: "5px",
          left: "10px",
          width: "fit-content",
          height: "fit-content",
          fontSize: "20px",
          fontWeight: "bold",
          color: "gray",
          zIndex: "1",
        }}
      >
        <div>
          공소연 웹프
          <button
            style={{ fontSize: "12px", marginLeft: "5px" }}
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </button>
          <button style={{ fontSize: "12px" }} onClick={() => navigate(1)}>
            앞으로가기
          </button>
        </div>
        <Link
          to="/worldcup"
          style={{
            textDecoration: url.includes("worldcup") ? "underline" : "none",
          }}
        >
          Worldcup
        </Link>
        <br />
        <Link
          to="/mise"
          style={{
            textDecoration: url.includes("mise") ? "underline" : "none",
          }}
        >
          Mise
        </Link>
        <br />
        <Link
          to="/about"
          style={{
            textDecoration: url.includes("about") ? "underline" : "none",
          }}
        >
          About
        </Link>
        <br />
      </div>
      <Outlet />
    </div>
  );
};

export default Root;
