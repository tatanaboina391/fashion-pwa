import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SareeColorCustomization.css';

// Reuse the same color palette
const colorPalette = {
  blouse: [
    { name: 'Crimson Red', value: '#DC143C' },
    { name: 'Royal Blue', value: '#4169E1' },
    { name: 'Emerald Green', value: '#50C878' },
    { name: 'Golden Yellow', value: '#FFD700' },
    { name: 'Deep Purple', value: '#9B30FF' },
    { name: 'Hot Pink', value: '#FF69B4' },
    { name: 'Turquoise', value: '#40E0D0' },
    { name: 'Coral', value: '#FF7F50' },
    { name: 'Navy Blue', value: '#000080' },
    { name: 'Maroon', value: '#800000' },
    { name: 'Teal', value: '#008080' },
    { name: 'Magenta', value: '#FF00FF' },
    { name: 'Olive Green', value: '#808000' },
    { name: 'Rose Gold', value: '#B76E79' },
    { name: 'Ivory', value: '#FFFFF0' },
    { name: 'Black', value: '#000000' }
  ],
  saree: [
    { name: 'Ruby Red', value: '#E0115F' },
    { name: 'Sapphire Blue', value: '#0F52BA' },
    { name: 'Jade Green', value: '#00A86B' },
    { name: 'Mustard Yellow', value: '#FFDB58' },
    { name: 'Lavender', value: '#E6E6FA' },
    { name: 'Peach', value: '#FFE5B4' },
    { name: 'Mint Green', value: '#98FF98' },
    { name: 'Sky Blue', value: '#87CEEB' },
    { name: 'Wine Red', value: '#722F37' },
    { name: 'Beige', value: '#F5F5DC' },
    { name: 'Burgundy', value: '#800020' },
    { name: 'Aqua', value: '#00FFFF' },
    { name: 'Champagne', value: '#F7E7CE' },
    { name: 'Silver', value: '#C0C0C0' },
    { name: 'Gold', value: '#FFD700' },
    { name: 'White', value: '#FFFFFF' }
  ]
};

const SareeColorCustomization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sareeType, hasBorder, baseImage } = location.state || {}; // receiving baseImage
  
  // Using a verified local image of a model in a saree
  const [currentImage, setCurrentImage] = useState(baseImage || "/saree-model.jpeg");

  const handleImageError = () => {
    // Fallback to a very safe placeholder
    setCurrentImage("https://placehold.co/600x800/222/fff?text=Model+View");
  };

  const [activeSection, setActiveSection] = useState('saree');
  const [selectedBlouseColor, setSelectedBlouseColor] = useState(null);
  const [selectedSareeColor, setSelectedSareeColor] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isUpdating) {
      const timer = setTimeout(() => setIsUpdating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isUpdating]);

  const handleBlouseClick = () => setActiveSection('blouse');
  const handleSareeClick = () => setActiveSection('saree');

  const isComplete = selectedBlouseColor && selectedSareeColor;

  const handleContinueTo360 = () => {
    navigate('/saree/360-view', {
      state: {
        sareeType,
        hasBorder,
        blouseColor: selectedBlouseColor,
        sareeColor: selectedSareeColor,
        finalImage: currentImage
      }
    });
  };

  return (
    <div className="color-customization-container">
      {/* Header */}
      <div className="color-header">
        <div className="container">
          <button onClick={() => navigate('/saree/preview', { state: { sareeType, hasBorder } })} className="back-button">
            ← Back to Preview
          </button>
          <div className="header-content fade-in">
            <h1 className="page-title">Customize Colors</h1>
            <p className="page-subtitle">Select colors for each part of your design</p>
          </div>
        </div>
      </div>

      <div className="app-content-wrapper">
        <div className="container">
          <div className="customization-layout">
            
            {/* Interactive Preview Area */}
            <div className="interactive-preview-area">
               
              <div className="image-container fade-in">
                {/* Base Image */}
                <img 
                  src={currentImage} 
                  alt="Saree Model" 
                  className="base-model-image" 
                  onError={handleImageError}
                />

                {/* Blouse Overlay - Adjusted for the Pexels image */}
                <div 
                  className={`color-overlay blouse-overlay ${activeSection === 'blouse' ? 'active-selection' : ''}`}
                  onClick={handleBlouseClick}
                  style={{ 
                    '--overlay-color': selectedBlouseColor?.value || 'transparent',
                    opacity: selectedBlouseColor ? 0.7 : 0 
                  }}
                >
                  <div className="overlay-label">Blouse</div>
                </div>

                {/* Saree Overlay - Adjusted for the Pexels image */}
                <div 
                  className={`color-overlay saree-overlay ${activeSection === 'saree' ? 'active-selection' : ''}`}
                  onClick={handleSareeClick}
                  style={{ 
                    '--overlay-color': selectedSareeColor?.value || 'transparent',
                    opacity: selectedSareeColor ? 0.6 : 0 
                  }}
                >
                  <div className="overlay-label">Saree</div>
                </div>

                {/* AI Processing Overlay */}
                {isUpdating && (
                  <div className="ai-processing-overlay">
                    <div className="spinner"></div>
                    <span>Applying Color...</span>
                  </div>
                )}
              </div>
              
            </div>

             {/* Color Palette Panel - Fixed Layout */}
            <div className="palette-sidebar">
               <div className="palette-group">
                 <h3>Blouse Color</h3>
                 <div className="color-grid-compact">
                   {colorPalette.blouse.map((color, idx) => (
                     <button
                       key={idx}
                       className={`color-btn-small ${selectedBlouseColor?.value === color.value ? 'selected' : ''}`}
                       onClick={() => { setSelectedBlouseColor(color); setIsUpdating(true); }}
                       style={{ backgroundColor: color.value }}
                       title={color.name}
                     />
                   ))}
                 </div>
                 <div className="selected-color-name">{selectedBlouseColor?.name || 'Select a color'}</div>
               </div>

               <div className="palette-divider"></div>

               <div className="palette-group">
                 <h3>Saree Color</h3>
                 <div className="color-grid-compact">
                   {colorPalette.saree.map((color, idx) => (
                     <button
                       key={idx}
                       className={`color-btn-small ${selectedSareeColor?.value === color.value ? 'selected' : ''}`}
                       onClick={() => { setSelectedSareeColor(color); setIsUpdating(true); }}
                       style={{ backgroundColor: color.value }}
                       title={color.name}
                     />
                   ))}
                 </div>
                 <div className="selected-color-name">{selectedSareeColor?.name || 'Select a color'}</div>
               </div>

               {isComplete && (
                 <button className="primary-button full-width margin-top" onClick={handleContinueTo360}>
                   View 360° Result →
                 </button>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SareeColorCustomization;
