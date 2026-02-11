import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SareeTypeSelection.css';

// Blouse Types Data
const blouseTypes = {
  frontNeck: [
    'Round neck', 'Deep round neck', 'U-neck', 'Sweetheart neck',
    'V-neck', 'Deep V-neck', 'Boat neck', 'High neck',
    'Collar neck', 'Square neck', 'Halter neck', 'Keyhole neck',
    'Scalloped neck', 'Asymmetrical neck', 'Princess cut neck',
    'Shirt-style neck', 'Illusion neck (net)', 'Angrakha neck', 'One-shoulder neck'
  ],
  backNeck: [
    'Deep U-back', 'Deep V-back', 'Round back neck', 'Square back neck',
    'Backless blouse', 'Tie-up (Dori) back', 'Keyhole back', 'Cut-out back',
    'String back', 'Bow-tie back', 'Zip back neck', 'Buttoned back',
    'Corset back', 'Sheer / net back', 'Criss-cross back', 'Potli button back',
    'Temple design back', 'Tattoo-style back', 'Peep-hole back'
  ]
};

// Saree Types Data
const sareeTypes = {
  traditional: [
    'Kanjeevaram', 'Banarasi', 'Paithani', 'Pochampally Ikat',
    'Sambalpuri', 'Chanderi', 'Maheshwari', 'Gadwal', 'Dharmavaram',
    'Uppada Silk', 'Narayanpet', 'Chettinad cotton', 'Mangalagiri', 'Venkatagiri'
  ],
  silk: [
    'Pure silk', 'Soft silk', 'Mysore silk', 'Tussar silk',
    'Raw silk', 'Art silk', 'Tissue silk', 'Kora silk'
  ],
  cotton: [
    'Cotton saree', 'Linen saree', 'Khadi saree', 'Kota Doria',
    'Jamdani', 'Handloom cotton', 'Mulmul cotton'
  ],
  designer: [
    'Georgette', 'Chiffon', 'Net saree', 'Organza', 'Crepe',
    'Satin', 'Ruffle saree', 'Pre-stitched saree', 'Half-and-half saree', 'Digital print saree'
  ],
  occasion: [
    'Bridal saree', 'Party-wear saree', 'Wedding guest saree',
    'Festival saree', 'Office-wear saree', 'Casual wear saree'
  ]
};

// Colors Data
const colorPalette = [
  { name: 'Royal Blue', hex: '#002366' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Emerald Green', hex: '#50C878' },
  { name: 'Mustard Yellow', hex: '#FFDB58' },
  { name: 'Black', hex: '#000000' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Red', hex: '#C21807' },
  { name: 'Pink', hex: '#FF1493' },
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Purple', hex: '#800080' }
];

const SareeTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedBlouseFront, setSelectedBlouseFront] = useState('');
  const [selectedBlouseBack, setSelectedBlouseBack] = useState('');
  const [selectedSareeType, setSelectedSareeType] = useState('');
  const [activeSareeCategory, setActiveSareeCategory] = useState('traditional');
  const [selectedBlouseColor, setSelectedBlouseColor] = useState(colorPalette[0]);
  const [selectedSareeColor, setSelectedSareeColor] = useState(colorPalette[0]);

  const handleCreateSaree = () => {
    if (isFormValid) {
      // Navigate to AI generation preview with selections
      navigate('/saree/preview', {
        state: {
          blouseFront: selectedBlouseFront,
          blouseBack: selectedBlouseBack,
          sareeType: selectedSareeType,
          blouseColor: selectedBlouseColor,
          sareeColor: selectedSareeColor
        }
      });
    }
  };

  const isFormValid = selectedBlouseFront && selectedBlouseBack && selectedSareeType && selectedBlouseColor && selectedSareeColor;

  return (
    <div className="saree-type-selection-container">
      {/* Header */}
      <div className="selection-header">
        <div className="container">
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
          <div className="header-content fade-in">
            <h1 className="page-title">Create Your Custom Saree</h1>
            <p className="page-subtitle">Select your preferred blouse and saree styles to begin</p>
          </div>
        </div>
      </div>

      <div className="selection-content">
        <div className="container">
          {/* Blouse Selection Section */}
          <section className="selection-section fade-in">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">👚</span>
                Which type of blouse are you expecting?
              </h2>
              <p className="section-description">Choose both front and back neck designs</p>
            </div>

            <div className="blouse-selection-grid">
              {/* Front Neck Selection */}
              <div className="blouse-category">
                <h3 className="category-label">Front Neck Design</h3>
                <div className="selection-grid">
                  {blouseTypes.frontNeck.map((type, index) => (
                    <div
                      key={index}
                      className={`selection-card ${selectedBlouseFront === type ? 'selected' : ''}`}
                      onClick={() => setSelectedBlouseFront(type)}
                    >
                      <div className="card-content">
                        <span className="card-text">{type}</span>
                        {selectedBlouseFront === type && (
                          <span className="check-icon">✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Neck Selection */}
              <div className="blouse-category">
                <h3 className="category-label">Back Neck Design</h3>
                <div className="selection-grid">
                  {blouseTypes.backNeck.map((type, index) => (
                    <div
                      key={index}
                      className={`selection-card ${selectedBlouseBack === type ? 'selected' : ''}`}
                      onClick={() => setSelectedBlouseBack(type)}
                    >
                      <div className="card-content">
                        <span className="card-text">{type}</span>
                        {selectedBlouseBack === type && (
                          <span className="check-icon">✓</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Saree Selection Section */}
          <section className="selection-section fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">🥻</span>
                Which type of saree are you expecting?
              </h2>
              <p className="section-description">Browse by category and select your preferred style</p>
            </div>

            {/* Saree Category Tabs */}
            <div className="category-tabs">
              {Object.keys(sareeTypes).map((category) => (
                <button
                  key={category}
                  className={`category-tab ${activeSareeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveSareeCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Saree Type Selection */}
            <div className="selection-grid">
              {sareeTypes[activeSareeCategory].map((type, index) => (
                <div
                  key={index}
                  className={`selection-card ${selectedSareeType === type ? 'selected' : ''}`}
                  onClick={() => setSelectedSareeType(type)}
                >
                  <div className="card-content">
                    <span className="card-text">{type}</span>
                    {selectedSareeType === type && (
                      <span className="check-icon">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Color Selection Section (New) */}
          <section className="selection-section fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">🎨</span>
                Select Your Colors
              </h2>
              <p className="section-description">Choose the perfect shades for your outfit</p>
            </div>

            <div className="color-selection-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              
              {/* Saree Color */}
              <div className="color-category">
                <h3 className="category-label">Saree Color</h3>
                <div className="color-options" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className={`color-circle ${selectedSareeColor.name === color.name ? 'selected' : ''}`}
                      onClick={() => setSelectedSareeColor(color)}
                      title={color.name}
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        backgroundColor: color.hex,
                        cursor: 'pointer',
                        border: selectedSareeColor.name === color.name ? '3px solid white' : '2px solid transparent',
                        boxShadow: selectedSareeColor.name === color.name ? '0 0 0 2px #a855f7' : 'none',
                        transition: 'all 0.2s'
                      }}
                    />
                  ))}
                  <div style={{ marginTop: '0.5rem', color: '#ccc', fontSize: '0.9rem', width: '100%' }}>
                    Selected: {selectedSareeColor.name}
                  </div>
                </div>
              </div>

              {/* Blouse Color */}
              <div className="color-category">
                <h3 className="category-label">Blouse Color</h3>
                <div className="color-options" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className={`color-circle ${selectedBlouseColor.name === color.name ? 'selected' : ''}`}
                      onClick={() => setSelectedBlouseColor(color)}
                      title={color.name}
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        backgroundColor: color.hex,
                        cursor: 'pointer',
                        border: selectedBlouseColor.name === color.name ? '3px solid white' : '2px solid transparent',
                        boxShadow: selectedBlouseColor.name === color.name ? '0 0 0 2px #a855f7' : 'none',
                        transition: 'all 0.2s'
                      }}
                    />
                  ))}
                  <div style={{ marginTop: '0.5rem', color: '#ccc', fontSize: '0.9rem', width: '100%' }}>
                    Selected: {selectedBlouseColor.name}
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Create Button */}
          <div className="action-section">
            <button
              className={`create-button ${isFormValid ? 'enabled' : 'disabled'}`}
              onClick={handleCreateSaree}
              disabled={!isFormValid}
            >
              {isFormValid ? 'Create Saree →' : 'Please complete all selections'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SareeTypeSelection;
