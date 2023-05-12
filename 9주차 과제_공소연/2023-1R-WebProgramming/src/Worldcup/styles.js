import styled from "styled-components";

export const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  position: absolute;
  top: 0;
  font-size: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
`;

export const ImgRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 1200px;
  height: 600px;
`;

export const ImgContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;
/* 
export const SelectedImg = styled(Img)`
  border: 3px solid #fff;
  border-radius: 30px;
  z-index: 2;
`; */

export const ImgTypoLeft = styled.div`
  position: absolute;
  right: 40px;
  bottom: 50px;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

export const ImgTypoRight = styled(ImgTypoLeft)`
  left: 40px;
`;

export const VSTypo = styled(ImgTypoLeft)`
  right: auto;
  color: orangered;
`;
