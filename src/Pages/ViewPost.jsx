import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//components
import { NavBar, NavBtn, CenterBtn } from '../Components/NavBar';
import BackgroundContainer from '../Components/BackgroundContainer';
import { TopBar, Title, Back } from '../Components/TopBar';
import {
  Content,
  ContentContainer,
  MiniContainer,
  ImgContainer,
  SecondaryTitle,
  ShareBtn,
  Text,
  Date,
  Delete,
} from '../Components/viewingComponents';
import {
  ModalBack,
  ModalBox,
  YesButton,
  NoButton,
  ModalContent,
  Alert,
  BtnDiv,
} from '../Components/PopupModal';

//assets
import BackIcon from '../Assets/icons/goback.png';
import insta from '../Assets/icons/Insta.png';

export const ViewPost = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const imgURL = location.state.wholeImg;

  let nowUrl = window.location.href;

  const copyUrl= () => { 
  //nowUrl 변수에 담긴 주소를
  	navigator.clipboard.writeText(nowUrl).then(res=>{
	  alert("주소가 복사되었습니다!");
	})
  }

  const modalBackground = useRef();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Back>
            <img src={BackIcon} alt="뒤로가기" />
          </Back>
          <Title>네컷 일기</Title>
        </TopBar>
        <ContentContainer>
          <MiniContainer>
            <ImgContainer>
              <img src={location.state?.wholeImg} width="100%" />
            </ImgContainer>
            <SecondaryTitle>{location.state?.where}</SecondaryTitle>
            <ShareBtn>
              <img src={insta} alt="로고"  onClick={copyUrl}/>
            </ShareBtn>
            <Text>{location.state?.what}</Text>
            <Date>{location.state?.wnphen}</Date>
          </MiniContainer>
          <Delete onClick={openModal}>삭제하기</Delete>
        </ContentContainer>
      </Content>
      {modalOpen && (
        <ModalBack
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <ModalBox>
            <ModalContent>
              <Alert>정말로 삭제하시겠습니까?</Alert>
              <BtnDiv>
                <YesButton>네</YesButton>
                <NoButton>아니오</NoButton>
              </BtnDiv>
            </ModalContent>
          </ModalBox>
        </ModalBack>
      )}
      <NavBar />
    </BackgroundContainer>
  );
};

export default ViewPost;
