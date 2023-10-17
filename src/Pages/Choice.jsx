import React from "react";
import { useNavigate } from "react-router-dom";

import BackgroundContainer from "../Components/BackgroundContainer";
import {Content, Question, Upper, Num, Down, PictureContainer, Pic, FaceBox, BtnContainer, YesBtn, NoBtn} from "../Components/NumofPeople";
import { Btn } from "../Components/ClassifiContainer";
import dummy1 from "../Assets/dumy.png";

const Choice = () => {
    const navigate = useNavigate();
    const moveFunc = () => {
    navigate("/faceclassification2");
  };

    return (
        <BackgroundContainer>
            <Content>
            <Question>
            <Upper>
                <Num>추가로 등록하실 친구</Num>가 있나요?
            </Upper>
            <Down>
                추가하고 싶은 친구를 눌러주세요
            </Down>
            </Question>
            <PictureContainer>
                <Pic>
                    <img src={dummy1} style={{width: "350px"}}/>
                </Pic>
                <FaceBox style={{left: '120px', top: '45px'}}/>
                <FaceBox style={{right: '75px', top: '90px'}}/>
                <FaceBox style={{left: '130px', bottom: '25px'}}/>
                <FaceBox style={{left: '35px', bottom: '45px'}}/>
                <FaceBox style={{right: '80px', top: '180px'}}/>
            </PictureContainer>
            <BtnContainer>
                <Btn onClick={moveFunc}>
                  모두 등록했어요~
                </Btn>
            </BtnContainer>
        </Content>
        </BackgroundContainer>
    );
};

export default Choice;