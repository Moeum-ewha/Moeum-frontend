import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import BackgroundContainer from '../Components/BackgroundContainer';
import { NavBar } from '../Components/NavBar';

export const FaceReCog = () => {
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const FaceContainer = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState([]);
  const [faceMatcher, setFaceMatcher] = useState(null);

  const handleImageSelect = (image) => {
    // 이미지가 선택될 때 호출되는 콜백 함수
    console.log('부모');
    setSelectedImage(image);
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

      const displaySize = { width: image.width, height: image.height };
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
      <NavBar onImageSelect={handleImageSelect} />
      {loaded ? (
        <>
          <img
            src={URL.createObjectURL(location.state.img)}
            style={{ position: 'relative' }}
            alt="선택한 이미지"
          />
          <div style={{ position: 'absolute' }} ref={FaceContainer} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </BackgroundContainer>
  );
};

export default FaceReCog;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

export const PhotoContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  postition: 'relative';
`;
