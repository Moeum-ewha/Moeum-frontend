import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entrance from './Pages/Entrance';
import Home from './Pages/Home';
import { FaceReCog } from './Pages/FaceRecog';
import ViewPost from './Pages/ViewPost';
import './App.css';
import FaceClassifi from "./Pages/FaceClassifi";
import FaceClassifi2 from "./Pages/FaceClassifi2";
import NumofPp from "./Pages/NumofPp"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/home" element={<Home />} />
        <Route path="/facerecognition" element={<FaceReCog />} />
        <Route path="/view" element={<ViewPost />} />
        <Route path="/faceclassification" element={<FaceClassifi />} />
        <Route path="/faceclassification2" element={<FaceClassifi2 />} />
        <Route path="/howmanypeople" element={<NumofPp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
