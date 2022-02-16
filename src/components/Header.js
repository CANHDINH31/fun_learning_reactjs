import React, { useState } from "react";
import styled from "styled-components";
import { FiUsers } from "react-icons/fi";
import { BsFacebook, BsYoutube, BsTelephone } from "react-icons/bs";
function Header() {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <WrapButton>
        <Button>
          <a>
            <p>😁 🔥 💘 </p>
          </a>
        </Button>
        <Button>
          <a>
            <p>🚀 Fun Learing</p>
          </a>
        </Button>
        <Button onClick={() => setShow(!show)}>
          <FiUsers />
          {show && (
            <Menu>
              <Item>About me</Item>
              <Item>
                <a
                  href="https://www.facebook.com/profile.php?id=100004406117069"
                  target="_blank"
                >
                  <BsFacebook />
                  <span>Facebook</span>
                </a>
              </Item>
              <Item>
                <a
                  href="https://www.youtube.com/channel/UCvSkmTXALKYjA2LJziDifdA/playlists"
                  target="_blank"
                >
                  <BsYoutube />
                  <span>Youtube</span>
                </a>
              </Item>
              <Item>
                <a href="/">
                  <BsTelephone />
                  <span>0397.677.583</span>
                </a>
              </Item>
            </Menu>
          )}
        </Button>
      </WrapButton>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  position: fixed;
  top: 2%;
  right: 1%;
`;

const WrapButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  color: #fff;
  background: #232931;
  border-color: #515151;
  padding: 6px 10px;
  min-height: 36px;
  max-height: 36px;
  border-radius: 7px;
  margin: 0 4px;
  cursor: pointer;
  img {
    width: 30px;
  }
  a {
    p {
      font-size: 1rem;
      font-weight: 500;
      font-style: normal;
    }
  }
  svg {
    font-size: 1.3rem;
  }
`;

const Menu = styled.ul`
  position: absolute;
  top: 100%;
  list-style-type: none;
  right: 0;
  background: #232931;
  height: auto;
  width: 200px;
  margin: 5px 0;
  padding: 5px 0;
  border-radius: 7px;
  animation: fadeIn 187ms ease-in-out;
`;

const Item = styled.li`
  border-bottom: 1px solid #515151;
  font-size: 1rem;
  padding: 10px 14px;

  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      margin-left: 8px;
    }
  }

  &:last-child {
    border: none;
  }
`;
