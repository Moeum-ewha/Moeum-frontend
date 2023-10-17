import React from "react";

import BackgroundContainer from "../Components/BackgroundContainer";
import balloon from '../Assets/balloon.png';
import Logo from "../Assets/logo.png";
import { TopBar, Title, Alert, Balloon, LogoC, Content, Gallery, } from "../Components/HomeComponents";
import { NavBar } from "../Components/NavBar";

const HomeScreen = () => {
    return (
        <BackgroundContainer>
            <Content>
            <TopBar>
                <Title>
                    Moeum
                </Title>
                <Alert>
                    <Balloon>
                        <img src={balloon} alt="말풍선" />
                    </Balloon>
                    <LogoC>
                        <img src={Logo} alt="로고" width="47%" />
                    </LogoC>
                </Alert>
            </TopBar>
            <Gallery/>
            </Content>
            <NavBar />
      </BackgroundContainer>
    );
};

export default HomeScreen;