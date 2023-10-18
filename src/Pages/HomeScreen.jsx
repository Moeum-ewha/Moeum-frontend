import React, { useState, useEffect } from 'react';

import BackgroundContainer from '../Components/BackgroundContainer';
import balloon from '../Assets/balloon.png';
import Logo from '../Assets/logo.png';
import {
  TopBar,
  Title,
  Alert,
  Balloon,
  LogoC,
  Content,
  Gallery,
} from '../Components/HomeComponents';
import { NavBar } from '../Components/NavBar';
import { Entrance } from './Entrance';

const HomeScreen = () => {
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
        <Entrance />
      ) : (
        <BackgroundContainer>
          <Content>
            <TopBar>
              <Title>Moeum</Title>
              <Alert>
                <Balloon>
                  <img src={balloon} alt="말풍선" />
                </Balloon>
                <LogoC>
                  <img src={Logo} alt="로고" width="47%" />
                </LogoC>
              </Alert>
            </TopBar>
            <Gallery />
          </Content>
          <NavBar />
        </BackgroundContainer>
      )}
    </>
  );
};

export default HomeScreen;
