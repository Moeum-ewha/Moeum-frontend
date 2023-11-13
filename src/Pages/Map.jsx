import React, { useEffect } from "react";

import BackgroundContainer from "../Components/BackgroundContainer";
import { TopBar, Title, Content, MapDiv, MoeumDiv, Moeum, Photo, Info, Date, Place, Friends, Dday,} from "../Components/MapComponents";
import { NavBar } from "../Components/NavBar";

import dummy1 from '../Assets/dummy10.png';
import dummy2 from '../Assets/dummy11.png';

const Map = () => {
    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f105135f49e581605fbe90ab15560672&autoload=false`
        document.head.appendChild(kakaoMapScript)
      
        const onLoadKakaoAPI = () => {
          window.kakao.maps.load(() => {
            var container = document.getElementById('map') //지도를 표시할 div
            var options = {
              center: new window.kakao.maps.LatLng(37.552914, 126.942011), // 지도의 중심좌표
              level: 6, //지도의 확대 레벨
            }
      
            var map = new window.kakao.maps.Map(container, options) // 지도 생성

            var positions = [
                {
                    title: '10. 10', 
                    latlng: new kakao.maps.LatLng(37.562237, 126.947731)
                },
                {
                    title: '09. 22', 
                    latlng: new kakao.maps.LatLng(37.556677, 126.936576)
                },
            ];
            
            // 마커 이미지의 이미지 주소입니다
            var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
                
            for (var i = 0; i < positions.length; i ++) {
                
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new kakao.maps.Size(24, 35); 
                
                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                
                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: positions[i].latlng, // 마커를 표시할 위치
                    title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image : markerImage // 마커 이미지 
                });
            }
          })
        }
      
        kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
      }, [])

    return (
        <BackgroundContainer>
            <Content>
            <TopBar>
                <Title>
                    지도
                </Title>
            </TopBar>
            <MapDiv id="map" style= {{ width:'100vw', height:'70vh'}}>
            </MapDiv>
            <MoeumDiv style={{
            overflowY: 'auto', // Y축 스크롤이 필요한 경우만 스크롤을 표시합니다.
            maxHeight: '50vh', // MoeumDiv의 최대 높이를 조절합니다.
          }}>
                <Moeum>
                    <Photo>
                        <img src={dummy1} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '15px'}} />
                    </Photo>
                    <Info>
                        <Date>
                            2023. 10. 10
                        </Date>
                        <Place>
                            이화여대길 52
                        </Place>
                        <Friends>
                            건희, 진영
                        </Friends>
                        <Dday>
                            만난 지 20일 +
                        </Dday>
                    </Info>
                </Moeum>
                <Moeum>
                    <Photo>
                        <img src={dummy2} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px'}}/>
                    </Photo>
                    <Info>
                        <Date>
                            2023. 09. 22
                        </Date>
                        <Place>
                            연세로 13
                        </Place>
                        <Friends>
                            건희, 진영
                        </Friends>
                        <Dday>
                            만난 지 40일 +
                        </Dday>
                    </Info>
                </Moeum>
                <Moeum>
                    <Photo>
                        <img src={dummy2} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px'}}/>
                    </Photo>
                    <Info>
                        <Date>
                            2023. 09. 22
                        </Date>
                        <Place>
                            연세로 13
                        </Place>
                        <Friends>
                            건희, 진영
                        </Friends>
                        <Dday>
                            만난 지 40일 +
                        </Dday>
                    </Info>
                </Moeum>
                <Moeum>
                <div style = {{width: '100vw', height:'6vh'}}/>
                </Moeum>
            </MoeumDiv>
            </Content>
            <NavBar />
      </BackgroundContainer>
    );
};

export default Map;