import React, { useState, createContext } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import Background from "../components/Background";
import Overlay from "../components/Overlay";

export const URLContext = createContext();

function Home() {
  const [url, setUrl] = useState("https://youtu.be/lTRiuFIWV54");
  return (
    <URLContext.Provider value={setUrl}>
      <Container>
        <Background url={url} />
        <Overlay />
      </Container>
    </URLContext.Provider>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
