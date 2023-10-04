import React from "react";
import styled from "styled-components";

//components
import { NavBar, NavBtn, CenterBtn } from "../Components/NavBar";
import BackgroundContainer from "../Components/BackgroundContainer";
import Main from "../Components/Main";
import {
  SmallerTitle,
  TxtBox,
  TextArea,
} from "../Components/postingComponents";
import { TopBar, Title } from "../Components/TopBar";

//assets
import BackIcon from "../Assets/icons/goback.png";
import dummy1 from "../Assets/dumy.png";

export const Home = () => {
  return (
    <BackgroundContainer>
      <TopBar>
        <NavBtn>
          <img src={BackIcon} alt="뒤로가기" />
        </NavBtn>
        <Title>네컷 등록</Title>
      </TopBar>
      <MiniContainer>
        <img src={dummy1}  style={{ paddingTop: '150px' }} />
        <SmallerTitle>When</SmallerTitle>
        <TxtBox type="text" placeholder="ex) 2023. 05. 11" />
        <SmallerTitle>Where</SmallerTitle>
        <TxtBox type="text" placeholder="이화여자대학교" />
        <SmallerTitle>Whom</SmallerTitle>
        <SmallerTitle>What</SmallerTitle>
        <TextArea type="text" placeholder="내용을 입력해주세요" />
      </MiniContainer>
      <NavBar />
    </BackgroundContainer>
  );
};

export default Home;

export const MiniContainer = styled(Main)`
  width: 80%;
  display: flex;
  height: calc(100vh-140px);
  justify-content: center;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  padding-top: 30px;

`;
