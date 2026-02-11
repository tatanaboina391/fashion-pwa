import { useLocation, useNavigate } from 'react-router-dom';
import './SareePencilSketch.css';

const SareePencilSketch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { blouseFront, blouseBack, sareeType } = location.state || {};

  // If no selections, redirect back
  if (!blouseFront || !blouseBack || !sareeType) {
    navigate('/saree/select');
    return null;
  }

  const handleContinueToColor = () => {
    navigate('/saree/customize', {
      state: {
        blouseFront,
        blouseBack,
        sareeType
      }
    });
  };

  return (
    <div className="saree-sketch-container">
      {/* Header */}
      <div className="sketch-header">
        <div className="container">
          <button onClick={() => navigate('/saree/select')} className="back-button">
            ← Back to Selection
          </button>
          <div className="header-content fade-in">
            <h1 className="page-title">Your Saree Design Preview</h1>
            <p className="page-subtitle">Pencil sketch based on your selections</p>
          </div>
        </div>
      </div>

      <div className="sketch-content">
        <div className="container">
          {/* Selection Details */}
          <div className="selection-details fade-in">
            <h3 className="details-title">Your Selections</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-icon">👚</span>
                <div className="detail-info">
                  <span className="detail-label">Front Neck</span>
                  <span className="detail-value">{blouseFront}</span>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">👗</span>
                <div className="detail-info">
                  <span className="detail-label">Back Neck</span>
                  <span className="detail-value">{blouseBack}</span>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🥻</span>
                <div className="detail-info">
                  <span className="detail-label">Saree Type</span>
                  <span className="detail-value">{sareeType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pencil Sketch Preview */}
          <div className="sketch-preview fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="sketch-frame">
              <div className="sketch-canvas">
                {/* Pencil Sketch Illustration */}
                <div className="sketch-illustration">
                  {/* Blouse Sketch */}
                  <div className="blouse-sketch">
                    <svg viewBox="0 0 200 150" className="sketch-svg">
                      {/* Blouse outline */}
                      <path
                        d="M 60 40 Q 50 30 40 40 L 40 90 Q 40 100 50 100 L 90 100 Q 100 100 100 90 L 100 40 Q 100 30 90 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sketch-path"
                      />
                      {/* Neck design indicator */}
                      <path
                        d="M 60 40 Q 70 35 80 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3,3"
                        className="sketch-path"
                      />
                      {/* Sleeves */}
                      <path
                        d="M 40 40 L 20 60 Q 15 70 25 75 L 40 65"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sketch-path"
                      />
                      <path
                        d="M 100 40 L 120 60 Q 125 70 115 75 L 100 65"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sketch-path"
                      />
                      {/* Detail lines */}
                      <line x1="50" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                      <line x1="50" y1="60" x2="90" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                      <line x1="50" y1="70" x2="90" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                    </svg>
                    <div className="sketch-label blouse-label">Blouse</div>
                  </div>

                  {/* Saree Sketch */}
                  <div className="saree-sketch">
                    <svg viewBox="0 0 200 250" className="sketch-svg">
                      {/* Saree drape */}
                      <path
                        d="M 40 20 Q 30 30 35 50 L 35 200 Q 35 220 50 220 L 90 220 Q 105 220 105 200 L 105 50 Q 110 30 100 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sketch-path"
                      />
                      {/* Pallu */}
                      <path
                        d="M 100 20 Q 120 15 140 30 L 130 80 Q 125 90 115 85 L 105 50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sketch-path"
                      />
                      {/* Pleats */}
                      <path
                        d="M 50 100 L 55 120 M 60 100 L 65 120 M 70 100 L 75 120 M 80 100 L 85 120"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="sketch-path"
                      />
                      {/* Border design */}
                      <path
                        d="M 35 50 L 35 200"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="5,5"
                        className="sketch-path border-path"
                      />
                      <path
                        d="M 105 50 L 105 200"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray="5,5"
                        className="sketch-path border-path"
                      />
                      {/* Texture lines */}
                      {[...Array(15)].map((_, i) => (
                        <line
                          key={i}
                          x1="40"
                          y1={60 + i * 10}
                          x2="100"
                          y2={60 + i * 10}
                          stroke="currentColor"
                          strokeWidth="0.3"
                          opacity="0.3"
                        />
                      ))}
                    </svg>
                    <div className="sketch-label saree-label">Saree</div>
                  </div>
                </div>

                {/* Sketch Info */}
                <div className="sketch-info">
                  <p className="sketch-note">
                    <span className="note-icon">✏️</span>
                    This is a pencil sketch preview of your custom design
                  </p>
                </div>
              </div>

              {/* Sketch Paper Effect */}
              <div className="paper-texture"></div>
            </div>
          </div>

          {/* Design Notes */}
          <div className="design-notes fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="notes-title">Design Features</h3>
            <div className="notes-grid">
              <div className="note-card">
                <span className="note-icon">🎨</span>
                <h4>Front Neck Style</h4>
                <p>{blouseFront}</p>
              </div>
              <div className="note-card">
                <span className="note-icon">✨</span>
                <h4>Back Neck Style</h4>
                <p>{blouseBack}</p>
              </div>
              <div className="note-card">
                <span className="note-icon">🧵</span>
                <h4>Saree Fabric</h4>
                <p>{sareeType}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-section">
            <button className="secondary-button" onClick={() => navigate('/saree/select')}>
              ← Change Selection
            </button>
            <button className="primary-button" onClick={handleContinueToColor}>
              Continue to Customize Colors →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SareePencilSketch;
