import React from "react";
import { styled } from "styled-components";

export const Content = styled.div`
position: absolute;
width: 393px;
height: 100%;
background: #FFFCF4;
flex-wrap: wrap;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
//height: 852px;

export const Question= styled.div`
width: 393px;
height: 20%;
font-family: 'Pretendard';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
text-align: center;
`;

export const PictureContainer = styled.div`
position: relative;
width: 393px;
height: 40%;
z-index : 0;
`;

export const Face = styled.div`
position: absolute;
border-radius: 8px;
z-index : 1;
display:flex;
flex-direction: row;
justify-content: center;
`;

export const FaceBox = styled.div`
position: absolute;
box-sizing: border-box;
width: 200px;
height: 200px;
left: 130px;
top: 40px;
border: 8px dashed #FFFFFF;
z-index :300;

`;

export const BottomContainer = styled.div`
width: 393px;
height: 20%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
`;

export const Name = styled.input`
width: 130px;
height: 40px;
box-sizing: border-box;
background: #FFFFFF;
border: 1px solid #BDBDBD;
border-radius: 10px;

font-family: 'Pretendard';
font-weight: 500;
font-size: 15px;
text-align: center;
`;

export const NextBtn = styled.button`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
width: 130px;
height: 40px;

box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
border-radius: 8px;
border:none;

font-family: 'Pretendard';
font-weight: 500;
font-size: 15px;
display: flex;
text-align: center;
color: #FFFFFF;
`;

export const Btn= styled.button`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
width: 130px;
height: 40px;

font-family: 'Pretendard';
font-weight: 500;
font-size: 15px;
display: flex;
text-align: center;
color: #333333;


filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
background: #FFFFFF;
border-radius: 10px;
border:none;
`
;

