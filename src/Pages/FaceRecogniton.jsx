import * as faceapi from 'face-api.js';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

import BackgroundContainer from '../Components/BackgroundContainer';
import {
  Content,
  Question,
  Upper,
  Num,
  Down,
  PictureContainer,
} from '../Components/NumofPeople';
import { NavBar } from '../Components/NavBar';
import LoadingScreen from './Loading';

const FaceRecogniton = () => {
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const FaceContainer = useRef(null);
  const rectanglesRef = useRef([]);
  const resizedDetectionsRef = useRef([]);
  const selectedImageObjRef = useRef(null);
  const checkCanvasRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState([]);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [selectedFace, setSelectedFace] = useState(null);
  const faceIndex = [];
  const friendlist = useRef([]);
  const fd = useRef([]);

  const navigate = useNavigate();

  const sendApi = async () => {
    if (loaded) return;

    setLoaded(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `/friends`,
        withCredentials: true,
      });

      friendlist.current = response.data.friends;

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
        friendlist.current.map(async (friend) => {
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

      fd.current = newFriendlist;
    } catch (error) {
      console.error(error);
    } finally {
      setLoaded(false);
    }
  };

  let canvasDataURL;

  const handleFaceClick = async (selectedFace, allFaces, selectedIndex) => {
    setSelectedFace(selectedFace);
    faceIndex.push(selectedIndex);

    const { x, y, width, height } = selectedFace.detection.box;
    // 이미지를 로드하는 Promise 생성
    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
      });
    };

    // 이미지를 로드하여 기다림
    const img = await loadImage(
      URL.createObjectURL(selectedImageObjRef.current),
    );
    // 기준이 되는 displaySize
    const displaySize = {
      width: 350,
      height: 350 / (img.width / img.height),
    };

    // 이미지의 크기에 비례하여 x, y, width, height 값을 조정
    const adjustedX = (x / displaySize.width) * img.width;
    const adjustedY = (y / displaySize.height) * img.height;
    const adjustedWidth = (width / displaySize.width) * img.width;
    const adjustedHeight = (height / displaySize.height) * img.height;

    const croppedFaceCanvas = document.createElement('canvas');
    croppedFaceCanvas.width = adjustedWidth;
    croppedFaceCanvas.height = adjustedHeight;
    const croppedFaceCtx = croppedFaceCanvas.getContext('2d');

    // 이미지를 클릭한 부분을 기준으로 잘라내기
    croppedFaceCtx.drawImage(
      img,
      adjustedX,
      adjustedY,
      adjustedWidth,
      adjustedHeight,
      0,
      0,
      adjustedWidth,
      adjustedHeight,
    );

    // 잘라낸 이미지의 데이터 URL 생성
    const croppedFaceDataURL = croppedFaceCanvas.toDataURL('image/jpeg');
    const imgURL = URL.createObjectURL(selectedImageObjRef.current);

    //isanyonemore에서 배열이 존재하는 state를 보낼 수 있으니, 미리 savedFriendData, newFriendData을 생성하여 빈 배열로 전송
    //등록된 인물이어도 값이 잘못될 수 있으니 배열에 추가하지 않고 배열 밖에 넣어서 전송
    //확실히 인물의 값이 정해질 때에만 배열에 접근
    if (!selectedFace.label.includes('unknown')) {
      const parts = selectedFace.label.split(' '); // 공백을 기준으로 문자열을 나눔
      const label = parts[0]; // 나눠진 첫 번째 부분이 레이블

      navigate('/issavedfriend', {
        state: {
          img: croppedFaceDataURL,
          name: label,
          wholeImg: imgURL,
          canvasData: canvasDataURL,
          faceData: allFaces,
          faceIndex: faceIndex,
          savedFriendData: [],
          newFriendData: [],
        },
      });
    } else {
      navigate('/isnewfriend', {
        state: {
          img: croppedFaceDataURL,
          wholeImg: imgURL,
          faceData: allFaces,
          faceIndex: faceIndex,
          canvasData: canvasDataURL,
          savedFriendData: [],
          newFriendData: [],
        },
      });
    }
  };

  async function loadImageAndDetect(imgPath) {
    console.log(imgPath);

    // 이미지를 가져오기
    const response = await fetch(imgPath);
    const blob = await response.blob();

    // Image 객체 생성
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    // Image가 로드될 때까지 대기
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Image를 Canvas에 그림
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // detectSingleFace에 전달할 수 있는 형태로 변환
    const input = faceapi.tf.tensor(img);
    const detections = await faceapi
      .detectSingleFace(input)
      .withFaceLandmarks()
      .withFaceDescriptor();

    // 다시 Promise 형태로 반환
    return new faceapi.LabeledFaceDescriptors('unknown', [
      detections.descriptor,
    ]);
  }

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    async function loadModels() {
      await Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(
          'https://raw.githubusercontent.com/GeonHeeAhn/my-Moeum-front/main/public/models',
        ),
        faceapi.nets.ssdMobilenetv1.loadFromUri(
          'https://raw.githubusercontent.com/GeonHeeAhn/my-Moeum-front/main/public/models',
        ),
        faceapi.nets.faceLandmark68Net.loadFromUri(
          'https://raw.githubusercontent.com/GeonHeeAhn/my-Moeum-front/main/public/models',
        ),
      ]);
    }

    async function start() {
      // loadLabeledImage 함수를 호출하여 labeledFaceDescriptors 설정
      const labeledFaceDescriptors = await loadLabeledImage();
      setLabeledFaceDescriptors(labeledFaceDescriptors);

      // FaceMatcher 초기화
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.3);
      setFaceMatcher(faceMatcher);

      setLoaded(true);
    }

    async function loadModelsAndStart() {
      await sendApi();
      await imgApi();
      await loadModels(); // 모델 로딩
      await start(); // 모델 로딩 후 실행

      setLoaded(true);
    }

    loadModelsAndStart();
  }, []);

  useEffect(() => {
    imgApi();
  }, [friendlist]);

  useEffect(() => {
    if (loaded) {
      handleImageChange({ target: { files: [location.state.img] } });
    }
  }, [loaded, location.state.img]);

  const handleImageChange = async (event) => {
    let results;
    const image = new Image(); // 새로운 이미지 객체 생성
    selectedImageObjRef.current = event.target.files[0];
    image.src = URL.createObjectURL(selectedImageObjRef.current); // 이미지 파일 로드

    // 이미지 로드가 완료될 때까지
    image.onload = async () => {
      const canvas = faceapi.createCanvasFromMedia(image);
      FaceContainer.current.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const displaySize = {
        width: 350,
        height: 350 / (image.width / image.height),
      };

      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptors();

      results = await Promise.all(
        detections.map((d) => faceMatcher.findBestMatch(d.descriptor)),
      );

      // 좌표값 저장
      const resizedDetections = faceapi
        .resizeResults(detections, displaySize)
        .map((detection, i) => {
          detection.label = results[i].toString(); // label 추가
          return detection;
        });

      const rectangle = resizedDetections.map((d) => d.detection.box);
      rectanglesRef.current = rectangle;
      resizedDetectionsRef.current = resizedDetections;

      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.toString(),
        });
        ctx.strokeStyle = 'red';
        ctx.setLineDash([5, 5]);
        drawBox.draw(canvas);
      });

      canvasDataURL = await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        }, 'image/png');
      });

      canvas.addEventListener('click', handleCanvasClick);
      checkCanvasRef.current = canvas;
    };
  };

  const handleCanvasClick = (event) => {
    const canvas = FaceContainer.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // 클릭한 좌표와 사각형의 좌표 비교
    for (const rectangle of rectanglesRef.current) {
      if (
        x >= rectangle.x &&
        x <= rectangle.x + rectangle.width &&
        y >= rectangle.y &&
        y <= rectangle.y + rectangle.height
      ) {
        // 선택한 얼굴 정보 전달
        const selected = resizedDetectionsRef.current.find(
          (d) =>
            d.detection.box.x === rectangle.x &&
            d.detection.box.y === rectangle.y &&
            d.detection.box.width === rectangle.width &&
            d.detection.box.height === rectangle.height,
        );
        const selectedIndex = resizedDetectionsRef.current.indexOf(selected);
        if (selected) {
          handleFaceClick(
            selected,
            resizedDetectionsRef.current,
            selectedIndex,
          );
        }
        break;
      }
    }
  };

  async function loadLabeledImage() {
    console.log('label load 시작');
    if (fd.current.length === 0) {
      const labels = ['gh', 'jy', 'yh'];
      return Promise.all(
        labels.map(async (label) => {
          const description = [];
          const img = await faceapi.fetchImage(`/known/${label}.jpg`);
          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          description.push(detections.descriptor);
          return new faceapi.LabeledFaceDescriptors(label, description);
        }),
      );
    } else {
      const promises = fd.current.map(async (friend) => {
        const description = [];
        const imgElement = document.createElement('img');
        imgElement.src = friend.imgPath;
        console.log(imgElement);

        const detections = await faceapi
          .detectSingleFace(imgElement)
          .withFaceLandmarks()
          .withFaceDescriptor();

        description.push(detections.descriptor);
        return new faceapi.LabeledFaceDescriptors(
          friend.friendName,
          description,
        );
      });

      return Promise.all(promises);
    }
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

export default FaceRecogniton;
