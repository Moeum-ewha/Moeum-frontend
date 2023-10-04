import React, { useState } from "react";
import styled from "styled-components";

import BackgroundContainer from "../Components/BackgroundContainer";
import { NavBar } from "../Components/NavBar";

const ImageDisplay = ({ uploadedImage }) => {
  return (
    <div>
      <h2>Uploaded Image</h2>
      {uploadedImage && <img src={uploadedImage} alt="Uploaded" width="400" />}
    </div>
  );
};

export const FaceReCog = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
  };

  return (
    <BackgroundContainer>
      <NavBar
        setSelectedImage={setUploadedImage}
        selectedImage={uploadedImage}
      />
      <ImageDisplay uploadedImage={uploadedImage} />
    </BackgroundContainer>
  );
};

export default FaceReCog;
