import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import faceapi from 'face-api.js';

import BackgroundContainer from '../Components/BackgroundContainer';
import { NavBar } from '../Components/NavBar';

export const FaceReCog = () => {
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);

  const [loaded, setLoaded] = useState(false);
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState([]);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [clickedCanvasData, setClickedCanvasData] = useState(null);

  const handleImageSelect = (image) => {
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
      const labeledFaceDescriptors = await loadLabeledImage();
      setLabeledFaceDescriptors(labeledFaceDescriptors);

      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
      setFaceMatcher(faceMatcher);

      setLoaded(true);
    }

    async function loadModelsAndStart() {
      await loadModels();
      await start();

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
    const image = new Image();
    image.src = URL.createObjectURL(event.target.files[0]);

    image.onload = async () => {
      const displaySize = { width: image.width, height: image.height };
      const detections = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const results = resizedDetections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor)
      );

      // Canvas에 그리기
      drawCanvas(image, resizedDetections, results, displaySize);
    };
  };

  const drawCanvas = (image, detections, results, displaySize) => {
    const canvas = faceapi.createCanvasFromMedia(image);
    document.body.appendChild(canvas);
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';

    canvas.addEventListener('click', (e) => handleCanvasClick(e, canvas));

    faceapi.matchDimensions(canvas, displaySize);

    results.forEach((result, i) => {
      const box = detections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, {
        label: result.toString(),
      });
      drawBox.draw(canvas);
    });
  };

  const handleCanvasClick = (event, canvas) => {
    // 클릭한 Canvas의 위치와 크기 정보를 가져옵니다.
    const canvasRect = canvas.getBoundingClientRect();
    const clickedX = event.clientX - canvasRect.left;
    const clickedY = event.clientY - canvasRect.top;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // 클릭한 Canvas의 이미지 부분을 추출
    const clicked
