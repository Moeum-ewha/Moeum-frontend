import React, { useEffect } from "react";

import BackgroundContainer from "../Components/BackgroundContainer";
import { TopBar, Title, Content, MapDiv, MoeumDiv, Moeum, Photo, Info, Date, Place, Friends, Dday, } from "../Components/MapComponents";
import { NavBar } from "../Components/NavBar";

import dummy1 from '../Assets/dummy3.jpeg';
import dummy2 from '../Assets/dummy4.jpeg';

const Map = () => {
    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f105135f49e581605fbe90ab15560672&autoload=false`
        document.head.appendChild(kakaoMapScript)
      
        const onLoadKakaoAPI = () => {
          window.kakao.maps.load(() => {
            var container = document.getElementById('map')
            var options = {
              center: new window.kakao.maps.LatLng(37.56251226575099, 126.9476410626484),
              level: 6,
            }
      
            var map = new window.kakao.maps.Map(container, options)
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
            <MapDiv id="map" style= {{width:'100vw', height:'70vh'}}>
            </MapDiv>
            <MoeumDiv>
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
                            2023. 05. 11
                        </Date>
                        <Place>
                            이화여대길 52
                        </Place>
                        <Friends>
                            서은, 루리, 민정 언니
                        </Friends>
                        <Dday>
                            만난 지 78일 +
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
                            2023. 05. 11
                        </Date>
                        <Place>
                            이화여대길 52
                        </Place>
                        <Friends>
                            서은, 루리, 민정 언니
                        </Friends>
                        <Dday>
                            만난 지 78일 +
                        </Dday>
                    </Info>
                </Moeum>
            </MoeumDiv>
            </Content>
            <NavBar />
      </BackgroundContainer>
    );
};

export default Map;