import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import HomePage from './components/HomePage/HomePage';
import DashBoard from './components/DashBoard/DashBoard';
import StoryForm from './components/StoryForm/StoryForm';
// import ProfilePage from './components/ProfilePage/ProfilePage';
import StoryDisplay from './components/StoryDisplay/StoryDisplay';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/create-story" element={<StoryForm />} />
        <Route path="/stories" element={<StoryDisplay />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
