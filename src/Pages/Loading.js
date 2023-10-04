import React from 'react';
import styled from 'styled-components';
import Spinner from '../Assets/Spinner.gif';

export const Loading = () => {
  return (
    <Background>
        <img src={Spinner} alt="로딩중" width="5%" />
        <LoadingText>네컷 처리중...</LoadingText>
    </Background>
  );
};

export default Loading;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #FFFCF4;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font: 1rem 'Pretendard';
  text-align: center;
`;