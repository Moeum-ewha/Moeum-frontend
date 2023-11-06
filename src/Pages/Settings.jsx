import React, { useState, useEffect, useRef } from 'react';
import BackgroundContainer from "../Components/BackgroundContainer";
import { TopBar, Title, Profile, PhotoDiv, InfoDiv, Nickname, ID, EditBtn, Content, Menus, Menu, Line, ExitBtn, BtnDiv, ComBtn, NickEdit} from "../Components/SettingsComponents";
import { NavBar } from "../Components/NavBar";
import { ModalBack, ModalBox,YesButton, NoButton, ModalContent, Alert, BtnContainer } from "../Components/PopupModal";

import dummy from '../Assets/dummy2.jpeg';

const Settings = () => {
    const modalBackground = useRef();
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
    setModalOpen(true);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState('우냐냐'); // 초기 닉네임 설정
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
                    <img src={dummy} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50px'
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
                            {newNickname}
                        </Nickname>
                    )}
                    <ID>    
                        ohjinya@moeum.com
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
              <YesButton>네</YesButton>
              <NoButton>아니오</NoButton>
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