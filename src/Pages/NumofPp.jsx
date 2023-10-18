import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

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
import { NavBar } from '../Components/NavBar';
import dummy1 from '../Assets/dumy.png';
import LoadingScreen from './Loading';

const NumofPp = () => {
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const FaceContainer = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState([]);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [selectedFace, setSelectedFace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleFaceClick = (selectedFace) => {
    setSelectedFace(selectedFace);

    // 선택한 얼굴 부분을 잘라내기
    const { x, y, width, height } = selectedFace.detection.box;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    // 잘라낸 이미지의 데이터 URL 생성
    const croppedFaceDataURL = canvas.toDataURL('image/jpeg');

    // /faceclassification2 페이지로 이동하면서 데이터 전달
    navigate('/faceclassification2', { state: { croppedFaceDataURL } });
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  const navigate = useNavigate();
  const moveFunc = () => {
    navigate('/faceclassification2');
  };

  //데모 끝나고 지울 부분
  const moveToNextPage = () => {
    navigate('/faceclassification3');
  };

  useEffect(() => {
    async function loadModels() {
      await Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      ]);
    }

    async function start() {
      // loadLabeledImage 함수를 호출하여 labeledFaceDescriptors 설정
      const labeledFaceDescriptors = await loadLabeledImage();
      setLabeledFaceDescriptors(labeledFaceDescriptors);

      // FaceMatcher 초기화
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
      setFaceMatcher(faceMatcher);

      setLoaded(true);
    }

    async function loadModelsAndStart() {
      await loadModels(); // 모델 로딩
      await start(); // 모델 로딩 후 실행

      setLoaded(true);
    }
    loadModelsAndStart();
  }, []);

  useEffect(() => {
    if (loaded) {
      handleImageChange({ target: { files: [location.state.img] } });
    }
  }, [loaded, location.state.img]);

  const handleImageChange = async (event) => {
    const image = new Image(); // 새로운 이미지 객체 생성
    image.src = URL.createObjectURL(event.target.files[0]); // 이미지 파일 로드

    // 이미지 로드가 완료될 때까지
    image.onload = async () => {
      const canvas = faceapi.createCanvasFromMedia(image);
      FaceContainer.current.appendChild(canvas);

      const displaySize = {
        width: 350,
        height: 350 / (image.width / image.height),
      };
      faceapi.matchDimensions(canvas, displaySize);
      const detections = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const results = resizedDetections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor),
      );
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.toString(),
        });
        drawBox.draw(canvas);
      });
      canvas.addEventListener('click', moveToNextPage);
    };
  };

  async function loadLabeledImage() {
    const labels = ['mina', 'momo', 'sana', 'jinyoung', 'yunsun', 'geonhee'];
    return Promise.all(
      labels.map(async (label) => {
        const description = [];
        const img = await faceapi.fetchImage(`known/${label}.jpeg`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        description.push(detections.descriptor);
        return new faceapi.LabeledFaceDescriptors(label, description);
      }),
    );
  }

  return (
    <BackgroundContainer>
      <Content>
        <div style={{ display: 'none', opacity: 0, visibility: 'hidden' }}>
          <NavBar onImageSelect={handleImageSelect} />
        </div>
        {loaded ? (
          <>
            <Question>
              <Upper>사진 속에서 저장하고자 하는</Upper>
              <Down>
                <Num>친구</Num>를 선택해주세요
              </Down>
            </Question>
            <PictureContainer>
              <img
                src={URL.createObjectURL(location.state.img)}
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
            </PictureContainer>
          </>
        ) : (
          <div>
            <LoadingScreen keyword="네컷 처리중 ..." />
          </div>
        )}
      </Content>
    </BackgroundContainer>
  );
};

export default NumofPp;
