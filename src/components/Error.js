import React from "react";
import styled from "styled-components";

function Error() {
  return (
    <Container>
      <img src="/images/chill.jpg" alt="" />
    </Container>
  );
}

export default Error;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  @media (max-width: 1128px) {
    display: block;
    z-index: 2;
  }
  img {
    width: 100vw;
    height: 123vh;
    object-fit: cover;
    object-position: center;
  }
`;
