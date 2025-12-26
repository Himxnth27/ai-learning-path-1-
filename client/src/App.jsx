import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import LearningPath from './pages/LearningPath';
import Resume from './pages/Resume';
import Interview from './pages/Interview';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/skills" element={<LearningPath />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/dashboard" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
