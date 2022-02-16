import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

function Background(props) {
  return (
    <Container>
      <ReactPlayer
        width={"100vw"}
        height={"123vh"}
        loop={true}
        controls={false}
        playing={true}
        muted={true}
        url={props.url}
      />
    </Container>
  );
}

export default Background;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
