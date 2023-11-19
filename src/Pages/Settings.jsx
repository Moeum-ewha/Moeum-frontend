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

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({
    user: { username: '', email: '' },
  }); // 유저 정보를 초기화합니다.

  const navigate = useNavigate();

<<<<<<< HEAD
  const sendApi = async () => {
    // Send 버튼 더블클릭 방지
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Send API request
      response = await axios({
        method: 'GET',
        url: 'https://localhost:5000/account',
        data: body ? JSON.parse(body) : undefined,
      });

      // 2XX status code
      console.log(response.status);
      console.log(response.data);

      setResponse(result.data); // 서버로부터 받은 데이터를 response에 업데이트합니다.

      setData(JSON.stringify(response.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          // Non-2XX status code
          console.error(error.response.status);
          console.error(error.response.data);
        } else if (error.request) {
          // Request made, no response
          console.error(error.request);
=======
    const sendApi = async () => {
        // Send 버튼 더블클릭 방지
        if (isLoading) return;
    
        setIsLoading(true);

    
        try {
          // Send API request
          const response = await axios({
            method: "GET",
            url:'/account',
            data: undefined,
            withCredentials: true,
          });


          console.log(response);
    
          // 2XX status code
          console.log(response.status);
          console.log(response.data);

          setResponse(response.data); // 서버로부터 받은 데이터를 response에 업데이트합니다.
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response) {
              // Non-2XX status code
              console.error(error.response.status);
              console.error(error.response.data);
            } else if (error.request) {
              // Request made, no response
              console.error(error.request);
            }
          } else {
            // Other unexpected error
            console.error(error);
          }
        } finally {
          setIsLoading(false);
>>>>>>> 99f64a2c57bd19b2df86274de5f02ce177145504
        }
      } else {
        // Other unexpected error
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendApi(); // componentDidMount와 동일하게 첫 렌더링 시에 API를 호출합니다.
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

  const handleWithdrawal = () => {
    setWithdrawn(true);
    setModalOpen(false); // 모달 닫기
  };

<<<<<<< HEAD
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
              <Nickname>{newNickname}</Nickname>
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
          <Menu>공지사항</Menu>
          <Line />
          <Menu>문의하기</Menu>
          <Line />
          <Menu>앱 정보</Menu>
          <Line />
          <Menu style={{ color: '#EF4914' }}>로그아웃</Menu>
        </Menus>
        <BtnDiv>
          <ExitBtn onClick={openModal}>회원탈퇴</ExitBtn>
        </BtnDiv>
      </Content>
      {modalOpen && (
=======
    return (
        <BackgroundContainer>
            <Content>
            <TopBar>
                <Title>
                    마이페이지
                </Title>
            </TopBar>
            <Profile>
                <PhotoDiv>
                    <img src={logo} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }} />
                </PhotoDiv>
                <InfoDiv>
                    {isEditing ? (
                        <NickEdit
                            type="text"
                            value={editedNickname}
                            onChange={(e) => setEditedNickname(e.target.value)}
                        />
                    ) : (
                        <Nickname>
                            {response.user.username}
                        </Nickname>
                    )}
                    <ID>    
                    {response.user.email}
                    </ID>
                </InfoDiv>
                {isEditing ? (
                    <ComBtn onClick={handleSave}>완료</ComBtn>
                ) : (
                    <EditBtn onClick={handleEdit}>편집</EditBtn>
                )}
            </Profile>
            <Menus>
                <Menu>
                    알림 설정
                </Menu>
                <Line />
                <Menu>
                  <Link href="https://github.com/Moeum-ewha" target="_blank" rel="noopener noreferrer">
                    공지사항
                  </Link>
                </Menu>
                <Line />
                <Menu>
                  <Link href="mailto:moeum@gmail.com">
                    문의하기
                  </Link>
                </Menu>
                <Line />
                <Menu>
                  <Link href="https://github.com/Moeum-ewha" target="_blank" rel="noopener noreferrer">
                    앱정보
                  </Link>
                </Menu>
                <Line />
                <Menu style={{ color:'#EF4914'}} >
                    로그아웃
                </Menu>
                </Menus>
                <BtnDiv>
                <ExitBtn onClick={openModal}>
                    회원탈퇴
                </ExitBtn>
                </BtnDiv>
            </Content>
            {modalOpen && (
>>>>>>> 99f64a2c57bd19b2df86274de5f02ce177145504
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
              handleCancelWithdrawal(); // 초기화
            }
          }}
        >
          <ModalBox>
            <ModalContent>
              <Alert>나중에 또 만나요!</Alert>
              <BtnContainer>
                <NoButton onClick={handleWithdrawal}>닫기</NoButton>
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