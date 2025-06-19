import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { BackgroundScene } from './components/BackgroundScene';
import FloatingButton from './components/FloatingButton';
import GlitchText from './components/GlitchText';
import CyberMap from './components/CyberMap';
import DataLogs from './components/DataLogs';

function App() {
  const [attackState, setAttackState] = useState(true); // Start in attack mode
  const [buttonPressed, setButtonPressed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setScrollY(scrollPosition);
      
      // Determine current section based on scroll position
      const sectionHeight = windowHeight;
      const sectionIndex = Math.floor(scrollPosition / sectionHeight);
      
      const sections = ['hero', 'concept', 'transition', 'about', 'exhibition', 'contact'];
      const section = sections[Math.min(sectionIndex, sections.length - 1)];
      setCurrentSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmergencyProtocol = () => {
    setAttackState(false);
    setButtonPressed(true);
    // Smooth scroll to safe section after activation
    setTimeout(() => {
      const aboutSection = document.querySelector('[data-section="about"]');
      aboutSection?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 3D Background Canvas */}
      <div className={`fixed inset-0 ${currentSection === 'transition' ? 'z-50' : 'z-0'}`}>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ 
            pointerEvents: currentSection === 'transition' ? 'auto' : 'none', 
            cursor: 'auto' 
          }}
        >
          <BackgroundScene attackState={attackState} scrollY={scrollY} />
          <FloatingButton 
            isAttackMode={attackState} 
            onPress={handleEmergencyProtocol}
            scrollY={scrollY}
            currentSection={currentSection}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* PART 1: ATTACK MODE */}
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <GlitchText 
              text="DARK FOREST" 
              className="text-6xl md:text-8xl font-bold mb-8" 
              isActive={attackState} 
            />
            <div className={`transition-all duration-1000 ${attackState ? "text-red-400" : "text-green-400"}`}>
              <p className="text-xl md:text-2xl font-mono mb-8 leading-relaxed">
                "What if one of the greatest threats to society and our existence is something we cannot see, feel, or
                even imagine?"
              </p>
            </div>
            {attackState && (
              <div className="text-red-500 font-mono text-lg animate-pulse">
                SYSTEM COMPROMISED - PRESS EMERGENCY BUTTON TO SECURE
              </div>
            )}
          </div>
        </section>

        {/* Concept Section */}
        <section className="min-h-screen flex items-center px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-4xl md:text-6xl font-bold mb-8 ${attackState ? "text-red-400" : "text-green-400"}`}>
                THE CONCEPT
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                An immersive art installation designed to capture the visceral and often invisible experience of a
                cybersecurity attack.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                "The universe is a dark forest..." — Cixin Liu
              </p>
            </div>
            <div className="relative">
              <CyberMap isAttackMode={attackState} />
              <DataLogs isAttackMode={attackState} />
            </div>
          </div>
        </section>

        {/* Transition Section */}
        <section className="min-h-screen flex items-center justify-center px-4 md:px-8">
          <div className="text-center">
            {!buttonPressed && (
              <div className="text-2xl md:text-3xl font-mono text-red-400 animate-pulse mb-8">
                EMERGENCY PROTOCOL REQUIRED
              </div>
            )}
            {buttonPressed && !attackState && (
              <div className="text-2xl md:text-3xl font-mono text-green-400 animate-pulse">
                SYSTEM SECURED - SAFE MODE ACTIVATED
              </div>
            )}
            {/* Section Status Indicator */}
            <div className="text-center">
              <div className="text-sm font-mono text-gray-400 mb-4">
                Current Section: {currentSection.toUpperCase()}
              </div>
              <div className="text-xs font-mono text-blue-400 mb-4">
                Button Active: {(currentSection === 'transition' && attackState) ? 'YES' : 'NO'} | 
                Canvas Z-Index: {currentSection === 'transition' ? '50' : '0'} | 
                Pointer Events: {currentSection === 'transition' ? 'ON' : 'OFF'}
              </div>
              {currentSection === 'transition' && attackState && (
                <div className="text-lg font-mono text-yellow-400 animate-pulse">
                  → Look for the 3D Emergency Button (with yellow debug box) ←
                </div>
              )}
              {currentSection !== 'transition' && attackState && (
                <div className="text-sm font-mono text-gray-500">
                  Scroll to transition section to activate button
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PART 2: SAFE MODE - For now all visible, will be hidden in Step 3 */}
        <div className={`transition-all duration-2000 ${buttonPressed ? "opacity-100" : "opacity-50"}`}>
          
          {/* About Section */}
          <section data-section="about" className="min-h-screen flex items-center px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-green-400">ABOUT THE CREATOR</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                    This installation explores the intersection of technology, security, and human perception in our
                    increasingly connected world.
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    Through immersive visualization, we experience the invisible battles fought in cyberspace every day.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border border-green-400/30 p-4 font-mono">
                    <div className="text-green-400">ARTIST.EXE</div>
                    <div className="text-gray-400">Digital Security Researcher</div>
                    <div className="text-gray-400">Interactive Media Artist</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Exhibition Section */}
          <section className="min-h-screen flex items-center px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-green-400">EXHIBITION</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="border border-green-400/30 p-6 mb-6 font-mono">
                    <div className="text-green-400 text-xl mb-2">OPENING NIGHT</div>
                    <div className="text-gray-300">March 15, 2024</div>
                    <div className="text-gray-300">19:00 - 23:00</div>
                  </div>
                  <div className="border border-green-400/30 p-6 font-mono">
                    <div className="text-green-400 text-xl mb-2">EXHIBITION PERIOD</div>
                    <div className="text-gray-300">March 15 - April 30, 2024</div>
                    <div className="text-gray-300">Gallery Hours: 10:00 - 18:00</div>
                  </div>
                </div>
                <div>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                    Experience the Dark Forest installation in person at the Digital Arts Center.
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    Immerse yourself in the invisible world of cybersecurity through interactive visualization and
                    sound.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="min-h-screen flex items-center px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-green-400">CONTACT</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="border border-green-400/30 p-6 font-mono">
                    <div className="text-green-400 mb-2">GALLERY</div>
                    <div className="text-gray-300">Digital Arts Center</div>
                    <div className="text-gray-300">123 Cyber Street</div>
                    <div className="text-gray-300">Tech District, TD 12345</div>
                  </div>
                  <div className="border border-green-400/30 p-6 font-mono">
                    <div className="text-green-400 mb-2">CONTACT</div>
                    <div className="text-gray-300">info@darkforest.art</div>
                    <div className="text-gray-300">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                    For press inquiries, private viewings, or technical information about the installation.
                  </p>
                  <div className="space-y-2 font-mono text-green-400">
                    <div>SYSTEM STATUS: {attackState ? 'COMPROMISED' : 'SECURE'}</div>
                    <div>THREAT LEVEL: {attackState ? 'CRITICAL' : 'MINIMAL'}</div>
                    <div>PROTECTION: {attackState ? 'OFFLINE' : 'ACTIVE'}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default App; 