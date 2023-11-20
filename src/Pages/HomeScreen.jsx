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
import axios, { AxiosError } from 'axios';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const postList = demo.userList.map((user) => user.postList).flat();

  const sendApi = async () => {
    // Send 버튼 더블클릭 방지
    if (loading) return;

    setLoading(true);

    try {
      // Send API request
      const response = await axios({
        method: 'GET',
        url: `/posts?userId=${13}}`,
        withCredentials: true,
      });

      console.log(response);

      // 2XX status code
      console.log(response.status);
      console.log(response.data);

      // setResponse(response.data); // 서버로부터 받은 데이터를 response에 업데이트합니다.
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          // Non-2XX status code
          console.error(error.response.status);
          console.error(error.response.data);
        } else if (error.request) {
          // Request made, no response
          console.error(error.request);
        }
      } else {
        // Other unexpected error
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendApi(); // componentDidMount와 동일하게 첫 렌더링 시에 API를 호출합니다.
  }, []);

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
