import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundContainer from "../Components/BackgroundContainer";
import { TopBar, Title, Profile, PhotoDiv, InfoDiv, Nickname, ID, EditBtn, Content, Menus, Menu, Line, ExitBtn, BtnDiv, ComBtn, NickEdit} from "../Components/SettingsComponents";
import { NavBar } from "../Components/NavBar";
import { ModalBack, ModalBox,YesButton, NoButton, ModalContent, Alert, BtnContainer } from "../Components/PopupModal";

import dummy from '../Assets/dummy2.jpeg';
import logo from "../Assets/logo.png";

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('우냐냐'); // 초기 닉네임 설정
  const [editedNickname, setEditedNickname] = useState('');

  const navigate = useNavigate();

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
        setModalOpen(false);// 모달 닫기
    };

    const handleCancelWithdrawal = () => {
        setWithdrawn(false);
        navigate('/login');
      };
      

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
                            {test}
                        </Nickname>
                    )}
                    <ID>    
                    test@test.com
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
                    공지사항
                </Menu>
                <Line />
                <Menu>
                    문의하기
                </Menu>
                <Line />
                <Menu>
                    앱 정보
                </Menu>
                <Line />
                <Menu style={{ color:'#EF4914'
                }} >
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
                <NoButton onClick={handleCancelWithdrawal}>닫기</NoButton>
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