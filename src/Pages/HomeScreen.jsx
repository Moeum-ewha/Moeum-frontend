import React, { useState, useEffect } from 'react';
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
import demo from '../../public/dummy/dummy.json';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const postList = demo.userList.map((user) => user.postList).flat();

  const movePost = () => {
    navigate('/viewpost');
  };

  if (location.state) {
    useEffect(() => {
      console.log(location.state);
    }, []);

    console.log(location.state.date);
  }
  const postOnClick = (index) => {
    if (index !== 5) {
      const postData = postList[index];
      navigate(`/viewpost/${postData.id}`, { state: { postData } });
    } else {
      navigate('/viewpost/5', {
        state: {
          date: location.state.date,
          location: location.state.location,
          original: location.state.original,
          content: location.state.content,
          savedFriendData: location.state.savedFriendData,
          newFriendData: location.state.newFriendData,
        },
      });
    }
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
            <Text>영우님과 네컷을 찍은 지 26일 째에요!</Text>
            <LogoC>
              <img src={Logo} alt="로고" width="50px" height="50px" />
            </LogoC>
          </Alert>
        </TopBar>
        <Gallery>
          {location.state && location.state.id !== null ? (
            <Photo onClick={() => postOnClick(id)}>
              <img
                src={location.state.original}
                width="160px"
                style={{ borderRadius: '15px' }}
                //onClick={movePost}
              />
            </Photo>
          ) : (
            <></>
          )}
          {postList.map((post, index) => (
            <Photo onClick={() => postOnClick(index)} key={post.id}>
              <img
                src={`../../dummy/${post.original}`}
                width="160px"
                style={{ borderRadius: '15px' }}
                //onClick={movePost}
              />
            </Photo>
          ))}
        </Gallery>
      </Content>
      <NavBar />
    </BackgroundContainer>
  );
};

export default HomeScreen;
