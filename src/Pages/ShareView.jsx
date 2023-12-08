import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import BackgroundContainer from '../Components/BackgroundContainer';
import { Loading } from './Loading';
import { TopBar, Title, Back } from '../Components/TopBar';
import {
  Content,
  ContentContainer,
  MiniContainer,
  ImgContainer,
  SecondaryTitle,
  Text,
  Date,
} from '../Components/viewingComponents';
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

//assets
import arrow from '../Assets/icons/arrow.png';

export const ShareView = () => {
  const { postId } = useParams(); // URL에서 postId 가져오기
  const [loading, setLoading] = useState(true);
  const postRef = useRef({ current: '' });
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(null);
  const commentRef = useRef();

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
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/0.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/1.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/2.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/3.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/4.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/5.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/6.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/7.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/8.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/9.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/10.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/11.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/12.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/13.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/14.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/15.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/16.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/17.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/18.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/19.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/20.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/21.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/22.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/23.png?raw=true',
    'https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/profileImg/24.png?raw=true',
  ];

  const addComment = async () => {
    if (newComment.trim() !== '') {
      const randomIndex = Math.floor(Math.random() * nicknames.length);
      const randomNickname = nicknames[randomIndex];
      const randomProfilePicture = profilePictures[randomIndex];

      const newCommentObject = {
        content: newComment,
        profilePicture: randomProfilePicture,
        nickname: randomNickname,
      };
      const body = {
        profile: randomIndex,
        content: newComment,
      };
      console.log(body);
      setComments([...comments, newCommentObject]);
      setNewComment('');

      try {
        const response = await axios({
          method: 'POST',
          data: body,
          url: `/post/${postId}/comment`,
          withCredentials: true,
        });
        console.log('sendApi = ' + response.status);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
          } else if (error.request) {
            console.error(error.request);
          }
        } else {
          console.error(error);
        }
      }
    }
  };

  const sendApi = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/post/${postId}`,
        withCredentials: true,
      });
      postRef.current = response.data.post;
      console.log('sendApi = ' + response.status);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(error.response.status);
          console.error(error.response.data);
        } else if (error.request) {
          console.error(error.request);
        }
      } else {
        console.error(error);
      }
    }
  };

  const imgApi = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/images/${postRef.current.imgPath}`,
        withCredentials: true,
        responseType: 'blob',
      });

      console.log('imgApi = ' + response.status);
      const blobUrl = URL.createObjectURL(new Blob([response.data]));

      postRef.current = { ...postRef.current, imgPath: blobUrl };
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await sendApi();
      await imgApi();
    };

    fetchData();
  }, []);

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Title>네컷 일기</Title>
        </TopBar>
        {loading ? (
          <Loading />
        ) : (
          <>
            <ContentContainer>
              <MiniContainer>
                <ImgContainer>
                  <img src={postRef.current.imgPath} width="100%" />
                </ImgContainer>
                <SecondaryTitle>
                  {postRef.current.friends
                    .map((friend) => (friend ? `${friend.friendName}` : ''))
                    .join(', ')}
                  {'('}이{')'}랑 {postRef.current.location}에서
                </SecondaryTitle>
                <Text>{postRef.current.content}</Text>
                <Date>{postRef.current.takenAt}</Date>
              </MiniContainer>
            </ContentContainer>
            <CommentSection>
              <Comments>
                {postRef.current.comments.map((comment) => (
                  <Comment key={comment.id}>
                    <ProfilePicture alt="프로필 사진">
                      <img src={profilePictures[comment.id]} width="30px" />
                    </ProfilePicture>
                    <CommentContents>
                      <Nickname>{nicknames[comment.id]}</Nickname>
                      <CommentContent>{comment.content}</CommentContent>
                    </CommentContents>
                  </Comment>
                ))}
                {comments.map((comment, index) => (
                  <Comment key={index}>
                    <ProfilePicture alt="프로필 사진">
                      <img src={comment.profilePicture} width="30px" />
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
                  <img src={arrow} width="65%"></img>
                </CommentButton>
              </CommentInputContainer>
            </CommentSection>
          </>
        )}
      </Content>
    </BackgroundContainer>
  );
};

export default ShareView;
