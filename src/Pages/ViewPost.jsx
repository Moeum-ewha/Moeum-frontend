import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
import dummy1 from '../Assets/dumy.png';
import insta from '../Assets/icons/Insta.png';

export const ViewPost = () => {
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
                <img src={dummy1} />
              </ImgContainer>
              <SecondaryTitle>수진언니와 신촌에서</SecondaryTitle>
              <ShareBtn>
                <img src={insta} alt="로고" />
              </ShareBtn>
              <Text>
                오늘은 00이와 1년만에 만났다. 오랜만에 봤는데도 매일 보는 느낌~~
              </Text>
              <Date>2022.11.02</Date>
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
