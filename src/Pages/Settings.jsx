import React from "react";

import BackgroundContainer from "../Components/BackgroundContainer";
import { TopBar, Title, Profile, PhotoDiv, InfoDiv, Nickname, ID, EditBtn, Content, Menus, Menu, Line, ExitBtn, BtnDiv, } from "../Components/SettingsComponents";
import { NavBar } from "../Components/NavBar";

import dummy from '../Assets/dummy2.jpeg';

const Settings = () => {
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
                    <Nickname>
                        우냐냐
                    </Nickname>
                    <ID>    
                        @ohjinya
                    </ID>
                </InfoDiv>
                <EditBtn>
                    편집
                </EditBtn>
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
                <Menu  style={{ color:'#EF4914'
                }} >
                    로그아웃
                </Menu>
                </Menus>
                <BtnDiv>
                <ExitBtn>
                    회원탈퇴
                </ExitBtn>
                </BtnDiv>
            </Content>
            <NavBar />
      </BackgroundContainer>
    );
};

export default Settings;