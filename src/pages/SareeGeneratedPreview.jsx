import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateSareeDescription } from '../services/gemini';
import './SareeGeneratedPreview.css';

const SareeGeneratedPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { blouseFront, blouseBack, sareeType, blouseColor, sareeColor } = location.state || {}; 

  const [isGenerating, setIsGenerating] = useState(true);
  const [generationStep, setGenerationStep] = useState(0);
  const [currentImage, setCurrentImage] = useState("/saree-model.jpeg"); 
  const [aiDescription, setAiDescription] = useState("");

  const handleImageError = () => {
    setCurrentImage("https://placehold.co/400x600/1a1a2e/FFF?text=Saree+Model");
  };

  useEffect(() => {
    const generateLook = async () => {
      // Helper for retry logic
      const fetchWithRetry = async (url, options, retries = 3) => {
        try {
          const res = await fetch(url, options);
          if (!res.ok && retries > 0) {
             const errorText = await res.text();
             console.warn(`Retrying API call... attempts left: ${retries}. Status: ${res.status}. Error: ${errorText}`);
             await new Promise(r => setTimeout(r, 1000));
             return fetchWithRetry(url, options, retries - 1);
          }
          if (!res.ok) throw new Error(`API Error: ${res.status}`);
          return res.json();
        } catch (err) {
          if (retries > 0) {
            await new Promise(r => setTimeout(r, 1000));
            return fetchWithRetry(url, options, retries - 1);
          }
          throw err;
        }
      };

      try {
        // Backend API Call
        const response = await fetch('http://localhost:5000/generate-look', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selections: {
              fabric: { name: sareeType },
              sareeColor: sareeColor, // Passing the full color object
              frontNeck: { name: blouseFront },
              backNeck: { name: blouseBack },
              // Passing other potential selections if needed
              blouseColor: blouseColor 
            }
          }),
        });

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();

        // Update UI with Backend Response
        if (data.description) {
          setAiDescription(data.description);
        }
        
        if (data.imageBase64) {
          setCurrentImage(`data:image/png;base64,${data.imageBase64}`);
        } else {
           console.warn("Backend did not return an image. Using fallback.");
           // Optional: keep formatted placeholder if no image
        }

      } catch (error) {
        console.error("Backend integration failed:", error);
        // Fallback or error state
        setAiDescription("Could not contact the design studio. Please try again.");
      }
    };

    generateLook();

    // 3. UI Simulation (Progress Bar)
    const steps = [
      "Analyzing selections...",
      "Consulting AI Fashion Model...",
      "Generating authentic Image (Imagen 4.0)...", 
      "Rendering final textures...",
      "Finalizing details..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setGenerationStep(currentStep);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsGenerating(false), 800);
      }
    }, 1500); // Slightly longer for real APi

    return () => clearInterval(interval);
  }, [blouseFront, blouseBack, sareeType, navigate]);

  const handleContinue = () => {
    navigate('/saree/customize', {
      state: { blouseFront, blouseBack, sareeType, baseImage: currentImage }
    });
  };

  const generationMessages = [
    "Analyzing selections...",
    "Consulting AI Fashion Model...",
    "Generating authentic Image (Imagen 4.0)...",
    "Rendering final textures...",
    "Finalizing details..."
  ];

  return (
    <div className="saree-preview-container">
      <div className="preview-header">
        <div className="container">
          <button onClick={() => navigate('/saree/select')} className="back-button" disabled={isGenerating}>
            ← Back to Selection
          </button>
          <div className="header-content fade-in">
            <h1 className="page-title">{isGenerating ? 'Generating Your Design' : 'Your Custom Design'}</h1>
            <p className="page-subtitle">
              {isGenerating ? 'Creating with Imagen 4.0...' : 'Here is the realistic preview of your selections'}
            </p>
          </div>
        </div>
      </div>

      <div className="preview-content">
        <div className="container">
          <div className="preview-card">
            {isGenerating ? (
              <div className="generation-loader">
                <div className="scanner-container">
                  <div className="scanner-line"></div>
                  <div className="ai-icon-pulse">✨</div>
                </div>
                <div className="step-indicators">
                  {generationMessages.map((msg, idx) => (
                    <div key={idx} className={`step-item ${idx <= generationStep ? 'active' : ''} ${idx === generationStep ? 'current' : ''}`}>
                      <div className="step-dot"></div>
                      <span className="step-text">{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="generated-result fade-in">
                <div className="result-image-wrapper">
                  <img src={currentImage} alt="AI Generated Saree" className="result-image" onError={handleImageError} />
                  <div className="image-overlay">
                    <span className="ai-badge">✨ Imagen 4.0 Generated</span>
                  </div>
                </div>
                
                <div className="design-info">
                  <h3 className="info-title">Design Specs</h3>
                  
                  {/* AI Generated Description Box */}
                  <div className="ai-description-box" style={{
                    background: 'rgba(168, 85, 247, 0.1)', 
                    borderLeft: '4px solid #a855f7', 
                    padding: '1rem', 
                    borderRadius: '0.5rem', 
                    marginBottom: '1.5rem',
                    color: '#e9d5ff',
                    fontStyle: 'italic'
                  }}>
                    <p><strong>✨ Designer's Note:</strong> {aiDescription || "A masterpiece of elegance."}</p>
                  </div>

                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Blouse Style</span>
                      <span className="value">{blouseFront || 'Round Neck'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Saree Type</span>
                      <span className="value">{sareeType || 'Silk'}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Model Fit</span>
                      <span className="value">Standard Drape</span>
                    </div>
                  </div>
                  
                  <div className="action-buttons">
                    <button className="secondary-button" onClick={() => navigate('/saree/select')}>Regenerate</button>
                    <button className="primary-button pulse-button" onClick={handleContinue}>Customize Colors →</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SareeGeneratedPreview;
