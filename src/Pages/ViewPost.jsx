import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

//components
import { NavBar, NavBtn, CenterBtn } from '../Components/NavBar';
import BackgroundContainer from '../Components/BackgroundContainer';
import { TopBar, Title, Back } from '../Components/TopBar';
import {
  Content,
  ContentContainer,
  MiniContainer,
  ImgContainer,
  SecondaryTitle,
  ShareBtn,
  Text,
  Date,
  Delete,
} from '../Components/viewingComponents';
import {
  ModalBack,
  ModalBox,
  YesButton,
  NoButton,
  ModalContent,
  Alert,
  BtnDiv,
} from '../Components/PopupModal';
import {
  CommentSection,
  Comments,
  Comment,
  CommentInputContainer,
  CommentInput,
  CommentButton,
  ProfilePicture,
  Nickname,
  CommentContent,
  CommentDate,
  CommentContents,
} from '../Components/Comment';
import demo from '../../public/dummy/dummy.json';

//assets
import BackIcon from '../Assets/icons/goback.png';
import insta from '../Assets/icons/Insta.png';

export const ViewPost = () => {
  const location = useLocation();

  const { postId } = useParams();

  const postIds = demo.userList.map((post) => post.id);
  const commentList = demo.userList.flatMap((user) =>
    user.postList
      .filter((post) => postIds.includes(post.id))
      .flatMap((post) => post.commentList),
  );

  let postData;

  postData = location.state.postData;

  //const imgURL = location.state.wholeImg;

  let nowUrl = window.location.href;

  const copyUrl = () => {
    // "viewpost"를 "share"로 변경
    const modifiedUrl = nowUrl.replace('/viewpost/', '/share/');

    // 수정된 URL을 클립보드에 복사
    navigator.clipboard.writeText(modifiedUrl).then((res) => {
      alert('주소가 복사되었습니다!');
    });
  };

  const modalBackground = useRef();

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const nicknames = [
    '수줍은 토끼',
    '감기걸린 토끼',
    '졸린 토끼',
    '할로윈 토끼',
    '왹져 토끼',
    '수줍은 거북이',
    '감기걸린 거북이',
    '졸린 거북이',
    '할로윈 거북이',
    '왹져 거북이',
    '수줍은 강아지',
    '감기걸린 강아지',
    '졸린 강아지',
    '할로윈 강아지',
    '왹져 강아지',
    '수줍은 고양이',
    '감기걸린 고양이',
    '졸린 고양이',
    '할로윈 고양이',
    '왹져 고양이',
    '수줍은 판다',
    '감기걸린 판다',
    '졸린 판다',
    '할로윈 판다',
    '왹져 판다',
  ];
  const profilePictures = [
    '../../public/profileImg/0.png',
    '../../public/profileImg/1.png',
    '../../public/profileImg/2.png',
    '../../public/profileImg/3.png',
    '../../public/profileImg/4.png',
    '../../public/profileImg/5.png',
    '../../public/profileImg/6.png',
    '../../public/profileImg/7.png',
    '../../public/profileImg/8.png',
    '../../public/profileImg/9.png',
    '../../public/profileImg/10.png',
    '../../public/profileImg/11.png',
    '../../public/profileImg/12.png',
    '../../public/profileImg/13.png',
    '../../public/profileImg/14.png',
    '../../public/profileImg/15.png',
    '../../public/profileImg/16.png',
    '../../public/profileImg/17.png',
    '../../public/profileImg/18.png',
    '../../public/profileImg/19.png',
    '../../public/profileImg/20.png',
    '../../public/profileImg/21.png',
    '../../public/profileImg/22.png',
    '../../public/profileImg/23.png',
    '../../public/profileImg/24.png',
  ];

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Back />
          <Title>네컷 일기</Title>
        </TopBar>
        <ContentContainer>
          <MiniContainer>
            <ImgContainer>
              <img src={`../../dummy/${postData.original}`} width="100%" />
            </ImgContainer>
            <SecondaryTitle>
              {postData.friendId
                .map((friendId) => {
                  const friend = demo.userList
                    .flatMap((user) => user.friendsList)
                    .find((friend) => friend.id === friendId);
                  return friend ? friend.name : '';
                })
                .join(', ')}
              {'('}이{')'}랑 {postData.location}에서
            </SecondaryTitle>
            <ShareBtn>
              <img src={insta} alt="로고" onClick={copyUrl} />
            </ShareBtn>
            <Text>{postData.content}</Text>
            <Date>{postData.date}</Date>
          </MiniContainer>

          <Delete onClick={openModal}>삭제하기</Delete>
        </ContentContainer>
        <CommentSection>
          <Comments>
            {commentList.map((comment, index) => (
              <Comment key={comment.id}>
                <ProfilePicture alt="프로필 사진">
                  <img src={profilePictures[comment.name[0]]} width="30px" />
                </ProfilePicture>
                <CommentContents>
                  <Nickname>{nicknames[comment.name[0]]}</Nickname>
                  <CommentContent>{comment.content}</CommentContent>
                  <CommentDate>{comment.date}</CommentDate>
                </CommentContents>
              </Comment>
            ))}
          </Comments>
        </CommentSection>
      </Content>
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
            <ModalContent>
              <Alert>정말로 삭제하시겠습니까?</Alert>
              <BtnDiv>
                <YesButton>네</YesButton>
                <NoButton>아니오</NoButton>
              </BtnDiv>
            </ModalContent>
          </ModalBox>
        </ModalBack>
      )}
      {postId === '10' ? (
        <NavBar
          date={date}
          where={picLocation}
          content={content}
          original={original}
          savedFriendData={savedFriendData}
          newFriendData={newFriendData}
        />
      ) : (
        <NavBar />
      )}
    </BackgroundContainer>
  );
};

export default ViewPost;
