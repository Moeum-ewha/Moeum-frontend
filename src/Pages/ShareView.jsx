import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

//components
import { NavBar, NavBtn, CenterBtn } from '../Components/NavBar';
import BackgroundContainer from '../Components/BackgroundContainer';
import { Loading } from './Loading';
import Main from '../Components/Main';
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
import {CommentSection, Comments, Comment, CommentInputContainer, CommentInput, CommentButton, ProfilePicture, Nickname, CommentContent, CommentDate, CommentContents } from '../Components/Comment'
import demo from '../../public/dummy/dummy.json';

//assets
import BackIcon from '../Assets/icons/goback.png';
import arrow from '../Assets/icons/arrow.png'

export const ShareView = () => {
  const { postId } = useParams(); // URL에서 postId 가져오기

  const postData = demo.userList
  .flatMap(user => user.postList) // 모든 유저의 postList를 하나의 배열로 합침
  .find(post => post.id === parseInt(postId)); // postId와 일치하는 포스트 찾음

  const location = useLocation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(null);

  const postIds = demo.userList.map(post => post.id);
  const commentList = demo.userList.flatMap(user => 
    user.postList.filter(post => postIds.includes(post.id))
    .flatMap(post => post.commentList));

  const addComment = () => {
    if (newComment.trim() !== '') {
      const nicknames = ["수줍은 토끼", "감기걸린 토끼", "졸린 토끼", "할로윈 토끼", "왹져 토끼", "수줍은 거북이", "감기걸린 거북이", "졸린 거북이", "할로윈 거북이", "왹져 거북이", "수줍은 강아지", "감기걸린 강아지", "졸린 강아지", "할로윈 강아지", "왹져 강아지", "수줍은 고양이", "감기걸린 고양이", "졸린 고양이", "할로윈 고양이", "왹져 고양이", "수줍은 판다", "감기걸린 판다", "졸린 판다", "할로윈 판다", "왹져 판다" ];
      const profilePictures = ['../../public/profileImg/0.png', '../../public/profileImg/1.png','../../public/profileImg/2.png','../../public/profileImg/3.png','../../public/profileImg/4.png','../../public/profileImg/5.png','../../public/profileImg/6.png','../../public/profileImg/7.png','../../public/profileImg/8.png','../../public/profileImg/9.png','../../public/profileImg/10.png','../../public/profileImg/11.png','../../public/profileImg/12.png','../../public/profileImg/13.png','../../public/profileImg/14.png','../../public/profileImg/15.png','../../public/profileImg/16.png','../../public/profileImg/17.png','../../public/profileImg/18.png','../../public/profileImg/19.png','../../public/profileImg/20.png','../../public/profileImg/21.png','../../public/profileImg/22.png','../../public/profileImg/23.png','../../public/profileImg/24.png', ];

      const randomIndex = Math.floor(Math.random() * nicknames.length);
      const randomNickname = nicknames[randomIndex];
      const randomProfilePicture = profilePictures[randomIndex];

      const newCommentObject = {
          content: newComment,
          profilePicture: randomProfilePicture, // 여기에 프로필 사진 URL을 넣어주세요
          nickname: randomNickname, // 여기에 사용자 닉네임을 넣어주세요
           //date: new Date(), // 현재 날짜 및 시간을 문자열로 사용
        };

      setComments([...comments, newCommentObject]);
      setNewComment('');
    }
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
                            }).join(', ')}{'('}이{')'}랑{' '}{postData.location}에서</SecondaryTitle>
              <Text>{postData.content}</Text>
              <Date>{postData.date}</Date>
            </MiniContainer>
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
            {comments.map((comment, index) => (
        <Comment key={index}>
          <ProfilePicture alt="프로필 사진" >
           <img src={comment.profilePicture} width ="30px"/>
          </ProfilePicture>
          <CommentContents>
            <Nickname>{comment.nickname}</Nickname>
            <CommentContent>{comment.content}</CommentContent>
            <CommentDate>{comment.date}</CommentDate>
          </CommentContents>
        </Comment>
      ))}
          </Comments>
          <CommentInputContainer>
            <CommentInput
              placeholder="댓글을 입력하세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <CommentButton onClick={addComment}>
              <img src={arrow} width = "65%"></img>
            </CommentButton>
          </CommentInputContainer>
        </CommentSection>
          </Content>
      </BackgroundContainer>
  )
}

export default ShareView;
