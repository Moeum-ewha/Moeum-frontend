import React from 'react';
import { useNavigate } from 'react-router-dom';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Question,
  Upper,
  Num,
  Down,
  PictureContainer,
  Pic,
  FaceBox,
  BtnContainer,
  YesBtn,
  NoBtn,
} from '../Components/NumofPeople';
import { Btn } from '../Components/ClassifiContainer';
import dummy1 from '../Assets/dummy7.png';

const Choice2 = () => {
  const navigate = useNavigate();
  const moveFunc = () => {
    navigate('/posting');
  };
  //데모 끝나고 지울 부분
  const movePage = () => {
    navigate('/faceclassification2');
  };
  return (
    <BackgroundContainer>
      <Content>
        <Question>
          <Upper>
            <Num>추가로 등록하실 친구</Num>가 있나요?
          </Upper>
          <Down>추가하고 싶은 친구를 눌러주세요</Down>
        </Question>
        <PictureContainer>
          <Pic onClick={movePage}>
            <img src={dummy1} style={{ width: '350px' }} />
          </Pic>
        </PictureContainer>
        <BtnContainer>
          <Btn onClick={moveFunc}>모두 등록했어요~</Btn>
        </BtnContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default Choice2;
