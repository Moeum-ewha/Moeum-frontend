import styled from 'styled-components';
import React, { useEffect, useState, forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

//components
import { NavBar, NavBtn } from '../Components/NavBar';
import BackgroundContainer from '../Components/BackgroundContainer';
import Main from '../Components/Main';
import {
  SmallerTitle,
  TxtBox,
  TextArea,
  FContainer,
  Friend,
  FriendPic,
  Name,
} from '../Components/postingComponents';
import { TopBar, Title } from '../Components/TopBar';

//assets
import BackIcon from '../Assets/icons/goback.png';
import dummy2 from '../Assets/yujin2.jpeg';
import dummy3 from '../Assets/hyejoon2.jpeg';
import dummy4 from '../Assets/unknown.jpeg';

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

const ArraytoString = (friendData) => {
  return friendData.map((friend) => friend.name).join(',');
};

export const WritePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const faces = [];

  //wholeImg, newFriendData(name, faceImg), savedFriendData(name)을 인자값으로 받음
  //newFriendData와 savedFriendData를 화면에 map하면서 돌려서 출력 -> 완료
  //원본사진, 새로운친구의 faceImg를 blob 파일로 바꾸기
  //게시글 작성과 동시에 original: file1, faces: [file2, file3], newFriendNames: "yunsun,youngwoo", oldFriendNames: "건희,진영"를 서버로 전송
  //이름의 경우 배열이 아닌 string으로, ','간에 공백 있으면 안됨

  //newFriendData의 값을 친구 목록 리스트에 저장 -> 각 인물 게시글 db에 원본사진 추가
  //savedFriendData 값에 존재하는 친구들의 각 인물 게시글 db에 원본사진 추가

  //배열 입력 시 - 하나의 필드값만 추출하여 배열 생성 - 해당 배열의 모든 값을 comma 기준 string으로 생성하여 주는 함수 생성
  //savedFriendData에서 이름만 추출하여 oldFriendNames string 생성
  //newFriendData에서 이름만 추출하여 newFriendNames string 생성
  //newFriendData에서 이미지만 추출하여 faces 배열 생성

  const imgURL = location.state.wholeImg;
  const savedFriendData = location.state.savedFriendData;
  const newFriendData = location.state.newFriendData;

  //원본사진을 blob파일로 바꾸기
  const orginalImgBlob = dataURItoBlob(imgURL);

  //새로운 친구들의 얼굴 사진만을 담은 faces 배열
  newFriendData.forEach((friend) => {
    const blob = dataURItoBlob(friend.faceImg);
    faces.push(blob);
  });

  const oldFriendNames = ArraytoString(savedFriendData);
  const newFriendNames = ArraytoString(newFriendData);

  const formData = new FormData();
  formData.append('originalImg', orginalImgBlob);
  formData.append('faces', faces);
  formData.append('newFriendNames', newFriendNames);
  formData.append('originalImg', oldFriendNames);

  const entries = formData.values();
  let entry = entries.next();
  console.log(entry);

  //날짜
  const [startDate, setStartDate] = useState(new Date());

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  //위치
  const [keyword, setKeyword] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // 엔터 키가 눌렸을 때 검색 실행
      searchLocation();
    }
  };

  const searchLocation = async () => {
    const inputValue = keyword.trim();

    // 입력값이 비어있으면 빈 좌표값으로 설정
    if (!inputValue) {
      setCoordinates(null);
      return;
    }
    try {
      // Kakao API를 사용하여 장소 검색
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword`,
        {
          headers: {
            Authorization: `KakaoAK 2adcff2adbb8ed5a2231575d1e2bc715`,
          },
          params: {
            query: inputValue,
          },
        },
      );
      // 검색 결과에서 첫 번째 장소의 좌표를 가져옴
      if (response.data.documents.length > 0) {
        const firstPlace = response.data.documents[0];
        setCoordinates({
          x: firstPlace.x,
          y: firstPlace.y,
        });
      } else {
        // 검색 결과가 없을 경우 좌표값을 null로 설정
        setCoordinates(null);
      }
    } catch (error) {
      console.error('장소 검색 중 오류 발생:', error);
    }
  };

  const [text, setText] = useState('');

  return (
    <BackgroundContainer>
      <TopBar>
        <NavBtn>
          <img
            src={BackIcon}
            alt="뒤로가기"
            style={{ paddingTop: '90px', marginLeft: '-110px' }}
          />
        </NavBtn>
        <Title>네컷 등록</Title>
      </TopBar>
      <MiniContainer>
        <img
          src={imgURL}
          style={{
            position: 'relative',
            width: 250,
            paddingTop: '300px',
            borderRadius: '10px',
          }}
          alt="선택한 이미지"
        />
        <SmallerTitle>When</SmallerTitle>
        <DatePicker
          shouldCloseOnSelect
          locale={ko}
          dateFormat="yyyy. MM. dd"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          customInput={<ExampleCustomInput />}
        />
        <SmallerTitle>Where</SmallerTitle>
        <TxtBox
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="장소를 검색하세요"
        ></TxtBox>
        {coordinates && (
          <div>
            <p>검색된 장소의 좌표:</p>
            <p>X: {coordinates.x}</p>
            <p>Y: {coordinates.y}</p>
          </div>
        )}
        <SmallerTitle>Whom</SmallerTitle>
        <FContainer>
          <Friend>
            <FriendPic>
              <img
                src={dummy2}
                style={{ width: '50px', height: '50px', borderRadius: '100%' }}
              />
            </FriendPic>
            <Name>유진</Name>
          </Friend>
          {savedFriendData.map((friend, index) => (
            <Friend key={index}>
              <FriendPic>
                <img
                  src={friend.faceImg}
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
          {newFriendData.map((friend, index) => (
            <Friend key={index}>
              <FriendPic>
                <img
                  src={friend.faceImg}
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
        </FContainer>
        <SmallerTitle>What</SmallerTitle>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="내용을 입력해주세요"
        />
      </MiniContainer>
      <PaddingContainer />
      <NavBar
        when={startDate.toLocaleDateString()}
        where={keyword}
        what={text}
        wholeImg={imgURL}
      />
    </BackgroundContainer>
  );
};

export default WritePost;

export const MiniContainer = styled(Main)`
  width: 80%;
  display: flex;
  height: calc(100vh-140px);
  justify-content: center;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  padding-top: 30px;
`;

export const PaddingContainer = styled.div`
  width: 100%;
  height: 200px;
`;
