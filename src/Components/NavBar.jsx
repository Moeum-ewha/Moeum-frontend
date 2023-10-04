import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import home from "../Assets/icons/home.png";
import map from "../Assets/icons/map.png";
import friends from "../Assets/icons/friends.png";
import settings from "../Assets/icons/settings.png";
import plus from "../Assets/icons/plus.png";
import check from "../Assets/icons/check.png";

import { ModalBack, ModalBox, ModalBtn, ExitBtn } from "./PhotoModal";

export const NavBar = ({ setSelectedImage, selectedImage }) => {
  const modalBackground = useRef();
  const fileInput = useRef();

  const [modalOpen, setModalOpen] = useState(false);

  const fileUpload = () => {
    fileInput.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgData = event.target.result;
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <>
        <CenterBtn onClick={() => setModalOpen(true)}>
        <PlusBtn>
          <img src={plus} alt="로고" />
        </PlusBtn>
        </CenterBtn>
        {modalOpen && (
          <ModalBack
            ref={modalBackground}
            onClick={(e) => {
              if (e.target === modalBackground.current) {
                setModalOpen(false);
              }
            }}
          >
            <ModalBox>
              <ModalBtnTop>카메라</ModalBtnTop>
              <ModalBtn onClick={fileUpload}>사진 보관함</ModalBtn>
              <input
                type="file"
                ref={fileInput}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              {selectedImage && <Link to="/facerecognition" />}
            </ModalBox>
            <ExitBtn onClick={() => setModalOpen(false)}>취소</ExitBtn>
          </ModalBack>
        )}
      </>
      <NavigationBar>
        <NavBtn>
          <img src={home} alt="로고" />
        </NavBtn>
        <NavBtn>
          <img src={friends} alt="로고" />
        </NavBtn>
        <NavBtn>
        </NavBtn>
        <NavBtn>
          <img src={map} alt="로고" />
        </NavBtn>
        <NavBtn>
          <img src={settings} alt="로고" />
        </NavBtn>
      </NavigationBar>
    </>
  );
};

export const NavigationBar = styled.div`
  bottom: 0;
  height: 94px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.07);
  background: white;
  postition: fixed;
  z-index: 1;
`;
export const NavBtn = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  display: flex;
  align-items: center;
  aligin-content: center;
  border: none;
  margin: 0px 0px 10px 0px;
  padding: 0px;
  position: relative;
  z-index: 1000;
`;

export const CenterBtn = styled.button`
  position: fixed;
  bottom: 40px;
  margin: 0 auto;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: #ffc329;
  z-index: 2;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
`;

export const PlusBtn = styled.button`
width: 30px;
height: 30px;
background: transparent;
display: flex;
align-items: center;
aligin-content: center;
border: none;
margin: 0px 0px 0px 0px;
padding: 0px;
position: relative;
z-index: 1000;
`;


export const ModalBtnTop = styled(ModalBtn)`
  //왜인지 모르겠으나 적용이 안댐..
  border-bottom: 1px #dddddd;
`;
