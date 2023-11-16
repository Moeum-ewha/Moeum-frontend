import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackgroundContainer from '../Components/BackgroundContainer';
import balloon from '../Assets/balloon.png';
import Logo from '../Assets/logo.png';
import {
  TopBar,
  FriendTitle,
  Alert,
  Balloon,
  Text,
  LogoC,
  Content,
  Gallery,
  Photo,
} from '../Components/HomeComponents';
import { NavBar } from '../Components/NavBar';
import { Back2 } from '../Components/TopBar';

const HomeScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const friendName = location.state.name;
  const postList = location.state.friendPostList;

  const movePost = () => {
    navigate('/viewpost');
  };

  const postOnClick = (index) => {
    const postData = postList[index];
    navigate(`/viewpost/${postData.id}`, { state: { postData } });
  };

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Back2/>
          <FriendTitle>{friendName}</FriendTitle>
          <Alert>
            <Balloon>
              <img src={balloon} alt="말풍선" />
            </Balloon>
            <Text>{friendName}님과 네컷을 찍은 지 26일 째에요!</Text>
            <LogoC>
              <img src={Logo} alt="로고" width="50px" height="50px" />
            </LogoC>
          </Alert>
        </TopBar>
        <Gallery>
          {postList.map((post, index) => (
            <Photo onClick={() => postOnClick(index)} key={post.id}>
              <img
                src={`../../dummy/${post.original}`}
                width="160px"
                style={{ borderRadius: '15px' }}
                onClick={movePost}
              />
            </Photo>
          ))}
        </Gallery>
      </Content>
      <NavBar />
    </BackgroundContainer>
  );
};

export default HomeScreen;
