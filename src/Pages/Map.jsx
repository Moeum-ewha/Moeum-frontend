
import React, { useEffect, useState } from 'react';


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

import demo from '../../public/dummy/newdummy.json';
import useCurrentLocation from '../hooks/useGeoLocation';
import Spinner from '../Assets/Spinner.gif';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 60 * 1,
  maximumAge: 1000 * 3600 * 24,
};

const Map = () => {
  const postList = demo.userList.map((user) => user.postList).flat();
  const [currentLoc, setCurrentLoc] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  const { location, error: currentError } =
    useCurrentLocation(geolocationOptions);

  useEffect(() => {
    if (location && location.latitude && location.longitude) {
      setCurrentLoc({
        x: location.latitude || 37.552914,
        y: location.longitude || 126.942011,
      });
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f105135f49e581605fbe90ab15560672&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById('map'); //지도를 표시할 div

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
  }, [currentLoc, postList]);

  const postOnClick = (index) => {
    const postData = postList[index];
    navigate(`/viewpost/${postData.id}`, { state: { postData } });
  };

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
          <MapDiv id="map" style={{ width: '100vw', height: '70vh' }} />
        )}
        <MoeumDiv
          style={{
            overflowY: 'auto', // Y축 스크롤이 필요한 경우만 스크롤을 표시합니다.
            maxHeight: '50vh', // MoeumDiv의 최대 높이를 조절합니다.
          }}
        >
          {postList.map((post, index) => (
            <Moeum key={post.id} onClick={() => postOnClick(index)}>
              <Photo>
                <img
                  src={`../../dummy/${post.original}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              </Photo>
              <Info>
                <Date>{post.date}</Date>
                <Place>{post.location}</Place>
                <Friends>
                  {post.friendId
                    .map((friendId) => {
                      const friend = demo.userList
                        .flatMap((user) => user.friendsList)
                        .find((friend) => friend.id === friendId);
                      return friend ? friend.name : '';
                    })
                    .join(', ')}
                </Friends>
                <Dday></Dday>
              </Info>
            </Moeum>
          ))}
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
