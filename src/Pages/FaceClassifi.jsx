import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import BackgroundContainer from "../Components/BackgroundContainer";
import { Content, Question, PictureContainer, Face, FaceBox, BottomContainer, Name, NextBtn } from "../Components/ClassifiContainer";

import dummy2 from "../Assets/dummy2.jpeg";

const FaceClassifi = () => {
    const [text, setText] = useState('');
    const [btnColor, setBtnColor] = useState(false);

    useEffect(() => {
        if (text !== '') {
        setBtnColor(true);
    } else {
        setBtnColor(false)
    }
}, [text]);

  const navigate = useNavigate();
  const moveAdd = () => {
    navigate("/home");
  };

    return (
     <BackgroundContainer>
        <Content>
            <Question>
            친구의 이름이
            <br></br>
            무엇인가요
            </Question>
            <PictureContainer>
                <Face>
                    <img src={dummy2} style={{width: '90%'}}/>
                </Face>
                <FaceBox>
                      
                </FaceBox>
            </PictureContainer>
            <BottomContainer>
                <Name type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="이름 입력">
                </Name>
                <NextBtn style={
              btnColor ? styles.filledBtn : styles.normalBtn
            } onClick={moveAdd}>
                    다음
                </NextBtn>
            </BottomContainer>
        </Content>
      </BackgroundContainer>
    );
};

const styles = {
    filledBtn: {
      backgroundColor: '#FFC329',
    },
    normalBtn: {
      backgroundColor: '#DDDDDD',
    },
  };

export default FaceClassifi;