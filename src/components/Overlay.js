import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Tools from "./Tools";

function Overlay() {
  return (
    <Container>
      <Header />
      <BorderBottom />
      <Tools />
      <BorderTop />
      <BorderLeft />
      <BorderRight />
    </Container>
  );
}

export default Overlay;

const Container = styled.div`
  position: absolute;
  background: transparent;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 124vh;
  z-index: 1;
`;

const BorderBottom = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(to left, #4568dc 0%, #b06ab3 100%);
`;

const BorderTop = styled(BorderBottom)`
  top: 0;
  height: 6px;
  background: linear-gradient(to right, #4568dc 0%, #b06ab3 100%);
`;
const BorderLeft = styled.div`
  position: fixed;
  left: 0;
  width: 6px;
  height: 100%;
  background: linear-gradient(to bottom, #4568dc 0%, #b06ab3 100%);
`;
const BorderRight = styled.div`
  position: fixed;
  right: 0px;
  width: 6px;
  height: 100%;
  background: linear-gradient(to top, #4568dc 0%, #b06ab3 100%); ;
`;
