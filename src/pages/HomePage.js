import React, { useEffect, useRef } from 'react';
import yourLogo from '../images/logo hd.png'; // Make sure this path is correct

const HomePage = ({ onConnect }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      
      // FIX: Use backticks (`) for the template literal string
      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
    };

    // Attaching the event listener to the container div itself is more efficient
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const css = `
    /* Import Poppins font from Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700;800&display=swap');

    /* Root variables for mouse tracking */
    :root {
      --mouse-x: 50%;
      --mouse-y: 50%;
    }
    
    /* Main Container & Base Styles */
    .homepage-container {
      min-height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #E0E0E0;
      background: #0D0D0D;
      font-family: 'Poppins', sans-serif;
      position: relative;
      overflow: hidden; /* Important: Prevents scrollbars from side glows */
      padding: 5vh 20px;
      box-sizing: border-box;
    }
    
    .homepage-content {
      z-index: 5;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .logo {
      width: 300px;
      height: 190px;
      object-fit: cover;
      object-position: top; 
    }
    
    /* Heading Text Styling */
    .homepage-content h1 {
      font-size: 5.5rem;
      font-weight: 800;
      margin-bottom: 0;
      background: linear-gradient(45deg, #00FF7F, #00BFFF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 15px rgba(0, 255, 127, 0.5);
      line-height: 1.1;
      text-transform: uppercase;
    }

    /* Subheading/Tagline */
    .homepage-content h2 {
      font-size: 2rem;
      font-weight: 400;
      margin-top: 1rem;
      margin-bottom: 2rem;
      color: #b0b0b0;
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      max-width: 600px;
    }
    
    /* The Main Call-to-Action Button */
    .homepage-content button {
      padding: 20px 45px;
      font-size: 1.5rem;
      font-weight: bold;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      color: #0D0D0D;
      background: linear-gradient(135deg, #00FF7F, #00BFFF);
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 0 20px #00BFFF;
      letter-spacing: 1.5px;
      animation: pulse-button-glow 2.5s infinite ease-in-out;
      margin-bottom: 3rem;
    }

    .homepage-content button:hover {
      transform: scale(1.08);
      box-shadow: 0 0 35px #00FF7F;
    }
    
    .homepage-content button:active {
      transform: scale(0.98);
    }

    /* Feature points */
    .feature-points {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-bottom: 3rem;
      max-width: 800px;
      font-size: 1.1rem;
      text-align: center;
    }

    .feature-points li {
      color: #A9A9A9;
      max-width: 250px;
    }

    .feature-points li span {
      display: block;
      font-size: 2.5rem;
      margin-bottom: 10px;
      background: linear-gradient(45deg, #00FF7F, #00BFFF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    /* Connection modes */
    .connection-modes {
      margin-top: 3rem;
      color: #777;
      font-size: 1rem;
    }
    .connection-modes p { margin: 0; }
    .connection-modes span { font-weight: bold; color: #999; }
    
    /* --- Background Effects --- */
    .mouse-light, .abstract-shape, .glowing-lines, .grid-pattern, .side-glow-left, .side-glow-right {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .mouse-light {
      background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(0, 191, 255, 0.1) 0%, transparent 20%);
      z-index: 6;
    }
    .abstract-shape {
      width: 50%;
      background: radial-gradient(circle, #00BFFF, transparent 50%);
      filter: blur(150px); opacity: 0.3; z-index: 1;
      animation: glow-move 20s infinite alternate ease-in-out;
    }
    .glowing-lines {
      display: flex; justify-content: space-around; z-index: 2; opacity: 0.1;
    }
    .glowing-lines .line {
      width: 1px; height: 100%; background: #00BFFF;
      box-shadow: 0 0 10px #00BFFF;
      animation: line-fade 8s infinite alternate;
    }
    .glowing-lines .line:nth-child(even) { animation-delay: 2s; }
    .grid-pattern {
      background-size: 40px 40px;
      background-image:
        linear-gradient(to right, rgba(0, 255, 127, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 255, 127, 0.05) 1px, transparent 1px);
      animation: pan-grid 50s linear infinite; z-index: 0;
    }

    /* Side Glow Effects */
    .side-glow-left, .side-glow-right {
        top: 50%;
        transform: translateY(-50%);
        width: 600px;
        height: 600px;
        border-radius: 50%;
        filter: blur(180px);
        opacity: 0.25;
        z-index: 3;
        animation: side-glow-anim 15s infinite ease-in-out alternate;
    }

    .side-glow-left {
        left: -300px;
        background: radial-gradient(circle, #00FF7F, transparent 70%);
    }

    .side-glow-right {
        right: -300px;
        left: auto;
        background: radial-gradient(circle, #00FF7F, transparent 70%);
    }
    .Heading{
    color: #45d28cff;
    }
    /* Keyframe Animations */
    @keyframes glow-move { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
    @keyframes line-fade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pan-grid { from { background-position: 0 0; } to { background-position: 40px 40px; } }
    @keyframes pulse-button-glow {
      0% { box-shadow: 0 0 20px #00BFFF; }
      50% { box-shadow: 0 0 35px #00FF7F; }
      100% { box-shadow: 0 0 20px #00BFFF; }
    }
    @keyframes side-glow-anim {
      0% { transform: translateY(-50%) scale(1); }
      50% { transform: translateY(-55%) scale(1.05); }
      100% { transform: translateY(-50%) scale(1); }
    }
  `;

  return (
    <div className="homepage-container" ref={containerRef}>
      <style>{css}</style>
      
      {/* Background elements */}
      <div className="mouse-light"></div>
      <div className="abstract-shape"></div>
      <div className="glowing-lines">
        {[...Array(6)].map((_, i) => <div className="line" key={i}></div>)}
      </div>
      <div className="grid-pattern"></div>

      {/* Side Glow Elements */}
      <div className="side-glow-left"></div>
      <div className="side-glow-right"></div>

      <div className="homepage-content">
        <img src={yourLogo} className="logo" alt="Flirtify Logo" />
        
        <h1>Flirtify</h1>
        <h2>Start something real. On-chain reputation means you connect with genuine people, every time.</h2>
        
        <button onClick={onConnect}>
          Connect & Begin Your Journey
        </button>

        <ul className="feature-points">
          <li>
            <span>💬</span>
            <strong className='Heading'>Verified Profiles</strong><br/>
            Connect with real people, not bots, thanks to our on-chain verification.
          </li>
          <li>
            <span>💗</span>
            <strong className='Heading'>Rewarded Kindness</strong><br/>
            Earn for being a great community member and fostering respectful conversations.
          </li>
          <li>
            <span>🤝</span>
            <strong className='Heading'>Build Trust</strong><br/>
            Your positive reputation is your greatest asset, secured forever on the blockchain.
          </li>
        </ul>
        
        <div className="connection-modes">
          <p>Go beyond dating. Use Flirtify to <span>Find a Partner</span>, <span>Meet Friends</span>, or <span>Grow Your Network</span>.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
