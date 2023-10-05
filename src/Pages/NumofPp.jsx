import React from "react";
import { useNavigate } from "react-router-dom";

import BackgroundContainer from "../Components/BackgroundContainer";
import {Content, Question, Upper, Num, Down, PictureContainer, Pic, FaceBox, BtnContainer, YesBtn, NoBtn} from "../Components/NumofPeople";
import dummy1 from "../Assets/dumy.png";

const NumofPp = () => {
    const navigate = useNavigate();
    const moveFunc = () => {
    navigate("/faceclassification2");
  };

    return (
        <BackgroundContainer>
            <Content>
            <Question>
            <Upper>
            네컷 속 사람이
            </Upper>
            <Down>
                <Num>
                5명
                </Num>
                인가요?
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
                <YesBtn onClick={moveFunc}>
                  네
                </YesBtn>
                <NoBtn>
                  아니오
                </NoBtn>
            </BtnContainer>
        </Content>
        </BackgroundContainer>
    );
};

export default NumofPp;