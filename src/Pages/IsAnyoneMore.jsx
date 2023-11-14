import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

const IsAnyoneMore = () => {
  const location = useLocation();
  const FaceContainer = useRef(null);

  // 데이터 URL을 받아옴
  const croppedFaceDataURL = location.state.img;
  const imgURL = location.state.wholeImg;
  const selectedFace = location.state.selectedFace;
  const canvasData = location.state.canvasData;

  const navigate = useNavigate();
  const moveFunc = () => {
    navigate('/posting', {
      state: { wholeImg: imgURL },
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
        const drawBox = new faceapi.draw.DrawBox(selectedFace.detection.box, {
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

  return (
    <BackgroundContainer>
      <Content>
        <Question>
          <Upper>
            <Num>추가로 등록하실 친구</Num>가 있나요?
          </Upper>
          <Down>추가하고 싶은 친구를 눌러주세요</Down>
        </Question>
        <PictureContainer>
          <Pic>
            <img
              src={imgURL}
              style={{ position: 'relative', width: 350 }}
              alt="선택한 이미지"
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
              }}
              ref={FaceContainer}
            />
          </Pic>
        </PictureContainer>
        <BtnContainer>
          <Btn onClick={moveFunc}>모두 등록했어요~</Btn>
        </BtnContainer>
      </Content>
    </BackgroundContainer>
  );
};

export default IsAnyoneMore;
