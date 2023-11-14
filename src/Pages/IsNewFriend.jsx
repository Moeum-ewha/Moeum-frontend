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

const IsNewFriend = () => {
  const location = useLocation();

  const croppedFaceDataURL = location.state.img;
  const imgURL = location.state.wholeImg;

  const navigate = useNavigate();

  const moveAdd = async () => {
    navigate('/addname', {
      state: {
        img: croppedFaceDataURL,
        wholeImg: imgURL,
        selectedFace: location.state.selectedFace,
        canvasData: location.state.canvasData,
      },
    });
  };

  const moveToSelect = () => {
    navigate('/selectfriend', {
      state: {
        img: croppedFaceDataURL,
        wholeImg: imgURL,
        selectedFace: location.state.selectedFace,
        canvasData: location.state.canvasData,
      },
    });
  };

  return (
    <BackgroundContainer>
      <Content>
        <Question>(새로운 친구)님이 맞나요?</Question>
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
          <Btn onClick={moveToSelect}>등록된 친구예요.</Btn>
        </BottomContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default IsNewFriend;
