import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Loading from './Pages/Loading';
import WritePost from './Pages/WritePost';
import { FaceReCog } from './Pages/FaceRecog';
import ViewPost from './Pages/ViewPost';
import './App.css';
import FaceClassifi from './Pages/FaceClassifi';
import FaceClassifi2 from './Pages/FaceClassifi2';
import FaceClassifi3 from './Pages/FaceClassifi3';
import FaceClassifi4 from './Pages/FaceClassifi4';
import NumofPp from './Pages/NumofPp';
import NumofPp2 from './Pages/NumofPp2';
import Choice from './Pages/Choice';
import Choice2 from './Pages/Choice2';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import HomeScreen from './Pages/HomeScreen';
import Binder from './Pages/Binder';
import Settings from './Pages/Settings';
import Map from './Pages/Map';
import Entrance from './Pages/Entrance';

function App() {
 /* const [loading, setLoading] = useState(true);
  useEffect(() => {
    // 비동기 작업 또는 데이터 로딩이 완료된 후에 setLoading(false)를 호출하여 로딩 상태 변경
    fetchData()
      .then(() => setLoading(false))
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false); // 에러 발생 시에도 로딩 상태를 변경하여 로딩 스피너를 숨김
      });
  }, []);

  const fetchData = async () => {
    // 여기서 실제 데이터를 가져오는 비동기 작업을 수행
    return new Promise(resolve => {
      setTimeout(() => {
        // 예시: 3초 후에 데이터 로딩이 완료됐다고 가정
        resolve();
      }, 3000);
    });
  };

*/
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/posting" element={<WritePost />} />
        <Route path="/facerecognition" element={<FaceReCog />} />
        <Route path="/viewpost" element={<ViewPost />} />
        <Route path="/faceclassification" element={<FaceClassifi />} /> /*
        친구의 이름이 무엇인가요 */
        <Route path="/faceclassification2" element={<FaceClassifi2 />} /> /* (새로운 친구)님이 맞나요? */
        <Route path="/faceclassification3" element={<FaceClassifi3 />} /> /* !(혜준)님이 맞나요? */
        <Route path="/faceclassification4" element={<FaceClassifi4 />} /> /* !(혜준)님이 맞나요? but 유진*/
        <Route path="/choice" element={<Choice />} />  /* !추가로
        등록하실 친구가 있나요? */
        <Route path="/choice2" element={<Choice2 />} />  /* !추가로
        등록하실 친구가 있나요? */
        <Route path="/facerecognition1" element={<NumofPp />} /> /* 사진 속에서 저장하고자 하는 친구를 선택해주세요*/ //기존에 할당해둔 NumofPp2는 '인식
        개별뷰 - 등록된 다른 친구일 시' 화면이라 바꿔둠
        <Route path="/facerecognition2" element={<NumofPp2 />} /> /* !사진 속 친구를 선택해주세요. */
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/binder" element={<Binder />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
