import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Question,
  PictureContainer,
  Face,
  FaceBox,
  BottomContainer,
  Btn,
} from '../Components/ClassifiContainer';

import dummy2 from '../Assets/dummy2.jpeg';

const FaceClassifi2 = () => {
  const location = useLocation();

  // 데이터 URL을 받아옴
  const croppedFaceDataURL = location.state.croppedFaceDataURL;

  const navigate = useNavigate();

  const moveFunc = () => {
    navigate('/faceclassification');
  };

  const moveAdd = () => {
    navigate('/home');
  };

  return (
    <BackgroundContainer>
      <Content>
        <Question>(새로운 친구)님이 맞나요?</Question>
        <PictureContainer>
          <Face>
            <img src={dummy2} style={{ width: '90%' }} />
          </Face>
          <FaceBox />
        </PictureContainer>
        <BottomContainer>
          <Btn onClick={moveAdd}>네, 맞아요!</Btn>
          <Btn onClick={moveFunc}>등록된 친구예요.</Btn>
        </BottomContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default FaceClassifi2;
