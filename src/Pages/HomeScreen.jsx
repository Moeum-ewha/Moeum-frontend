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

  /*try {
    // Send API request
    const response = await axios.request({
      method: 'get',
      url: '/posts',
      withCredentials: true,
    });

    console.log(response);
    console.log(response.status);
    console.log(response.data);
    console.log(response.header);
  } catch (error) {
    console.error(error);
  }*/

  if (location.state) {
    useEffect(() => {
      console.log(location.state);
    }, []);

    console.log(location.state.date);
  }
  const postOnClick = (index) => {
    const postData = postList[index];
    navigate(`/viewpost/${postData.id}`, { state: { postData } });
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
