import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WritePost from './Pages/WritePost';
import { FaceReCog } from './Pages/FaceRecog';
import ViewPost from './Pages/ViewPost';
import './App.css';
import FaceClassifi from './Pages/FaceClassifi';
import FaceClassifi2 from './Pages/FaceClassifi2';
import FaceClassifi3 from './Pages/FaceClassifi3';
import NumofPp from './Pages/NumofPp';
import NumofPp2 from './Pages/NumofPp2';
import Choice from './Pages/Choice';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import HomeScreen from './Pages/HomeScreen';
import HomeScreen2 from './Pages/HomeScreen2';
import Binder from './Pages/Binder';
import Binder2 from './Pages/Binder2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/home" element={<HomeScreen2 />} />
        <Route path="/posting" element={<WritePost />} />
        <Route path="/facerecognition" element={<FaceReCog />} />
        <Route path="/viewpost" element={<ViewPost />} />
        <Route path="/faceclassification" element={<FaceClassifi />} /> /*
        친구의 이름이 무엇인가요 */
        <Route path="/faceclassification2" element={<FaceClassifi2 />} /> /*
        (새로운 친구)님이 맞나요? */
        <Route path="/faceclassification3" element={<FaceClassifi3 />} /> /*
        !(윤선)님이 맞나요? */
        <Route path="/choice" element={<Choice />} /> /* !사진 속 친구를
        선택해주세요. */
        <Route path="/facerecognition1" element={<NumofPp />} /> /* 사진 속에서
        저장하고자 하는 친구를 선택해주세요*/ //기존에 할당해둔 NumofPp2는 '인식
        개별뷰 - 등록된 다른 친구일 시' 화면이라 바꿔둠
        <Route path="/facerecognition2" element={<Choice />} /> /* !추가로
        등록하실 친구가 있나요? */
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/binder" element={<Binder />} />
        <Route path="/binder2" element={<Binder2 />} />
      </Routes>
    </Router>
  );
}

export default App;
