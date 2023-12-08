import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackgroundContainer from '../Components/BackgroundContainer';
import balloon from '../Assets/balloon.png';
import Logo from '../Assets/logo.png';
import {
  TopBar,
  Title,
  Alert,
  Balloon,
  Text,
  LogoC,
  Content,
  Gallery,
  Photo,
  Left,
  Right,
} from '../Components/HomeComponents';
import { NavBar } from '../Components/NavBar';
import axios, { AxiosError } from 'axios';
import Loading from './Loading';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [postlist, setPostlist] = useState();
  const [pd, setpd] = useState('');
  const [name, setName] = useState('');

  const sendApi = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `/posts`,
        withCredentials: true,
      });
      setPostlist(response.data.posts);
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

  const latestPostApi = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/latest`,
        withCredentials: true,
      });

      console.log(response.status);
      setName(response.data.post.friends[0].friendName);
      console.log(response.data.post.friends[0].friendName);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await sendApi();
      await imgApi();
      await latestPostApi();
    };

    fetchData();
  }, []);

  useEffect(() => {
    imgApi();
  }, [postlist]);

  if (location.state) {
    useEffect(() => {
      console.log(location.state);
    }, []);

    console.log(location.state.date);
  }
  const postOnClick = (index) => {
    navigate(`/viewpost/${index}`);
  };

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Title style={{ marginLeft: '10px' }}>Moeum</Title>
          <Alert>
            <Balloon>
              <img src={balloon} alt="말풍선" />
            </Balloon>
            <Text>{name}님과 네컷을 찍은 지 21일 째에요!</Text>
            <LogoC>
              <img src={Logo} alt="로고" width="50px" height="50px" />
            </LogoC>
          </Alert>
        </TopBar>
        <Gallery>
          {!loading && pd !== '' ? (
            pd.reverse().map((post) => (
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

export default HomeScreen;
