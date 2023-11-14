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

const IsSavedFriend = () => {
  const location = useLocation();

  // 데이터 URL을 받아옴
  const croppedFaceDataURL = location.state.img;
  const name = location.state.name;
  const originalImg = location.state.wholeImg;
  console.log('croppedFaceData: ' + croppedFaceDataURL);
  console.log('originalImg: ' + originalImg);
  const navigate = useNavigate();

  const moveFunc = () => {
    navigate('/addname');
  };

  const moveAdd = () => {
    navigate('/isanyonemore', {
      state: {
        name: name,
        wholeImg: originalImg,
        selectedFace: location.state.selectedFace,
        canvasData: location.state.canvasData,
      },
    });
  };

  return (
    <BackgroundContainer>
      <Content>
        <Question>{name}님이 맞나요?</Question>
        <PictureContainer>
          <Face>
            <img
              src={croppedFaceDataURL}
              style={{ width: '90%', transform: 'scale(2)' }}
            />
          </Face>
        </PictureContainer>
        <BottomContainer>
          <Btn onClick={moveAdd}>네, 맞아요!</Btn>
          <Btn onClick={moveFunc}>등록된 다른 친구예요.</Btn>
          <Btn onClick={moveFunc}>새로운 친구예요.</Btn>
        </BottomContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default IsSavedFriend;
