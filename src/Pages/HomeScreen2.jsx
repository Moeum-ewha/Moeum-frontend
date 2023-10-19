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
  Photo,
  Left,
  Right,
} from '../Components/HomeComponents';
import { NavBar } from '../Components/NavBar';
import { Entrance } from './Entrance';

import dummy1 from '../Assets/dummy3.jpeg';
import dummy2 from '../Assets/dummy4.jpeg';
import dummy3 from '../Assets/dummy5.jpeg';
import dummy4 from '../Assets/dummy6.jpeg';
import dummy5 from '../Assets/dummy7.jpeg';


const HomeScreen2 = () => {
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
              <Title style={{ marginLeft: '10px' }} >Moeum</Title>
              <Alert>
                <Balloon>
                  <img src={balloon} alt="말풍선" />
                </Balloon>
                <LogoC>
                  <img src={Logo} alt="로고" width="50px" height="50px" />
                </LogoC>
              </Alert>
            </TopBar>
            <Gallery>
              <Left>
              <Photo>
                <img src={dummy5} width="160px" style={{ borderRadius: '15px' }} />
                </Photo>
                <Photo>
                <img src={dummy1} width="160px" style={{ borderRadius: '15px' }} />
                </Photo>
                <Photo>
                <img src={dummy2} width="160px"  style={{ borderRadius: '15px' }} />
                </Photo>
              </Left>
              <Right>
                <Photo>
                <img src={dummy3} width="160px"  style={{ borderRadius: '15px' }} /> 
                </Photo>
                <Photo>
                <img src={dummy4} width="160px"  style={{ borderRadius: '15px' }} />  
                </Photo>
              </Right>
            </Gallery>
          </Content>
          <NavBar />
        </BackgroundContainer>
      )}
    </>
  );
};

export default HomeScreen2;
