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
  FContainer,
  Friend, 
  FriendPic, 
  Name,
} from '../Components/postingComponents';
import { TopBar, Title } from '../Components/TopBar';
import FaceReCog from './FaceRecog';

//assets
import BackIcon from '../Assets/icons/goback.png';
import dummy1 from '../Assets/dummy6.jpeg';
import dummy2 from "../Assets/yujin2.jpeg";
import dummy3 from "../Assets/hyejoon2.jpeg";
import dummy4 from "../Assets/unknown.jpeg";

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
        <img src={dummy1} width="90%" style={{ paddingTop: '300px', borderRadius: '10px' }} />
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
        <FContainer>
        <Friend>
                    <FriendPic>
                        <img src={dummy2} style={{width: "50px", height: "50px" , borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        유진
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy3} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        혜준
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy4} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        남준
                    </Name>
                </Friend>
                </FContainer>
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
