import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Saree360View.css';

const Saree360View = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sareeType, blouseColor, sareeColor, hasBorder, finalImage } = location.state || {}; // Receiving finalImage

  // State for the image with error handling
  const [currentImage, setCurrentImage] = useState(finalImage || "/saree-model.jpeg");

  const handleImageError = () => {
    setCurrentImage("https://placehold.co/400x600/1a1a2e/FFF?text=Saree+Model");
  };

  // If no selections, redirect back
  if (!sareeType) {
    navigate('/saree/select');
    return null;
  }

  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating && !isDragging) {
      const interval = setInterval(() => {
        setRotation((prev) => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      setRotation((prev) => (prev + deltaX * 0.5) % 360);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const deltaX = e.touches[0].clientX - startX;
      setRotation((prev) => (prev + deltaX * 0.5) % 360);
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleSliderChange = (e) => {
    setIsAutoRotating(false);
    setRotation(parseInt(e.target.value));
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  return (
    <div className="saree-360-container">
      {/* Header */}
      <div className="view-360-header">
        <div className="container">
          <button 
            onClick={() => navigate('/saree/customize', { 
              state: { sareeType, sareeColor, blouseColor, hasBorder, baseImage: currentImage } 
            })} 
            className="back-button"
          >
            ← Back to Colors
          </button>
          <div className="header-content fade-in">
            <h1 className="page-title">360° Real View</h1>
            <p className="page-subtitle">Your AI-designed saree from every angle</p>
          </div>
        </div>
      </div>

      <div className="view-360-content">
        <div className="container">
          {/* Design Summary */}
          <div className="design-summary fade-in">
            <div className="summary-grid">
              <div className="summary-card">
                <span className="summary-icon">✨</span>
                <div className="summary-info">
                  <span className="summary-label">Border Style</span>
                  <span className="summary-value">{hasBorder ? 'With Border' : 'No Border'}</span>
                </div>
              </div>
              <div className="summary-card">
                <span className="summary-icon">🥻</span>
                <div className="summary-info">
                  <span className="summary-label">Saree</span>
                  <span className="summary-value">{sareeType}</span>
                  <div className="color-indicator" style={{ backgroundColor: sareeColor?.value }}>
                    {sareeColor?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 360 View Section */}
          <div className="view-360-section fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="view-stage">
              {/* 3D Rotation Display */}
              <div
                className="rotation-display"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                <div className="saree-3d-model" style={{ transform: `rotateY(${rotation}deg)` }}>
                  
                  {/* Front Face - Realistic Image */}
                  <div className="model-face front">
                     <div className="face-image-container">
                        <img 
                          src={currentImage} 
                          alt="Front View" 
                          className="model-img" 
                          onError={handleImageError}
                        />
                        {/* Apply Color Tints on 3D Model Faces too */}
                        <div 
                          className="color-overlay blouse-overlay"
                          style={{ '--overlay-color': blouseColor?.value, opacity: 0.6 }}
                        ></div>
                        <div 
                          className="color-overlay saree-overlay"
                          style={{ '--overlay-color': sareeColor?.value, opacity: 0.5 }}
                        ></div>
                     </div>
                  </div>

                  {/* Back Face - Duplicated for demo (Ideally AI generates back view) */}
                  <div className="model-face back">
                     <div className="face-image-container">
                        <img 
                           src={currentImage} 
                           alt="Back View" 
                           className="model-img" 
                           onError={handleImageError}
                        />
                        <div className="color-overlay blouse-overlay" style={{ '--overlay-color': blouseColor?.value, opacity: 0.6 }}></div>
                        <div className="color-overlay saree-overlay" style={{ '--overlay-color': sareeColor?.value, opacity: 0.5 }}></div>
                        {/* Darken back face slightly to distinguish */}
                        <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.1)'}}></div>
                     </div>
                  </div>

                  {/* Side Faces - Simple colored panels for structure */}
                  <div className="model-face left" style={{background: sareeColor?.value}}></div>
                  <div className="model-face right" style={{background: sareeColor?.value}}></div>

                </div>

                {/* Interaction Hint */}
                {!isDragging && isAutoRotating && (
                  <div className="interaction-hint">
                    <span className="hint-icon">🖱️</span>
                    <span className="hint-text">Drag to rotate model</span>
                  </div>
                )}
              </div>

            </div>

            {/* Controls */}
            <div className="view-controls">
              <div className="control-group">
                <label className="control-label">360° Rotation</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={handleSliderChange}
                  className="rotation-slider"
                />
              </div>

              <div className="control-buttons">
                <button
                  className={`control-button ${isAutoRotating ? 'active' : ''}`}
                  onClick={toggleAutoRotate}
                >
                  {isAutoRotating ? 'Pause' : 'Auto Rotate'}
                </button>
                <button
                  className="control-button"
                  onClick={() => setRotation(0)}
                >
                  Front View
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-section">
            <button className="secondary-button" onClick={() => navigate('/')}>
              Save to Wishlist
            </button>
            <button className="primary-button" onClick={() => navigate('/saree/select')}>
              Design Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saree360View;
