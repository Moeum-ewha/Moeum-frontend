import React from "react";

import BackgroundContainer from "../Components/BackgroundContainer";
import {Title,} from "../Components/SignUpComponents";
import {Content, Upper, Center, Container, SemiTitle, Input, Lower, Button } from "../Components/LoginContainer";

const SignUp = () => {
    return (
      <BackgroundContainer>
      <Content>
        <Upper>
          <Title>
            회원가입
          </Title>
        </Upper>
        <Center>
          <Container>
          <SemiTitle>
              닉네임
            </SemiTitle>
            <Input>
            </Input>
          </Container>
          <Container>
            <SemiTitle>
              이메일
            </SemiTitle>
            <Input>
            </Input>
          </Container>
          <Container>
          <SemiTitle>
              비밀번호
            </SemiTitle>
            <Input>
            </Input>
          </Container>
          <Container>
            <SemiTitle>
              비밀번호
            </SemiTitle>
            <Input>
            </Input>
          </Container>
        </Center>
        <Lower>
          <Button style={{margin :'25px'}}>
            가입하기
          </Button>
        </Lower>
      </Content>
    </BackgroundContainer>
    );
};

export default SignUp;