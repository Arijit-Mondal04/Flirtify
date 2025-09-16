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
      
      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const css = `
    /* Root variables for mouse tracking */
    :root {
      --mouse-x: 50%;
      --mouse-y: 50%;
    }
    
    /* Main Container & Base Styles */
    .homepage-container {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #E0E0E0;
      background: #000;
      padding: 50px;
      font-family: 'Poppins', sans-serif;
      position: relative;
      overflow: hidden;
    }
    
    .homepage-content {
      z-index: 5; /* Puts content above all backgrounds and effects */
      position: relative;
    }

    /* Logo Styling */
    .logo {
      width: 250px;
      height: auto;
      margin-bottom: 2rem;
      animation: float-logo 4s ease-in-out infinite alternate;
      filter: drop-shadow(0 0 20px #00FF7F);
    }
    
    /* Heading Text Styling */
    .homepage-content h1 {
      font-size: 6rem;
      font-weight: 800;
      margin-bottom: 0;
      letter-spacing: 5px;
      background: linear-gradient(45deg, #FFD166, #EF476F);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      line-height: 1;
      text-transform: uppercase;
    }

    /* New Relatable Texts */
    .homepage-content h2 {
      font-size: 3rem;
      font-weight: 200;
      margin-top: 1rem;
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
      color: #9c9c9c;
    }
    
    .tagline-points {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 1.5rem auto 2rem;
      max-width: 700px;
      font-size: 1.2rem;
      text-align: left;
    }

    .tagline-points li {
      display: flex;
      align-items: center;
      color: #A9A9A9;
    }

    .tagline-points li span {
      font-size: 1.5rem;
      margin-right: 15px;
      background: linear-gradient(45deg, #00FF7F, #8A2BE2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    /* The Very Attractive Button */
    .homepage-content button {
      padding: 22px 50px;
      font-size: 1.6em;
      font-weight: bold;
      border: none;
      border-radius: 60px;
      cursor: pointer;
      color: #0D0D0D;
      background: linear-gradient(135deg, #8A2BE2, #00FF7F, #FFD700);
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: 0 0 20px #8A2BE2;
      text-transform: uppercase;
      letter-spacing: 1px;
      animation: pulse-button-glow 2.5s infinite ease-in-out;
    }

    .homepage-content button:hover {
      transform: scale(1.1) translateY(-5px);
      box-shadow: 0 0 30px #00FF7F;
      background: linear-gradient(135deg, #00FF7F, #FFD700, #8A2BE2);
    }
    
    .homepage-content button:active {
      transform: scale(0.95);
    }
    
    /* --- Futuristic Background Effects --- */

    /* Mouse-tracking glow */
    .mouse-light {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at var(--mouse-x) var(--mouse-y),
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 15%
      );
      pointer-events: none;
      z-index: 6;
    }

    /* Abstract glowing shape */
    .abstract-shape {
      position: absolute;
      width: 60%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, #8A2BE2, transparent 50%);
      filter: blur(150px);
      opacity: 0.4;
      z-index: 1;
      animation: glow-move 25s infinite ease-in-out;
    }
    
    /* Thin vertical lines */
    .glowing-lines {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      z-index: 2;
      opacity: 0.15;
    }

    .glowing-lines .line {
      width: 2px;
      height: 100%;
      background: #8A2BE2;
      box-shadow: 0 0 10px #8A2BE2, 0 0 20px #8A2BE2;
      animation: line-fade 10s infinite;
    }
    .glowing-lines .line:nth-child(2) { animation-delay: 2s; }
    .glowing-lines .line:nth-child(3) { animation-delay: 4s; }
    .glowing-lines .line:nth-child(4) { animation-delay: 6s; }
    .glowing-lines .line:nth-child(5) { animation-delay: 8s; }
    
    /* Subtle grid pattern */
    .grid-pattern {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: 50px 50px;
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      animation: pan-grid 60s linear infinite;
      z-index: 0;
    }
    
    /* Keyframe Animations */
    @keyframes glow-move {
      0%, 100% { transform: translate(-50%, -50%); }
      25% { transform: translate(-60%, -40%); }
      50% { transform: translate(-40%, -60%); }
      75% { transform: translate(-55%, -55%); }
    }

    @keyframes line-fade {
      0%, 100% { opacity: 0; transform: scaleY(0); }
      50% { opacity: 1; transform: scaleY(1); }
    }
    
    @keyframes pan-grid {
      from { background-position: 0 0; }
      to { background-position: 50px 50px; }
    }

    @keyframes float-logo {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }

    @keyframes pulse-button-glow {
      0% { box-shadow: 0 0 20px #8A2BE2; }
      50% { box-shadow: 0 0 30px #00FF7F; }
      100% { box-shadow: 0 0 20px #8A2BE2; }
    }
  `;

  return (
    <div className="homepage-container" ref={containerRef}>
      <style>{css}</style>
      
      {/* Dynamic mouse-tracking light */}
      <div className="mouse-light"></div>
      
      {/* Background elements */}
      <div className="abstract-shape"></div>
      <div className="glowing-lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="grid-pattern"></div>

      <div className="homepage-content">
        <img src={yourLogo} className="logo" alt="Flirtify Logo" />
        
        <h1>Flirtify 💖</h1>
        <h2>Where Genuine Connections Spark</h2>
        
        <ul className="tagline-points">
          <li><span>✨</span> Say goodbye to spam and ghosting with our unique staking system.</li>
          <li><span>💰</span> Earn crypto rewards for quality conversations and confirmed dates.</li>
          <li><span>🔒</span> Your reputation is stored on the blockchain, creating a trusted community.</li>
          <li><span>🚀</span> Experience instant, low-cost transactions powered by Algorand.</li>
        </ul>
        
        <button onClick={onConnect}>
          Connect Wallet to Begin
        </button>
      </div>
    </div>
  );
};

export default HomePage;