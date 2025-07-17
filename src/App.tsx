import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { BackgroundScene } from './components/BackgroundScene';
import { useScrollRestriction } from './hooks/useScrollRestriction';
import { Button3DWrapper } from './components/Button3DWrapper';
import GlitchText from './components/GlitchText';
import CyberMap from './components/CyberMap';
import DataLogs from './components/DataLogs';

function App() {
  const [attackState, setAttackState] = useState(true); // Start in attack mode
  const [buttonPressed, setButtonPressed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [part2Unlocked, setPart2Unlocked] = useState(false); // Controls Part 2 visibility

  // Calculate scroll boundaries
  const sectionHeight = window.innerHeight;
  const transitionSectionEnd = sectionHeight * 2;
  const maxAllowedScroll = part2Unlocked ? Infinity : transitionSectionEnd;

  // Use scroll restriction hook
  useScrollRestriction({
    maxAllowedScroll,
    isUnlocked: part2Unlocked
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAttackState = () => {
    setAttackState(prev => !prev);
    setButtonPressed(true);
    setPart2Unlocked(true); // 🔑 Unlock Part 2!
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <BackgroundScene attackState={attackState} scrollY={scrollY} />
        </Canvas>
      </div>

      {/* Content Sections */}
      <div className="relative z-10">
        {/* PART 1: ATTACK MODE */}

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <GlitchText
              text="THE SOUND OF CYBER"
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
                The Sound of Cyber transforms cybersecurity into a multisensory experience using real-time sound generation technology. Network events become dynamic audio, turning abstract digital threats into immersive sensory experiences.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Each protocol produces a unique sonic signature: HTTP flows as stable tones, DNS pulses like sharp queries, while SMB under attack creates tense, distorted frequencies.
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
            {/* Fixed height container for top message */}
            <div className="min-h-[4rem] md:min-h-[5rem] flex items-center justify-center">
              {attackState && (
                <div className="text-2xl md:text-3xl font-mono text-red-400 animate-pulse">
                  EMERGENCY PROTOCOL REQUIRED
                </div>
              )}
              {buttonPressed && !attackState && (
                <div className="text-2xl md:text-3xl font-mono text-green-400 animate-pulse">
                  SYSTEM SECURED - SAFE MODE ACTIVATED
                </div>
              )}
            </div>

            {/* Fixed height container for status box */}
            <div className="min-h-[7rem] mb-6 flex items-center justify-center">
              {!part2Unlocked && (
                <div className="p-4 border border-red-500/30 bg-red-500/10 rounded">
                  <div className="text-red-400 font-mono text-sm mb-2">⚠️ ACCESS RESTRICTED</div>
                  <div className="text-gray-300 font-mono text-xs">
                    Security protocols prevent further access.<br />
                    Emergency authorization required to proceed.
                  </div>
                </div>
              )}
              {part2Unlocked && (
                <div className={`p-4 rounded ${
                  attackState 
                    ? "border border-red-500/30 bg-red-500/10" 
                    : "border border-green-500/30 bg-green-500/10"
                }`}>
                  <div className={`font-mono text-sm ${
                    attackState ? "text-red-400" : "text-green-400"
                  }`}>
                    {attackState ? "⚠️ SYSTEM COMPROMISED" : "✅ ACCESS GRANTED"}
                  </div>
                  <div className="text-gray-300 font-mono text-xs">
                    {attackState 
                      ? (
                        <>
                          Security breach detected.<br />
                          Access remains available for investigation.
                        </>
                      )
                      : "Continue scrolling to explore safe zones"
                    }
                  </div>
                </div>
              )}
            </div>

            {/* 3D Button */}
            <Button3DWrapper
              attackState={attackState}
              onClick={toggleAttackState}
              show={true}
            />

          </div>
        </section>

        {/* PART 2: SAFE MODE - Hidden until emergency protocol activated */}
        <div className={`transition-all duration-2000 transform ${
          part2Unlocked 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}>

          {/* About Section */}
          <section className={`min-h-screen flex items-center px-4 md:px-8 transition-all duration-1000 delay-300 ${
            part2Unlocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-green-400">A LIVING SYMPHONY</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                    At the heart of The Sound of Cyber is a live honeypot that continuously attracts and records real-world network activity—from scans to intrusion attempts.
                  </p>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    This traffic is interpreted in real time into a reactive soundscape, enhanced with synchronized LED lighting and visual projections.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border border-green-400/30 p-4 font-mono">
                    <div className="text-green-400">SYSTEM.STATUS</div>
                    <div className="text-gray-400">Live Honeypot Active</div>
                    <div className="text-gray-400">Real-time Audio Generation</div>
                    <div className="text-gray-400">Synchronized Visuals</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Exhibition Section */}
          <section className={`min-h-screen flex items-center px-4 md:px-8 transition-all duration-1000 delay-600 ${
            part2Unlocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}>
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
                    Experience the Sound of Cyber installation in person at the Digital Arts Center.
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
          <section className={`min-h-screen flex items-center px-4 md:px-8 transition-all duration-1000 delay-900 ${
            part2Unlocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}>
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
                    <div className="text-gray-300">zen@thesoundofcyber.org</div>
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