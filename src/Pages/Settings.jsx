import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import BackgroundContainer from '../Components/BackgroundContainer';
import {
  TopBar,
  Title,
  Profile,
  PhotoDiv,
  InfoDiv,
  Nickname,
  ID,
  EditBtn,
  Content,
  Menus,
  Menu,
  Line,
  ExitBtn,
  BtnDiv,
  ComBtn,
  NickEdit,
  Link,
} from '../Components/SettingsComponents';
import { NavBar } from '../Components/NavBar';
import {
  ModalBack,
  ModalBox,
  YesButton,
  NoButton,
  ModalContent,
  Alert,
  BtnContainer,
} from '../Components/PopupModal';

import logo from '../Assets/logo.png';
import Loading from './Loading';

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({
    user: { username: '', email: '' },
  }); // 유저 정보를 초기화

  const navigate = useNavigate();

  const moveLogin = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));
    setTimeout(() => {
      navigate('/login');
    }, 100);
  };

  const sendApi = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const apiResponse = await axios({
        method: 'GET',
        url: `/account`,
        withCredentials: true,
      });

      console.log(apiResponse.status);
      console.log(apiResponse.data);

      setResponse(apiResponse.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.apiResponse.status);
          console.error(error.apiResponse.data);
        } else if (error.request) {
          console.error(error.request);
        }
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendApi();
  }, []);

  console.log(response);

  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(response.user.username);
  const [editedNickname, setEditedNickname] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedNickname.length >= 1 && editedNickname.length <= 8) {
      setNewNickname(editedNickname);
      setIsEditing(false);
    }
  };

  const [withdrawn, setWithdrawn] = useState(false); // 탈퇴 여부 상태 추가

  //모달
  const modalBackground = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleWithdrawal = async () => {
    try {
      const deleteResponse = await axios({
        method: 'DELETE',
        url: '/account',
        withCredentials: true,
      });

      console.log(deleteResponse);

      // 삭제 성공 시의 로직
      setWithdrawn(true); // 탈퇴 여부 상태 변경
      setModalOpen(false);
    } catch (error) {
      console.error(error); //
    }
  };

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Title>마이페이지</Title>
        </TopBar>
        <Profile>
          <PhotoDiv>
            <img
              src={logo}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </PhotoDiv>
          <InfoDiv>
            {isEditing ? (
              <NickEdit
                type="text"
                value={editedNickname}
                onChange={(e) => setEditedNickname(e.target.value)}
              />
            ) : (
              <Nickname>{response.user.username}</Nickname>
            )}
            <ID>{response.user.email}</ID>
          </InfoDiv>
          {isEditing ? (
            <ComBtn onClick={handleSave}>완료</ComBtn>
          ) : (
            <EditBtn onClick={handleEdit}>편집</EditBtn>
          )}
        </Profile>
        <Menus>
          <Menu>알림 설정</Menu>
          <Line />
          <Menu>
            <Link
              href="https://github.com/Moeum-ewha"
              target="_blank"
              rel="noopener noreferrer"
            >
              공지사항
            </Link>
          </Menu>
          <Line />
          <Menu>
            <Link href="mailto:moeum@gmail.com">문의하기</Link>
          </Menu>
          <Line />
          <Menu>
            <Link
              href="https://github.com/Moeum-ewha"
              target="_blank"
              rel="noopener noreferrer"
            >
              앱정보
            </Link>
          </Menu>
          <Line />
          <>
            {isLoading && <Loading />}
            <Menu style={{ color: '#EF4914' }} onClick={moveLogin}>
              로그아웃
            </Menu>
          </>
        </Menus>
        <BtnDiv>
          <ExitBtn onClick={openModal}>회원탈퇴</ExitBtn>
        </BtnDiv>
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
              <Alert>정말로 탈퇴하시겠어요?</Alert>
              <BtnContainer>
                <YesButton onClick={handleWithdrawal}>네</YesButton>
                <NoButton onClick={closeModal}>아니오</NoButton>
              </BtnContainer>
            </ModalContent>
          </ModalBox>
        </ModalBack>
      )}
      {withdrawn && (
        <ModalBack
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              handleWithdrawal(); // 초기화
            }
          }}
        >
          <ModalBox>
            <ModalContent>
              <Alert>나중에 또 만나요!</Alert>
              <BtnContainer>
                <NoButton onClick={moveLogin}>닫기</NoButton>
              </BtnContainer>
            </ModalContent>
          </ModalBox>
        </ModalBack>
      )}
      <NavBar />
    </BackgroundContainer>
  );
};

export default Settings;
