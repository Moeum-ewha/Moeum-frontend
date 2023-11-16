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
import {CommentSection, Comments, Comment, CommentInputContainer, CommentInput, CommentButton, ProfilePicture, Nickname, CommentContent, CommentDate, CommentContents } from '../Components/Comment'
import demo from '../../public/dummy/dummy.json';

//assets
import BackIcon from '../Assets/icons/goback.png';
import insta from '../Assets/icons/Insta.png';

export const ViewPost = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const postIds = demo.userList.map(post => post.id);
  const commentList = demo.userList.flatMap(user => 
    user.postList.filter(post => postIds.includes(post.id))
    .flatMap(post => post.commentList));

  const postData = location.state.postData;

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

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Back>
            <img src={BackIcon} alt="뒤로가기" />
          </Back>
          <Title>네컷 일기</Title>
        </TopBar>
        <ContentContainer>
          <MiniContainer>
            <ImgContainer>
              <img src={`../../dummy/${postData.original}`} width="100%" />
            </ImgContainer>
            <SecondaryTitle>{postData.friendId.map(friendId => {
                                const friend = demo.userList.flatMap(user => user.friendsList)
                                    .find(friend => friend.id === friendId);
                                return friend ? friend.name : '';
                            }).join(', ')}{'('}이{')'}랑{' '}{postData.location}에서
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
          <ProfilePicture alt="프로필 사진" >
           <img src={comment.profilePicture} width ="30px"/>
          </ProfilePicture>
          <CommentContents>
            <Nickname>{comment.name}</Nickname>
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
      <NavBar />
    </BackgroundContainer>
  );
};

export default ViewPost;
