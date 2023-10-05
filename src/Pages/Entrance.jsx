import { styled } from "styled-components";
import Logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import BackgroundContainer from "../Components/BackgroundContainer";

export const Entrance = () => {
  const navigate = useNavigate();

  const moveFunc = () => {
    navigate("Home");
  };

  return (
    <Background>
      <div onClick={moveFunc}>
        <img src={Logo} alt="로고" width="50vw" />
        <LogoText>MOEUM</LogoText>
      </div>
    </Background>
  );
};

export default Entrance;

export const Background = styled(BackgroundContainer)`
  background: #ffe8a6;
`;
export const LogoText = styled.div`
  padding-top: 0.4vw;
  font: 1rem "Pretendard";
  text-align: center;
  font-size: 1vw;
`;
