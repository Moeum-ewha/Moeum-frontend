import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Upper,
  Num,
  BtnContainer,
  Friend,
  FriendPic,
  Name,
  Container,
} from '../Components/NumofPeople';

const SelectFriend = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [friendlist, setFriendlist] = useState();
  const [fd, setfd] = useState([]);

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else byteString = decodeURIComponent(dataURI.split(',')[1]);

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  const croppedFaceDataURL = location.state.faceImg;
  const originalImg = location.state.wholeImg;
  const imgURL = location.state.wholeImg;
  const orginalImgBlob = dataURItoBlob(imgURL);

  const moveFunc = (friendName) => {
    navigate('/isanyonemore', {
      state: {
        wholeImg: originalImg,
        canvasData: location.state.canvasData,
        faceData: location.state.faceData,
        faceIndex: location.state.faceIndex,
        savedFriendData: [
          ...location.state.savedFriendData,
          {
            name: friendName,
            faceImg: croppedFaceDataURL,
          },
        ],
        newFriendData: location.state.newFriendData,
      },
    });
  };

  const sendApi = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `/friends`,
        withCredentials: true,
      });

      setFriendlist(response.data.friends);

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
    }
  };

  const imgApi = async () => {
    try {
      const newFriendlist = await Promise.all(
        friendlist.map(async (friend) => {
          const response = await axios({
            method: 'GET',
            url: `/images/${friend.imgPath}`,
            withCredentials: true,
            responseType: 'blob',
          });

          console.log(response.status);

          const blobUrl = URL.createObjectURL(new Blob([response.data]));

          return { ...friend, imgPath: blobUrl };
        }),
      );

      setfd(newFriendlist);
    } catch (error) {
      // 오류 처리
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFriend = async () => {
      await sendApi();
      await imgApi();
    };
    fetchFriend();
  }, []);

  useEffect(() => {
    imgApi();
  }, [friendlist]);

  return (
    <BackgroundContainer>
      <Content>
        <Upper>
          <Num>사진 속 친구</Num>를 선택해주세요.
        </Upper>
        <Container>
          {fd.map((friend) => (
            <Friend onClick={() => moveFunc(friend.friendName)} key={friend.id}>
              <FriendPic>
                <img
                  src={friend.imgPath}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '100%',
                  }}
                />
              </FriendPic>
              <Name>{friend.friendName}</Name>
            </Friend>
          ))}
        </Container>
        <BtnContainer></BtnContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default SelectFriend;
