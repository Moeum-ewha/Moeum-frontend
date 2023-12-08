# 🍀 Moeum
>Face Recognition 기반 네컷사진 바인딩 서비스   
>추억을 아카이빙 하다, 모음  
>
>이화여자대학교 컴퓨터공학과 졸업프로젝트 작품 : 2023.03.02 ~
>
>**2023 Ewha Engineering Capstone Design Contest 동상 수상**
>
>[https://www.moeum.site](https://www.moeum.site)
>
>
><img src="https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/readmeImg/111.png" width="800"/> 
><img src="https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/readmeImg/002.jpg" width="800"/> 
<br/>   
<br/>


## 🍀 Used Architecture
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=Vite&logoColor=white"/> <img src="https://img.shields.io/badge/Prittier-F7B93E?style=flat-square&logo=Prittier&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<br/>
<br/>


## 🍀 Contributers
| 안건희 | 오진영 |
| :-------------------------------: | :-------------------------------: |
| <img src="https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/readmeImg/Judy.png" height="200"/> | <img src="https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/readmeImg/Apple.png" height="200"/> |
| [GEONHEE AHN](https://github.com/GeonHeeAhn) | [ohjinyxung](https://github.com/ohjinyxung) |
| Face Recognification and Classification 기술 구현, 얼굴 인식 정확도 향상, 전반적인 프론트 개발, Vercel 프론트 배포  |프론트 개발, 서비스 기획, 아이디어 구체화, UX/UI 디자인, 포스터 및 제품설명서 제작|||

<br/>
<br/>

## 🍀 Service Architecture
<img src="https://github.com/Moeum-ewha/Moeum-frontend/blob/main/public/readmeImg/flow.png" width="500"/> 
<br/>
<br/>

## 🍀 How to Install
```git clone https://github.com/Moeum-ewha/Moeum-frontend```
```npm install```
<br/>   
<br/>

## 🍀 How To Build
```
npm run build
npm run dev
```
<br/>   
<br/>

## 🍀 How to Test
- https://www.moeum.site 에 들어가서 서비스 테스트 및 이용 가능
- ```git clone```을 통해서 직접 실행도 가능하지만, 보안을 위한 cors 처리로 막힐 가능성이 있음

<br/>   
<br/>


## 🍀 Page Introduction
```
📄AddName.jsx : 새로 등록할 친구 이름 입력
📄Binder.jsx : 친구별 네컷 앨범 바인더
📄Entrance.jsx : 진입 화면
📄FaceRecognition.jsx : 네컷 업로드 후 얼굴 인식 처리
📄FriendPostList.jsx : 친구별 네컷 앨범 바인더 내부 화면 (해당 친구와 찍은 네컷 일기 모음)
📄HomeScreen.jsx : 홈 화면
📄IsAnyoneMore.jsx : 추가로 등록하고자 하는 친구 선택
📄IsNewFriend.jsx : 새로 등록하는 친구인지 확인
📄IsSavedFriend.jsx : 이미 등록된 친구인지 확인
📄Loading.jsx : 로딩 화면
📄Login.jsx : 로그인 화면
📄Map.jsx : 지도에 네컷 찍은 장소 모아보기
📄SelectFriend.jsx : 이미 등록된 친구를 잘 못 인식한 경우, 사용자가 직접 선택
📄Settings.jsx : 마이페이지(설정) 화면
📄ShareView.jsx : 외부 공유용 네컷 일기
📄SignUp.jsx : 회원가입 화면
📄ViewPost.jsx : 네컷 일기 보기
📄WritePost.jsx : 네컷 일기 작성
```
<br/>   
<br/>

## 🍀 Commit Convention

<aside>
👻 git commit message convention   
   
ex) [feat] crop face image and get label

```ruby
- [chore]: 단순 코드 수정, 내부 파일 수정
- [feat] : 새로운 페이지 및 기능 구현
- [add] : Feat 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 시
- [fix] : 버그, 오류 해결
```

</aside>
</br>   
</br>


## 🍀 Project Foldering
```
---📁public
------📁known
------📁models
------📁profileImg
------📁readmeImg
---📁src
------📁Assets
--------📁icons
------📁Components
---------📄BackgroundContainer.jsx
---------📄BinderComponent.jsx
---------📄ClassifiContainer.jsx
---------📄Comment.jsx
---------📄HomeComponents.jsx
---------📄LoginContainer.jsx
---------📄Main.jsx
---------📄MapComponents.jsx
---------📄NavBar.jsx
---------📄NumofPeople.jsx
---------📄PhotoModal.jsx
---------📄PopupModal.jsx
---------📄postingComponents.jsx
---------📄SettingsComponents.jsx
---------📄SignUpComponents.jsx
---------📄TopBar.jsx
---------📄viewingComponents.jsx
------📁Pages
---------📄AddName.jsx
---------📄Binder.jsx
---------📄Entrance.jsx
---------📄FaceRecognition.jsx
---------📄FriendPostList.jsx
---------📄HomeScreen.jsx
---------📄IsAnyoneMore.jsx
---------📄IsNewFriend.jsx
---------📄IsSavedFriend.jsx
---------📄Loading.jsx
---------📄Login.jsx
---------📄Map.jsx
---------📄SelectFriend.jsx
---------📄Settings.jsx
---------📄ShareView.jsx
---------📄SignUp.jsx
---------📄ViewPost.jsx
---------📄WritePost.jsx
------📁Hooks
---------📄useGeoLocation.js
-------📄App.css
-------📄App.jsx
-------📄main.jsx
-----📄.eslintrc.cjs
-----📄.gitignore
-----📄.prettierrc
-----📄README.md
-----📄face-api.jsx
-----📄face-api.jsx.map
-----📄face-api.min.jsx
-----📄index.html
-----📄package-lock.json
-----📄package.json
-----📄vercel.json
-----📄vite.config.js


```
</br>   
</br>

## 🍀 Dependencies Module ( package.json )
Description of used Open Source
```
{
  "name": "moeum-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "proxy": "http://localhost:5000",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.2",   // API에 HTTP 요청 보내는 프로미스 기반 HTTP 클라이언트
    "face-api.js": "^0.22.2",   // 브라우저에서 얼굴 감지 및 인식을 위한 JavaScript API
    "prettier": "^3.0.3",   // 코드 형식을 일관되게 유지하는 데 도움이 되는 코드 포매터
    "react": "^18.2.0",   // 사용자 인터페이스를 구축 위한 JavaScript 라이브러리
    "react-datepicker": "^4.21.0",   // 날짜 선택기를 렌더링하기 위한 React 컴포넌트   
    "react-dom": "^18.2.0",   // React에 대한 DOM 특화 method
    "react-icons": "^4.11.0",  
    "react-kakao-maps": "^0.0.13",   // Kakao Maps API를 React 애플리케이션에 통합하기 위한 래퍼
    "react-kakao-maps-sdk": "^1.1.23",   // Kakao Maps API의 SDK, 래퍼와 비교해 더 고급 통합이나 기능을 위해 사용
    "react-router-dom": "^6.16.0",   // React Router의 DOM 바인딩
    "styled-components": "^6.0.8"   // 템플릿 리터럴을 사용하여 React 컴포넌트를 스타일링하기 위한 라이브러리
},
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "vite": "^4.4.5"
  }
}

```
<hr>
<br/>
<br/>

