import styled from 'styled-components';
import React, { useEffect, useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";
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
import FaceReCog from './FaceRecog';

//assets
import BackIcon from '../Assets/icons/goback.png';
import dummy1 from '../Assets/dummy6.jpeg';
import dummy2 from "../Assets/yujin2.jpeg";
import dummy3 from "../Assets/hyejoon2.jpeg";
import dummy4 from "../Assets/unknown.jpeg";

export const WritePost = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [text, setText] = useState('');

  const dateOnChange = (e) => {
    setDate(e.target.value);
  };
  const textOnChange = (e) => {
    setText(e.target.value);
  };

  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

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
        }
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

  return (
    <BackgroundContainer>
      <TopBar>
        <NavBtn>
          <img src={BackIcon} alt="뒤로가기" style = {{paddingTop: '90px', marginLeft: '-110px'}} />
        </NavBtn>
        <Title>네컷 등록</Title>
      </TopBar>
      <MiniContainer>
        <img src={dummy1} width="90%" style={{ paddingTop: '300px', borderRadius: '10px' }} />
        <SmallerTitle>When</SmallerTitle>
        <TxtBox
onChange={dateOnChange}
          type="text"
          placeholder="ex) 2023. 05. 11"
        >
        </TxtBox> 
        <DatePicker
            locale={ko}
            dateFormat="yyyy. MM. dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput/>}
          />
        <SmallerTitle>Where</SmallerTitle>
        <TxtBox
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
  onKeyDown={handleKeyDown}
          type="text"
          placeholder="장소를 검색하세요"
          >
        </TxtBox>
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
                        <img src={dummy2} style={{width: "50px", height: "50px" , borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        유진
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy3} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        혜준
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy4} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        남준
                    </Name>
                </Friend>
                </FContainer>
        <SmallerTitle>What</SmallerTitle>
        <TextArea
          onChange={textOnChange}
          type="text"
          placeholder="내용을 입력해주세요"
        />
      </MiniContainer>
      <PaddingContainer />
      <NavBar when={date} where={location} what={text} />
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

