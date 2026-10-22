import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [cameraStream, setCameraStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Camera, 2: Screen, 3: Ready

  const videoRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream, step]);

  useEffect(() => {
    if (screenRef.current && screenStream) {
      screenRef.current.srcObject = screenStream;
    }
  }, [screenStream, step]);

  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCameraStream(stream);
      setError('');
      setStep(2);
    } catch (err) {
      setError('Camera access denied or unavailable. Please grant permissions to continue.');
    }
  };

  const requestScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenStream(stream);
      setError('');
      setStep(3);
    } catch (err) {
      setError('Screen share access denied. Please allow screen sharing for the exam.');
    }
  };

  return (
    <div className="app-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <main className={`main-content ${step > 1 ? 'split-layout' : ''}`}>
        
        {/* Left Side: Instructions / Actions */}
        <section className="action-section glass-panel">
          <div className="header">
            <div className="logo-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>ExamProctor</span>
            </div>
            <h1>Secure Exam Setup</h1>
            <p className="subtitle">Please complete the following steps to begin your examination.</p>
          </div>

          <div className="steps-container">
            <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              <div className="step-indicator">1</div>
              <div className="step-content">
                <h3>Camera & Microphone</h3>
                <p>Required to verify your identity and monitor the environment.</p>
                {step === 1 && (
                  <button className="primary-btn" onClick={requestCamera}>
                    Enable Camera
                  </button>
                )}
                {step > 1 && <span className="status-badge success">Granted</span>}
              </div>
            </div>

            <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              <div className="step-indicator">2</div>
              <div className="step-content">
                <h3>Screen Sharing</h3>
                <p>Required to ensure exam integrity.</p>
                {step === 2 && (
                  <button className="primary-btn" onClick={requestScreenShare}>
                    Enable Screen Share
                  </button>
                )}
                {step > 2 && <span className="status-badge success">Granted</span>}
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {step === 3 && (
            <div className="success-section">
              <div className="success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3>All set!</h3>
              <p>Your environment is secure. Good luck on your exam.</p>
              <button className="primary-btn start-exam-btn">
                Start Examination
              </button>
            </div>
          )}
        </section>

        {/* Right Side: Media Previews */}
        {step > 1 && (
          <section className="preview-section">
            {cameraStream && (
              <div className="video-container camera-preview glass-panel">
                <div className="video-header">
                  <span className="live-indicator"></span>
                  Camera Feed
                </div>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="media-feed"
                />
              </div>
            )}
            
            {screenStream && (
              <div className="video-container screen-preview glass-panel">
                <div className="video-header">
                  <span className="live-indicator screen-indicator"></span>
                  Screen Share Feed
                </div>
                <video 
                  ref={screenRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="media-feed"
                />
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
