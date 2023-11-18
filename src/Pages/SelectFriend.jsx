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

import demo from '../../public/dummy/dummy.json';

const SelectFriend = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const friendsList = demo.userList.map((user) => user.friendsList).flat();

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else byteString = decodeURIComponent(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  const croppedFaceDataURL = location.state.faceImg;
  const originalImg = location.state.wholeImg;
  const imgURL = location.state.wholeImg;
  const orginalImgBlob = dataURItoBlob(imgURL);

  /*savedFriendData.forEach((friend, index) => {
    formData.append(`savedFriend_${index + 1}_name`, friend.name);
  });*/

  //임시로 넣어둔 데이터 - 이후 선택된 인물의 값을 적용할 수 있도록 코드 변경해두어야함
  const moveFunc = () => {
    navigate('/isanyonemore', {
      state: {
        wholeImg: originalImg,
        canvasData: location.state.canvasData,
        faceData: location.state.faceData,
        savedFriendData: [
          ...location.state.savedFriendData,
          {
            name: '유진',
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
        <Upper>
          <Num>사진 속 친구</Num>를 선택해주세요.
        </Upper>
        <Container>
          {friendsList.map((friend, index) => (
            <Friend onClick={moveFunc} key={index}>
              <FriendPic>
                <img
                  src={`../../dummy/${friend.faceImg}`}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '100%',
                  }}
                />
              </FriendPic>
              <Name>{friend.name}</Name>
            </Friend>
          ))}
        </Container>
        <BtnContainer></BtnContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default SelectFriend;
