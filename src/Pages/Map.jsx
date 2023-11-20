import React, { useEffect, useState, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import BackgroundContainer from '../Components/BackgroundContainer';
import {
  TopBar,
  Title,
  Content,
  MapDiv,
  MoeumDiv,
  Moeum,
  Photo,
  Info,
  Date,
  Place,
  Friends,
  Dday,
} from '../Components/MapComponents';
import { NavBar } from '../Components/NavBar';
import useCurrentLocation from '../hooks/useGeoLocation';
import Spinner from '../Assets/Spinner.gif';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1,
  maximumAge: 1000 * 3600 * 24,
};
const Map = () => {
  const [postList, setPostList] = useState([]);
  const [currentLoc, setCurrentLoc] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const postRef = useRef();

  const { location, error: currentError } =
    useCurrentLocation(geolocationOptions);

  const sendApi = async () => {
    if (postLoading === '시작') return;
    try {
      const response = await axios({
        method: 'GET',
        url: `/posts?userId=${13}`,
        withCredentials: true,
      });
      console.log(response.status);
      postRef.current = response.data.posts;
      await fetchPost();
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

  const fetchPost = async () => {
    console.log('fetch');
    //게시글 id 값만 추출한 배열
    if (postLoading === '시작') return;
    const postIdList = postRef.current.map((item) => item.id);
    try {
      postIdList.map(async (postID) => {
        const response = await axios({
          method: 'GET',
          url: `/post/${postID}?userId=${13}`,
          withCredentials: true,
        });
        const index = postIdList.findIndex((item) => item === postID);
        postRef.current[index] = response.data.post;
      }),
        console.log(postRef.current);

      postRef.current.map(async (post, index) => {
        const response = await axios({
          method: 'GET',
          url: `/images/${post.imgPath}`,
          withCredentials: true,
          responseType: 'blob',
        });
        console.log(response.status);
        const blobUrl = URL.createObjectURL(new Blob([response.data]));
        console.log('이전: ' + postRef.current[index].imgPath);
        console.log('이후 : ' + blobUrl);
        postRef.current[index].imgPath = blobUrl;
      });
      setPostLoading('시작');
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
        console.error(error);
      }
    }
  };

  /*const imgApi = async () => {
    if (postLoading === '시작') return;
    if (!postRef.current[0].imgPath.includes('.')) return;
    try {
      postRef.current.map(async (post, index) => {
        const response = await axios({
          method: 'GET',
          url: `/images/${post.imgPath}`,
          withCredentials: true,
          responseType: 'blob',
        });
        console.log(response.status);
        const blobUrl = URL.createObjectURL(new Blob([response.data]));
        console.log('이전: ' + postRef.current[index].imgPath);
        console.log('이후 : ' + blobUrl);
        postRef.current[index].imgPath = blobUrl;
      }),
        console.log(postRef.current);
    } catch (error) {
      console.error(error);
    } finally {
      setPostLoading('시작');
      console.log('끝');
    }
  };*/

  useEffect(() => {
    const fetchData = async () => {
      if (location && location.latitude && location.longitude) {
        setCurrentLoc({
          x: location.latitude || 37.552914,
          y: location.longitude || 126.942011,
        });
        setLoading(false);
      }
      await sendApi();
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    console.log('카카오맵');
    console.log(postRef.current);
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f105135f49e581605fbe90ab15560672&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById('map');

        if (container && currentLoc.x && currentLoc.y) {
          var options = {
            center: new window.kakao.maps.LatLng(currentLoc.x, currentLoc.y),
            level: 6,
          };

          const map = new window.kakao.maps.Map(container, options);

          var positions = postList.map((post) => ({
            title: post.date,
            latlng: new kakao.maps.LatLng(
              parseFloat(`${post.longitude}`),
              parseFloat(`${post.latitude}`),
            ),
          }));

          positions.forEach((position) => {
            var imageSrc =
              'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

            var imageSize = new kakao.maps.Size(24, 35);

            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            var marker = new kakao.maps.Marker({
              map: map,
              position: position.latlng,
              title: position.title,
              image: markerImage,
            });
          });
        }
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    document.head.appendChild(kakaoMapScript);

    return () => {
      document.head.removeChild(kakaoMapScript);
    };
  }, [currentLoc, postLoading]);

  return (
    <BackgroundContainer>
      <Content>
        <TopBar>
          <Title>지도</Title>
        </TopBar>
        {loading ? (
          <img
            src={Spinner}
            alt="로딩중"
            width="35%"
            style={{ marginTop: 60 }}
          />
        ) : (
          <MapDiv
            id="map"
            style={{ width: '100vw', height: '50vh', marginBottom: '30vh' }}
          />
        )}
        <MoeumDiv
          style={{
            overflowY: 'auto', // Y축 스크롤이 필요한 경우만 스크롤을 표시합니다.
            maxHeight: '50vh', // MoeumDiv의 최대 높이를 조절합니다.
          }}
        >
          {postLoading !== '시작' ? (
            <img
              src={Spinner}
              alt="로딩중"
              width="35%"
              style={{ marginTop: 60 }}
            />
          ) : (
            postRef.current.map((post) => (
              <Moeum key={post.id} onClick={() => postOnClick()}>
                <Photo>
                  <img
                    src={post.imgPath}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                </Photo>
                <Info>
                  <Date>{post.takenAt}</Date>
                  <Place>{post.location}</Place>

                  <Dday></Dday>
                </Info>
              </Moeum>
            ))
          )}

          <Moeum>
            <div style={{ width: '100vw', height: '6vh' }} />
          </Moeum>
        </MoeumDiv>
      </Content>
      <NavBar />
    </BackgroundContainer>
  );
};

export default Map;
