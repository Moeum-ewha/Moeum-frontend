import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//components
import { NavBar, NavBtn } from '../Components/NavBar';
import BackgroundContainer from '../Components/BackgroundContainer';
import Main from '../Components/Main';
import {
  SmallerTitle,
  TxtBox,
  TextArea,
} from '../Components/postingComponents';
import { TopBar, Title } from '../Components/TopBar';
import FaceReCog from './FaceRecog';

//assets
import BackIcon from '../Assets/icons/goback.png';
import dummy1 from '../Assets/dumy.png';

export const Home = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [text, setText] = useState('');

  const dateOnChange = (e) => {
    setDate(e.target.value);
  };

  const locationOnChange = (e) => {
    setLocation(e.target.value);
  };

  const textOnChange = (e) => {
    setText(e.target.value);
  };

  return (
    <BackgroundContainer>
      <TopBar>
        <NavBtn>
          <img src={BackIcon} alt="뒤로가기" />
        </NavBtn>
        <Title>네컷 등록</Title>
      </TopBar>
      <MiniContainer>
        <img src={dummy1} style={{ paddingTop: '150px' }} />
        <SmallerTitle>When</SmallerTitle>
        <TxtBox
          onChange={dateOnChange}
          type="text"
          placeholder="ex) 2023. 05. 11"
        />
        <SmallerTitle>Where</SmallerTitle>
        <TxtBox
          onChange={locationOnChange}
          type="text"
          placeholder="이화여자대학교"
        />
        <SmallerTitle>Whom</SmallerTitle>
        <SmallerTitle>What</SmallerTitle>
        <TextArea
          onChange={textOnChange}
          type="text"
          placeholder="내용을 입력해주세요"
        />
      </MiniContainer>
      <PaddingContainer />
      <NavBar when={date} where={location} what={text} />
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
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  padding-top: 30px;
`;

export const PaddingContainer = styled.div`
  width: 100%;
  height: 200px;
`;
