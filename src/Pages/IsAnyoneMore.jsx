import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Question,
  Upper,
  Num,
  Down,
  PictureContainer,
  Pic,
  FaceBox,
  BtnContainer,
  YesBtn,
  NoBtn,
} from '../Components/NumofPeople';
import { Btn } from '../Components/ClassifiContainer';

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

const IsAnyoneMore = () => {
  const location = useLocation();
  const FaceContainer = useRef(null);
  const [loaded, setLoaded] = useState(true);

  const imgURL = location.state.wholeImg;
  const selectedFace = location.state.selectedFace;
  const canvasData = location.state.canvasData;

  const navigate = useNavigate();

  const upperClick = () => {
    navigate('/isnewfriend', {
      state: {
        img: '',
        wholeImg: imgURL,
        selectedFace: selectedFace,
        canvasData: canvasData,
        savedFriendData: location.state.savedFriendData,
        newFriendData: location.state.newFriendData,
      },
    });
  };

  const lowerClick = () => {
    navigate('/issavedfriend', {
      state: {
        img: '',
        name: '건희',
        wholeImg: imgURL,
        selectedFace: selectedFace,
        canvasData: canvasData,
        savedFriendData: location.state.savedFriendData,
        newFriendData: location.state.newFriendData,
      },
    });
  };

  const handleCanvasClick = (event) => {
    //const canvas = FaceContainer.current; // 캔버스에 대한 참조 사용
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 클릭한 좌표와 얼굴 크기를 이용하여 이미지 추출
    const faceSize = 100; // 예시로 지정한 얼굴 크기
    const extractedFace = extractFaceFromCanvas(canvas, x, y, faceSize);

    // 추출한 얼굴 이미지와 관련 데이터를 다음 페이지로 전달
    console.log('extractedFace: ' + extractedFace);

    navigate('/isnewfriend', {
      state: {
        img: extractedFace,
        wholeImg: imgURL,
        selectedFace: selectedFace,
        canvasData: URL.createObjectURL(canvasData),
        savedFriendData: location.state.savedFriendData,
        newFriendData: location.state.newFriendData,
      },
    });

    navigate('/issavedfriend', {
      state: {
        img: extractedFace,
        //name: label, 이름 값을 받아오는 코드 추가적으로 필요
        wholeImg: imgURL,
        selectedFace: selectedFace,
        canvasData: URL.createObjectURL(canvasData),
        savedFriendData: location.state.savedFriendData,
        newFriendData: location.state.newFriendData,
      },
    });
  };

  const moveFunc = () => {
    //게시글 작성화면에는 인생네컷 사진, 새로운친구목록과 각각의 사진, 저장된친구목록의 이름만을 필요로 함
    //하지만 게시글 속 친구목록 출력 위하여 저장된 친구목록의 사진 역시 필요
    navigate('/posting', {
      state: {
        wholeImg: imgURL,
        savedFriendData: location.state.savedFriendData,
        newFriendData: location.state.newFriendData,
      },
    });
  };

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = imgURL;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      // canvasData를 이용하여 얼굴 정보를 그리기
      const faceImage = new Image();
      faceImage.src = canvasData;

      faceImage.onload = async () => {
        // face-api.js 모델 로드
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');

        // face-api.js로 얼굴 인식
        const detections = await faceapi
          .detectAllFaces(faceImage)
          .withFaceLandmarks()
          .withFaceDescriptors();

        // 이전 페이지에서 전달받은 얼굴 정보 활용
        const box = selectedFace.detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: selectedFace.label,
        });
        ctx.strokeStyle = 'white';
        ctx.setLineDash([5, 5]);
        drawBox.draw(canvas);

        // face-api.js로 인식된 얼굴 정보 그리기
        detections.forEach((detection) => {
          const drawBox = new faceapi.draw.DrawBox(detection.detection.box, {
            label: 'Detected Face',
          });
          drawBox.draw(canvas);
        });

        // 캔버스를 화면에 추가
        FaceContainer.current.appendChild(canvas);
      };
    };
  }, [location.state]);

  const extractFaceFromCanvas = async (canvas, x, y, faceSize) => {
    const faceCanvas = document.createElement('canvas');
    const faceCtx = faceCanvas.getContext('2d');

    // 클릭한 부분의 얼굴 크기만큼 이미지 추출
    faceCanvas.width = faceSize;
    faceCanvas.height = faceSize;

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    };

    // 이미지를 로드하여 기다림
    const img = await loadImage(URL.createObjectURL(dataURItoBlob(imgURL)));

    console.log('원래사진 : ' + img);

    faceCtx.drawImage(
      img,
      x - faceSize / 2, // 클릭한 부분을 중심으로 얼굴 크기만큼 잘라냄
      y - faceSize / 2,
      faceSize,
      faceSize,
      0,
      0,
      faceSize,
      faceSize,
    );

    console.log('faceCanvas: ' + faceCanvas.toDataURL('image/jpeg'));

    // 추출한 얼굴 이미지를 데이터 URL로 변환하여 반환
    return faceCanvas.toDataURL('image/jpeg');
  };

  return (
    <BackgroundContainer>
      <Content>
        <Question>
          <Upper>
            <Num>추가로 등록하실 친구</Num>가 있나요?
          </Upper>
          <Down>추가하고 싶은 친구를 눌러주세요</Down>
        </Question>
        <PictureContainer style={{ height: 525 }}>
          <img
            src={imgURL}
            style={{ position: 'absolute', width: 350, objectFit: 'cover' }}
            alt="선택한 이미지"
          />
          <img
            src={canvasData}
            style={{ position: 'absolute', width: 350, objectFit: 'cover' }}
            alt="Canvas Image"
          />
          <div
            style={{
              position: 'absolute',
              width: 350,
              height: '100%',
              objectFit: 'cover',
            }}
            ref={FaceContainer}
            //onClick={handleCanvasClick}
          />
          <DemoBtn style={{ top: 0 }} onClick={upperClick} />
          <DemoBtn style={{ bottom: 0 }} onClick={lowerClick} />
        </PictureContainer>
        <BtnContainer>
          <Btn onClick={moveFunc}>모두 등록했어요~</Btn>
        </BtnContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default IsAnyoneMore;

const DemoBtn = styled.button`
  width: 350px;
  position: absolute;
  height: 250px;
  border: none;
  background: transparent;
`;
