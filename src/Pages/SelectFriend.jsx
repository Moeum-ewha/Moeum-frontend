import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Question,
  Upper,
  Num,
  Down,
  BtnContainer,
  Friend,
  FriendPic,
  Name,
  Container,
} from '../Components/NumofPeople';
import dummy1 from '../Assets/yeongwoo.jpeg';
import dummy2 from '../Assets/yujin2.jpeg';
import dummy3 from '../Assets/hyejoon2.jpeg';

const SelectFriend = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const croppedFaceDataURL = location.state.img;
  const originalImg = location.state.wholeImg;

  //임시로 넣어둔 데이터 - 이후 선택된 인물의 값을 적용할 수 있도록 코드 변경해두어야함
  const moveFunc = () => {
    navigate('/isanyonemore', {
      state: {
        wholeImg: originalImg,
        canvasData: location.state.canvasData,
        selectedFace: location.state.selectedFace,
        savedFriendData: [
          ...location.state.savedFriendData,
          {
            name: '건희',
            //친구목록 파일의 사진으로 추후 수정
            faceImg: croppedFaceDataURL,
          },
        ],
        newFriendData: location.state.newFriendData,
      },
    });
  };

  return (
    <BackgroundContainer>
      <Content>
        <Question>
          <Upper>
            <Num>사진 속 친구 </Num>를 선택해주세요.
          </Upper>
          <Down></Down>
        </Question>
        <Container>
          <Friend onClick={moveFunc}>
            <FriendPic>
              <img
                src={dummy1}
                style={{ width: '50px', height: '50px', borderRadius: '100%' }}
              />
            </FriendPic>
            <Name>영우</Name>
          </Friend>
          <Friend onClick={moveFunc}>
            <FriendPic>
              <img
                src={dummy2}
                style={{ width: '50px', height: '50px', borderRadius: '100%' }}
              />
            </FriendPic>
            <Name>유진</Name>
          </Friend>
          <Friend onClick={moveFunc}>
            <FriendPic>
              <img
                src={dummy3}
                style={{ width: '50px', height: '50px', borderRadius: '100%' }}
              />
            </FriendPic>
            <Name>혜준</Name>
          </Friend>
        </Container>
        <BtnContainer></BtnContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default SelectFriend;
