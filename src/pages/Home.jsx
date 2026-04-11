import { useNavigate } from 'react-router-dom';
import './Home.css';

const categories = [
  {
    id: 'saree',
    name: 'Saree',
    description: 'Elegant traditional wear',
    image: 'saree',
    color: 'hsl(340, 82%, 52%)'
  },
  {
    id: 'half-saree',
    name: 'Half Saree',
    description: 'Contemporary fusion style',
    image: 'half-saree',
    color: 'hsl(280, 70%, 60%)'
  },
  {
    id: 'lehanga',
    name: 'Lehanga',
    description: 'Royal ethnic collection',
    image: 'lehanga',
    color: 'hsl(45, 100%, 60%)'
  },
  {
    id: 'crop-top',
    name: 'Crop Top',
    description: 'Modern trendy fashion',
    image: 'crop-top',
    color: 'hsl(200, 80%, 60%)'
  }
];

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'saree') {
      navigate('/saree/select');
    } else if (categoryId === 'half-saree') {
      navigate('/half-saree/select');
    } else if (categoryId === 'lehanga') {
      navigate('/lehanga/select');
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content fade-in">
          <h1 className="hero-title">Discover Your Style</h1>
          <p className="hero-subtitle">
            Explore our curated collection of traditional and contemporary fashion
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Designs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse Collections</h2>
            <p className="section-subtitle">Choose from our exclusive range of fashion categories</p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => handleCategoryClick(category.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="category-image-wrapper">
                  <div 
                    className="category-image"
                    style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` }}
                  >
                    <div className="category-icon">👗</div>
                  </div>
                  <div className="category-overlay"></div>
                </div>
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  <div className="category-arrow">→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">Custom Designs</h3>
              <p className="feature-description">
                Personalize every detail to match your unique style
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
