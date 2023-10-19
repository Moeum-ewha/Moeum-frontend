import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../Assets/logo.png";

import BackgroundContainer from "../Components/BackgroundContainer";
import { Content, Upper, LogoDiv, Center, Container, SemiTitle, Input, SignUpContainer, SignUpLink, Lower, Button, styles, } from "../Components/LoginContainer";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnColor, setBtnColor] = useState(false);


  useEffect(() => {
    if (email !== '' && password !== '') {
      setBtnColor(true);
    } else {
      setBtnColor(false);
    }
  }, [email, password]);

  const navigate = useNavigate();
  const moveSignUp = () => {
    navigate("/signup");
  }
  const moveLogin = () => {
    navigate("/");
  };

    return (
     <BackgroundContainer>
        <Content>
          <Upper>
            <LogoDiv>
            <img src={Logo} alt="로고" width="70px" />
            </LogoDiv>
          </Upper>
          <Center>
            <Container>
              <SemiTitle>
                이메일
              </SemiTitle>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}>

              </Input>
            </Container>
            <Container>
              <SemiTitle>
                비밀번호
              </SemiTitle>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}>
            
              </Input>
            </Container>
            <SignUpContainer>
              <SignUpLink onClick={moveSignUp}>
                계정이 없으신가요?
              </SignUpLink>
            </SignUpContainer>
          </Center>
          <Lower>
            <Button style={
              btnColor ? styles.filledBtn : styles.normalBtn
            } onClick={moveLogin}>
              로그인
            </Button>
          </Lower>
        </Content>
      </BackgroundContainer>
    );
};

export default Login;