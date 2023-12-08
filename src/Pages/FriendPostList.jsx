import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackgroundContainer from '../Components/BackgroundContainer';
import balloon from '../Assets/balloon.png';
import Logo from '../Assets/logo.png';
import {
  TopBar,
  FriendTitle,
  Alert,
  Balloon,
  Text,
  LogoC,
  Content,
  Gallery,
  Photo,
} from '../Components/HomeComponents';
import { NavBar } from '../Components/NavBar';
import { Back2 } from '../Components/TopBar';
import axios, { AxiosError } from 'axios';
import Loading from './Loading';

const FriendPostList = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [postlist, setPostlist] = useState([]);
  const [friend, setFriend] = useState();
  const [pd, setpd] = useState('');
  const { id, friendName } = useParams();

  const sendApi = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `/friend/${id}`,
        withCredentials: true,
      });
      console.log(response.data);

      setFriend(response.data.friend);
      setPostlist(response.data.friend.posts);
      console.log(response.status);
      console.log(response.data);
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
    } finally {
      setLoading(false);
    }
  };

  const imgApi = async () => {
    try {
      const newPostlist = await Promise.all(
        postlist.map(async (post) => {
          const response = await axios({
            method: 'GET',
            url: `/images/${post.imgPath}`,
            withCredentials: true,
            responseType: 'blob',
          });
          console.log(response.status);
          const blobUrl = URL.createObjectURL(new Blob([response.data]));
          return { ...post, imgPath: blobUrl };
        }),
      );

      setpd(newPostlist);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(pd);

  useEffect(() => {
    const fetchData = async () => {
      await sendApi();
      await imgApi();
    };

    fetchData();
  }, []);

  useEffect(() => {
    imgApi();
  }, [postlist]);

  const postOnClick = (id) => {
    navigate(`/viewpost/${id}`);
  };

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Back2 />
          {friend && <FriendTitle>{friend.friendName}</FriendTitle>}
          <Alert>
            <Balloon>
              <img src={balloon} alt="말풍선" />
            </Balloon>
            {friend && (
              <Text>{friend.friendName}님과 네컷을 찍은 지 26일 째에요!</Text>
            )}
            <LogoC>
              <img src={Logo} alt="로고" width="50px" height="50px" />
            </LogoC>
          </Alert>
        </TopBar>
        <Gallery>
          {!loading && pd !== '' ? (
            pd.map((post) => (
              <Photo onClick={() => postOnClick(post.id)} key={post.id}>
                <img
                  src={post.imgPath}
                  width="160px"
                  style={{ borderRadius: '15px' }}
                />
              </Photo>
            ))
          ) : (
            <Loading />
          )}
        </Gallery>
      </Content>
      <NavBar />
    </BackgroundContainer>
  );
};

export default FriendPostList;
