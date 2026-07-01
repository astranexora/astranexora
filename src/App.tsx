import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticleField from './components/ParticleField';
import CursorGlow from './components/CursorGlow';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import CaseStudyPage from './pages/CaseStudyPage';
import AIRobot from './components/AIRobot';

// Global event for opening the start project modal
export const openStartProjectModal = () => {
  window.dispatchEvent(new CustomEvent('openStartProjectModal'));
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener('openStartProjectModal', handleOpenModal);
    return () => window.removeEventListener('openStartProjectModal', handleOpenModal);
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-black-950 text-white">
        <CursorGlow />
        <ParticleField />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:id" element={<ServicePage />} />
          <Route path="/portfolio/:id" element={<CaseStudyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <AIRobot onStartProject={() => setIsModalOpen(true)} />
      </div>
    </BrowserRouter>
  );
}
