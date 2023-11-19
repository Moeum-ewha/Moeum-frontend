import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';

import home from '../Assets/icons/home.png';
import map from '../Assets/icons/map.png';
import friends from '../Assets/icons/friends.png';
import settings from '../Assets/icons/settings.png';
import plus from '../Assets/icons/plus.png';
import check from '../Assets/icons/check.png';

import { ModalBack, ModalBox, ModalBtn, ExitBtn } from './PhotoModal';

export const NavBar = (props) => {
  const modalBackground = useRef();
  const fileInput = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [modalOpen, setModalOpen] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const isPostingPage = currentPath === '/posting';

  /*{
    "content": "야호 신난다!",
    "takenAt": "2023. 11. 15",  // 타입 string
    "location": "북카페 파오",
    "latitude": "37.558",  // 카카오맵에서 주는대로.. 
    "longitude": "126.946",
  ================ 아래는 formdata (테스팅할 땐 body로 넣음) ================
    "original": file1,  // 원본 네컷사진
    "faces": [file2(윤선얼굴), file3(진영얼굴)],  // 새로 등록하는 친구들의 잘린 얼굴 파일들 0~3개
    "newFriendNames": "윤선,진영",  // 새로 등록하는 친구들의 이름들 (faces랑 순서 같아야 함, 당연히 갯수도 같음)
    "oldFriendNames": "건희"  // 이전에 등록했었던 친구들의 이름들
  }*/

  const writePost = async (props) => {
    const formData = new FormData();
    const content = props.content;
    const takenAt = props.takenAt;
    const postingLocation = props.location;
    const latitude = props.latitude;
    const longitude = props.longitude;
    //const formData = props.formData;
    const original = props.original;
    const faces = props.faces;
    const newFriendNames = props.newFriendNames;
    const oldFriendNames = props.oldFriendNames;

    formData.append('content', content);
    formData.append('takenAt', '2023-11-17');
    formData.append('location', postingLocation);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('original', original);
    formData.append('faces', faces);
    formData.append('newFriendNames', newFriendNames);
    formData.append('oldFriendNames', oldFriendNames);

    const entriesArray = [...formData.entries()];
    console.log(entriesArray);
    //console.log(props);

    if (isApiLoading) return;

    setIsApiLoading(true);

    const body = {
      content: content,
      takenAt: '2023-11-16',
      location: postingLocation,
      latitude: latitude,
      longitude: longitude,
      formData: formData,
      original: original,
      faces: faces,
      newFriendNames: newFriendNames,
      oldFriendNames: oldFriendNames,
    };
    try {
      // Send API request
      const response = await fetch(
        'http://ec2-15-164-103-67.ap-northeast-2.compute.amazonaws.com:5000/posts',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      );
      const data = await response.json(); // JSON 형태의 응답을 받는 경우
      console.log(data);

      //viewpost로 가는 함수 작성하기

      console.log(response);
      console.log(response.status);
      console.log(response.data);
      console.log(response.header);
    } catch (error) {
      console.error(error);
    } finally {
      setIsApiLoading(false);
    }
  };

  const moveHome = () => {
    navigate('/home');
  };

  const moveBinder = () => {
    navigate('/binder');
  };

  const moveMypage = () => {
    navigate('/settings');
  };

  const moveMap = () => {
    navigate('/map');
  };

  /*const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event.target.result);
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };*/

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      navigate('/facerecognition', { state: { img: selectedFile } });
      /*onImageSelect(selectedFile);*/
    }
  };

  const fileUpload = () => {
    // input 요소 클릭
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <>
      <>
        {modalOpen && (
          <ModalBack
            ref={modalBackground}
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                setModalOpen(false);
              }
            }}
          >
            <ModalBox>
              <ModalBtnTop>카메라</ModalBtnTop>
              <ModalBtn onClick={fileUpload}>사진 보관함</ModalBtn>
              <input
                type="file"
                ref={fileInput}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
                id="imageUpload"
              />
            </ModalBox>
            <ExitBtn onClick={() => setModalOpen(false)}>취소</ExitBtn>
          </ModalBack>
        )}
      </>
      <NavigationBar>
        <NavBtn>
          <img src={home} alt="로고" onClick={moveHome} />
        </NavBtn>
        <NavBtn>
          <img src={friends} alt="로고" onClick={moveBinder} />
        </NavBtn>
        {isPostingPage ? (
          <CenterBtn onClick={() => writePost(props)}>
            <img src={check} alt="작성버튼" />
          </CenterBtn>
        ) : (
          <CenterBtn onClick={() => setModalOpen(true)}>
            <img src={plus} alt="추가 버튼" />
          </CenterBtn>
        )}
        <NavBtn />
        <NavBtn>
          <img src={map} alt="로고" onClick={moveMap} />
        </NavBtn>
        <NavBtn>
          <img src={settings} alt="로고" onClick={moveMypage} />
        </NavBtn>
      </NavigationBar>
    </>
  );
};

export const NavigationBar = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  height: 94px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.07);
  background: white;
  position: fixed;
  z-index: 1;
  padding: 0 10px;
`;
export const NavBtn = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  display: flex;
  align-items: center;
  border: none;
  padding: 0px;
  position: relative;
  z-index: 1000;
`;

export const CenterBtn = styled.button`
  position: fixed;
  bottom: 60px;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: #ffc329;
  z-index: 2;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
`;

// export const PlusBtn = styled.button`
//   width: 30px;
//   height: 30px;
//   background: transparent;
//   display: flex;
//   align-items: center;
//   align-content: center;
//   border: none;
//   margin: 0px 0px 0px 0px;
//   padding: 0px;
//   position: relative;
//   z-index: 1000;
// `;

export const ModalBtnTop = styled(ModalBtn)`
  //왜인지 모르겠으나 적용이 안댐..
  border-bottom: 1px #dddddd;
`;
