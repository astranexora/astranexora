import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ParticleField from './components/ParticleField';
import CursorGlow from './components/CursorGlow';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import CaseStudyPage from './pages/CaseStudyPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-white text-ink-700">
        <CursorGlow />
        <ParticleField />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/portfolio/:id" element={<CaseStudyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
