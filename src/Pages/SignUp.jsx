import { useEffect, useState, useRef, React } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BackgroundContainer from "../Components/BackgroundContainer";
import {Title,} from "../Components/SignUpComponents";
import {Content, Upper, Center, Container, SemiTitle, Input, Lower, Button, ValidDiv, SemiDiv } from "../Components/LoginContainer";
import { ModalBack, ModalBox, ModalButton, ModalContent, Alert } from "../Components/PopupModal";

const SignUp = () => {
  const modalBackground = useRef();
  const navigate = useNavigate();

  const moveLogin = () => {
    navigate("/login");
  };

const [modalOpen, setModalOpen] = useState(false);

const openModal = () => {
  if (validateInputs()) {
    setModalOpen(true);
  } else {
    
  }
};

const [isButtonActive, setIsButtonActive] = useState(false);

const [form, setForm] = useState({
    nickname: '',
    email: '',
    password: '',
    ConfirmPassword: '',
});

function useValid(changeValue) {
  const [validText, setValidText] = useState('');
  const [isValid, setIsValid] = useState({
      isNickname: false,
      isEmail: false,
      isPassword: false,
      isConfirmPassword: false,
  });

  useEffect(() => {
      const exp = /^.{1,8}$/;
      if (!exp.test(changeValue.nickname)) {
          setValidText((prevText) => ({
            ...prevText,
            isNickname: '닉네임은 최대 8자 입니다.', }) );
          setIsValid({ ...isValid, isNickname: false });
      } else {
          setValidText('');
          setIsValid({ ...isValid, isNickname: true });
      }
  }, [changeValue.nickname]);

  useEffect(() => {
      const exp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
      if (!exp.test(changeValue.email)) {
          setValidText((prevText) => ({
            ...prevText,
            isEmail: '이메일을 확인해주세요', }));
          setIsValid({ ...isValid, isEmail: false });
      } else {
          setValidText('');
          setIsValid({ ...isValid, isEmail: true });
      }
  }, [changeValue.email]);

  useEffect(() => {
      const exp = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{8,}$/;
      if (!exp.test(changeValue.password)) {
          setValidText((prevText) => ({
            ...prevText,
            isPassword: '비밀번호는 8자 이상의 영어와 숫자여야 합니다'}));
          setIsValid({ ...isValid, isPassword: false });
      } else {
          setValidText('');
          setIsValid({ ...isValid, isPassword: true });
      }
  }, [changeValue.password]);

  useEffect(() => {
    if (!changeValue.ConfirmPassword) {
      setValidText('');
      setIsValid((prevValid) => ({
        ...prevValid,
        isConfirmPassword: false,
      }));
    } else if (changeValue.password === changeValue.ConfirmPassword) {
      setValidText('');
      setIsValid((prevValid) => ({
        ...prevValid,
        isConfirmPassword: true,
      }));
    } else {
      setValidText((prevText) => ({
        ...prevText,
        isConfirmPassword: '비밀번호가 같지 않습니다.',
      }));
      setIsValid((prevValid) => ({
        ...prevValid,
        isConfirmPassword: false,
      }));
    }
  }, [changeValue.ConfirmPassword]);

  return { validText, isValid };
}

const { validText, isValid } = useValid(form);


useEffect(() => {
    // 회원가입 조건을 검사하여 버튼 활성화 여부를 설정합니다.
    const isFormValid = validateInputs();
    setIsButtonActive(isFormValid);
}, [form, isValid]);

const validateInputs = () => {
    if (isValid.isNickname && isValid.isEmail && isValid.isPassword && isValid.isConfirmPassword ) {
        return true; // 조건을 모두 만족하면 true를 반환
    }
    return false; // 조건을 만족하지 않으면 false를 반환
};

  const buttonStyle = isButtonActive
    ? { backgroundColor: '#FFC329', color: 'black' }
    : { backgroundColor: '#DDDDDD', color: 'white' };

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
          <SemiDiv>
          <SemiTitle>
              닉네임
          </SemiTitle>
          <ValidDiv>{validText.isNickname}</ValidDiv>
          </SemiDiv>
            <Input
              type="text"
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value})}
              valid={!isValid.isNickname} 
            />
          </Container>
          <Container>
            <SemiDiv>
            <SemiTitle>
              이메일
            </SemiTitle>
            <ValidDiv>{validText.isEmail}</ValidDiv>
            </SemiDiv>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value})}
              valid={!isValid.isEmail} 
              />
          </Container>
          <Container>
            <SemiDiv>
          <SemiTitle>
              비밀번호
          </SemiTitle>
          <ValidDiv>{validText.isPassword}</ValidDiv>
          </SemiDiv>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value})}
              valid={!isValid.isPassword} 
              />
          </Container>
          <Container>
            <SemiDiv>
            <SemiTitle>
              비밀번호 확인
            </SemiTitle>
            <ValidDiv>{validText.isConfirmPassword}</ValidDiv>
            </SemiDiv>
            <Input
              type="password"
              value={form.ConfirmPassword}
              onChange={(e) => setForm({ ...form, ConfirmPassword: e.target.value})}
              valid={!isValid.isConfirmPassword} 
              />
          </Container>
        </Center>
        <Lower>
          <Button style={{ margin: '25px', ...buttonStyle }}
            onClick={openModal}
            disabled={!isButtonActive}>
            가입하기
          </Button>
        </Lower>
      </Content>
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
            <ModalContent>
              <Alert>회원가입이</Alert>
              <Alert>완료되었습니다!</Alert>
              <ModalButton onClick={moveLogin}>로그인</ModalButton>
            </ModalContent>
          </ModalBox>
        </ModalBack>
      )}
    </BackgroundContainer>
    );
};

export default SignUp;