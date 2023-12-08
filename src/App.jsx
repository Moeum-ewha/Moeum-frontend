import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import WritePost from './Pages/WritePost';
import ViewPost from './Pages/ViewPost';
import './App.css';
import AddName from './Pages/AddName';
import IsNewFriend from './Pages/IsNewFriend';
import IsSavedFriend from './Pages/IsSavedFriend';
import FaceRecogniton from './Pages/FaceRecogniton';
import IsAnyoneMore from './Pages/IsAnyoneMore';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Binder from './Pages/Binder';
import Settings from './Pages/Settings';
import Map from './Pages/Map';
import Entrance from './Pages/Entrance';
import ShareView from './Pages/ShareView';
import SelectFriend from './Pages/SelectFriend';
import HomeScreen from './Pages/HomeScreen';
import FriendPostList from './Pages/FriendPostList';

axios.defaults.baseURL = 'https://api.moeum.site';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Entrance />} />
        <Route path="/posting" element={<WritePost />} />
        <Route path="/viewpost/:postId" element={<ViewPost />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/friendpostlist/:id" element={<FriendPostList />} />
        <Route path="/addname" element={<AddName />} />
        <Route path="/isnewfriend" element={<IsNewFriend />} />
        <Route path="/issavedfriend" element={<IsSavedFriend />} />
        <Route path="/isanyonemore" element={<IsAnyoneMore />} />
        <Route path="/selectfriend" element={<SelectFriend />} />
        <Route path="/facerecognition" element={<FaceRecogniton />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/binder" element={<Binder />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/map" element={<Map />} />
        <Route path="/share/:postId" element={<ShareView />} />
      </Routes>
    </Router>
  );
}

export default App;
