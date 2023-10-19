import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

//components
import { NavBar, NavBtn, CenterBtn } from '../Components/NavBar';
import BackgroundContainer from '../Components/BackgroundContainer';
import { Loading } from './Loading';
import Main from '../Components/Main';
import { TopBar, Title } from '../Components/TopBar';
import {
  ContentContainer,
  MiniContainer,
  ImgContainer,
  SecondaryTitle,
  ShareBtn,
  Text,
  Date,
  Delete,
} from '../Components/viewingComponents';

//assets
import BackIcon from '../Assets/icons/goback.png';
import dummy1 from '../Assets/dummy6.jpeg';
import insta from '../Assets/icons/Insta.png';

export const ViewPost = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loading keyword="게시글 작성중..." />
      ) : (
        <BackgroundContainer>
          <TopBar>
            <NavBtn>
              <img src={BackIcon} alt="뒤로가기" />
            </NavBtn>
            <Title>네컷 일기</Title>
          </TopBar>
          <ContentContainer>
            <MiniContainer>
              <ImgContainer>
                <img src={dummy1} width="100%"/>
              </ImgContainer>
              <SecondaryTitle>{location.state?.where}</SecondaryTitle>
              <ShareBtn>
                <img src={insta} alt="로고" />
              </ShareBtn>
              <Text>{location.state?.what}</Text>
              <Date>{location.state?.when}</Date>
            </MiniContainer>
            <Delete>삭제하기</Delete>
          </ContentContainer>
          <NavBar />
        </BackgroundContainer>
      )}
    </>
  );
};

export default ViewPost;
