import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Customize.css';

const customizationOptions = {
  colors: [
    { id: 'red', name: 'Ruby Red', hex: '#DC2626' },
    { id: 'blue', name: 'Sapphire Blue', hex: '#2563EB' },
    { id: 'green', name: 'Emerald Green', hex: '#059669' },
    { id: 'purple', name: 'Royal Purple', hex: '#7C3AED' },
    { id: 'pink', name: 'Rose Pink', hex: '#EC4899' },
    { id: 'gold', name: 'Golden', hex: '#F59E0B' },
    { id: 'black', name: 'Midnight Black', hex: '#1F2937' },
    { id: 'white', name: 'Pearl White', hex: '#F3F4F6' },
  ],
  designs: [
    { id: 'floral', name: 'Floral Pattern', description: 'Elegant floral embroidery' },
    { id: 'geometric', name: 'Geometric', description: 'Modern geometric designs' },
    { id: 'traditional', name: 'Traditional', description: 'Classic ethnic patterns' },
    { id: 'contemporary', name: 'Contemporary', description: 'Trendy modern designs' },
    { id: 'embroidered', name: 'Embroidered', description: 'Handcrafted embroidery' },
    { id: 'printed', name: 'Printed', description: 'Digital printed patterns' },
  ],
  fabrics: [
    { id: 'silk', name: 'Silk', description: 'Premium silk fabric' },
    { id: 'cotton', name: 'Cotton', description: 'Comfortable cotton' },
    { id: 'georgette', name: 'Georgette', description: 'Light and flowy' },
    { id: 'chiffon', name: 'Chiffon', description: 'Elegant and sheer' },
    { id: 'velvet', name: 'Velvet', description: 'Luxurious velvet' },
    { id: 'satin', name: 'Satin', description: 'Smooth and shiny' },
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'],
};

const Customize = () => {
  const { categoryId, itemId } = useParams();
  const navigate = useNavigate();
  
  const [customization, setCustomization] = useState({
    color: 'pink',
    design: 'floral',
    fabric: 'silk',
    size: 'M',
    notes: ''
  });

  const handleColorSelect = (colorId) => {
    setCustomization(prev => ({ ...prev, color: colorId }));
  };

  const handleDesignSelect = (designId) => {
    setCustomization(prev => ({ ...prev, design: designId }));
  };

  const handleFabricSelect = (fabricId) => {
    setCustomization(prev => ({ ...prev, fabric: fabricId }));
  };

  const handleSizeSelect = (size) => {
    setCustomization(prev => ({ ...prev, size }));
  };

  const handleNotesChange = (e) => {
    setCustomization(prev => ({ ...prev, notes: e.target.value }));
  };

  const handleSubmit = () => {
    console.log('Customization submitted:', customization);
    alert('Customization saved! In a real app, this would be sent to the backend.');
  };

  const handleBack = () => {
    navigate(`/category/${categoryId}`);
  };

  const selectedColor = customizationOptions.colors.find(c => c.id === customization.color);

  return (
    <div className="customize-container">
      {/* Header */}
      <div className="customize-header">
        <div className="container">
          <button onClick={handleBack} className="back-button">
            ← Back to {categoryId}
          </button>
          <div className="customize-header-content fade-in">
            <h1 className="customize-title">Customize Your Design</h1>
            <p className="customize-subtitle">Make it uniquely yours</p>
          </div>
        </div>
      </div>

      <div className="customize-content">
        <div className="container">
          <div className="customize-layout">
            {/* Preview Section */}
            <div className="preview-section">
              <div className="preview-card">
                <div className="preview-label">Live Preview</div>
                <div 
                  className="preview-display"
                  style={{ background: `linear-gradient(135deg, ${selectedColor?.hex}dd, ${selectedColor?.hex}99)` }}
                >
                  <div className="preview-icon">👗</div>
                  <div className="preview-info">
                    <div className="preview-detail">{selectedColor?.name}</div>
                    <div className="preview-detail">{customizationOptions.designs.find(d => d.id === customization.design)?.name}</div>
                    <div className="preview-detail">{customizationOptions.fabrics.find(f => f.id === customization.fabric)?.name}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Options Section */}
            <div className="options-section">
              {/* Color Selection */}
              <div className="option-group fade-in">
                <h3 className="option-title">Select Color</h3>
                <div className="color-grid">
                  {customizationOptions.colors.map(color => (
                    <div
                      key={color.id}
                      className={`color-option ${customization.color === color.id ? 'selected' : ''}`}
                      onClick={() => handleColorSelect(color.id)}
                      title={color.name}
                    >
                      <div 
                        className="color-swatch"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <span className="color-name">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Selection */}
              <div className="option-group fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="option-title">Select Design</h3>
                <div className="design-grid">
                  {customizationOptions.designs.map(design => (
                    <div
                      key={design.id}
                      className={`design-option ${customization.design === design.id ? 'selected' : ''}`}
                      onClick={() => handleDesignSelect(design.id)}
                    >
                      <div className="design-name">{design.name}</div>
                      <div className="design-description">{design.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fabric Selection */}
              <div className="option-group fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="option-title">Select Fabric</h3>
                <div className="fabric-grid">
                  {customizationOptions.fabrics.map(fabric => (
                    <div
                      key={fabric.id}
                      className={`fabric-option ${customization.fabric === fabric.id ? 'selected' : ''}`}
                      onClick={() => handleFabricSelect(fabric.id)}
                    >
                      <div className="fabric-name">{fabric.name}</div>
                      <div className="fabric-description">{fabric.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="option-group fade-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="option-title">Select Size</h3>
                <div className="size-grid">
                  {customizationOptions.sizes.map(size => (
                    <div
                      key={size}
                      className={`size-option ${customization.size === size ? 'selected' : ''}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="option-group fade-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="option-title">Additional Notes</h3>
                <textarea
                  className="notes-textarea"
                  placeholder="Any special requirements or customization requests..."
                  value={customization.notes}
                  onChange={handleNotesChange}
                  rows="4"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="submit-section fade-in" style={{ animationDelay: '0.5s' }}>
                <button onClick={handleSubmit} className="btn btn-primary btn-block submit-button">
                  Save Customization
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
