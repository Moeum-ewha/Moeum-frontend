import React from "react";
import { useNavigate } from "react-router-dom";

import BackgroundContainer from "../Components/BackgroundContainer";
import {Content, Question, Upper, Num, Down, BtnContainer, Friend, FriendPic, Name, Container} from "../Components/NumofPeople";
import dummy1 from "../Assets/dummy2.jpeg";
import dummy2 from "../Assets/dummy2.jpeg";
import dummy3 from "../Assets/dummy2.jpeg";
import dummy4 from "../Assets/dummy2.jpeg";
import dummy5 from "../Assets/dummy2.jpeg";
import dummy6 from "../Assets/dummy2.jpeg";
import dummy7 from "../Assets/dummy2.jpeg";

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
                        서은
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy2} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        루리
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy3} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        민정 언니
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy4} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        도연
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy5} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        윤선 언니
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy6} style={{width: "50px", height: "50px", borderRadius: "100%"}}/>
                    </FriendPic> 
                    <Name>
                        건희 언니
                    </Name>
                </Friend>
                <Friend>
                    <FriendPic>
                        <img src={dummy7} style={{width: "50px", height: "50px", borderRadius: "100%" }}/>
                    </FriendPic> 
                    <Name>
                        가원
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

