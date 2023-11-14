import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const location = useLocation();

  // 데이터 URL을 받아옴
  const croppedFaceDataURL = location.state.img;
  const imgURL = location.state.wholeImg;

  const navigate = useNavigate();
  const moveFunc = () => {
    navigate('/posting', {
      state: { img: croppedFaceDataURL, wholeImg: imgURL },
    });
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
            <img
                src={imgURL}
                style={{ position: 'relative', width: 350 }}
                alt="선택한 이미지"
              />
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
