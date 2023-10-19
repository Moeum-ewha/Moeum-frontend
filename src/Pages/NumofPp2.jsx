import React from "react";
import { useNavigate } from "react-router-dom";

import BackgroundContainer from "../Components/BackgroundContainer";
import {Content, Question, Upper, Num, Down, BtnContainer, Friend, FriendPic, Name, Container} from "../Components/NumofPeople";
import dummy1 from "../Assets/yunsun.jpeg";
import dummy2 from "../Assets/yujin.jpeg";
import dummy3 from "../Assets/hyejoon.jpeg";

const NumofPp2 = () => {
    const navigate = useNavigate();
    const moveFunc = () => {
    navigate("/faceclassification2");
  };

    return (
        <BackgroundContainer>
            <Content>
            <Question>
            <Upper>
                <Num>사진 속 친구 </Num>를 선택해주세요.
            </Upper>
            <Down>
            </Down>
            </Question>
            <Container>
            <Friend>
                    <FriendPic>
                        <img src={dummy1} style={{width: "50px", height: "50px" , borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        윤선
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy2} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        유진
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy3} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        혜준
                    </Name>
                </Friend>
            </Container>
            <BtnContainer>
                
            </BtnContainer>
        </Content>
        </BackgroundContainer>
    );
};

export default NumofPp2;

