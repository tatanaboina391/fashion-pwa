import { useParams, useNavigate } from 'react-router-dom';
import './CategoryListing.css';

// Mock data for items in each category
const categoryItems = {
  'saree': [
    { id: 1, name: 'Silk Saree Deluxe', price: '₹8,999', rating: 4.8, reviews: 124 },
    { id: 2, name: 'Cotton Saree Classic', price: '₹3,499', rating: 4.6, reviews: 89 },
    { id: 3, name: 'Designer Saree Premium', price: '₹12,999', rating: 4.9, reviews: 156 },
    { id: 4, name: 'Georgette Saree Elegant', price: '₹5,999', rating: 4.7, reviews: 98 },
    { id: 5, name: 'Banarasi Saree Royal', price: '₹15,999', rating: 5.0, reviews: 203 },
    { id: 6, name: 'Chiffon Saree Light', price: '₹4,499', rating: 4.5, reviews: 67 },
  ],
  'half-saree': [
    { id: 1, name: 'Traditional Half Saree', price: '₹6,999', rating: 4.7, reviews: 78 },
    { id: 2, name: 'Modern Half Saree Fusion', price: '₹7,999', rating: 4.8, reviews: 92 },
    { id: 3, name: 'Designer Half Saree', price: '₹9,999', rating: 4.9, reviews: 115 },
    { id: 4, name: 'Embroidered Half Saree', price: '₹8,499', rating: 4.6, reviews: 84 },
    { id: 5, name: 'Silk Half Saree Deluxe', price: '₹11,999', rating: 4.9, reviews: 128 },
    { id: 6, name: 'Cotton Half Saree', price: '₹5,499', rating: 4.5, reviews: 56 },
  ],
  'lehanga': [
    { id: 1, name: 'Bridal Lehanga Royal', price: '₹25,999', rating: 5.0, reviews: 234 },
    { id: 2, name: 'Designer Lehanga Premium', price: '₹18,999', rating: 4.9, reviews: 187 },
    { id: 3, name: 'Traditional Lehanga', price: '₹12,999', rating: 4.7, reviews: 143 },
    { id: 4, name: 'Party Wear Lehanga', price: '₹15,999', rating: 4.8, reviews: 165 },
    { id: 5, name: 'Silk Lehanga Elegant', price: '₹20,999', rating: 4.9, reviews: 198 },
    { id: 6, name: 'Cotton Lehanga Light', price: '₹9,999', rating: 4.6, reviews: 112 },
  ],
  'crop-top': [
    { id: 1, name: 'Casual Crop Top', price: '₹1,299', rating: 4.5, reviews: 456 },
    { id: 2, name: 'Designer Crop Top', price: '₹2,499', rating: 4.7, reviews: 312 },
    { id: 3, name: 'Party Wear Crop Top', price: '₹3,499', rating: 4.8, reviews: 289 },
    { id: 4, name: 'Embroidered Crop Top', price: '₹2,999', rating: 4.6, reviews: 234 },
    { id: 5, name: 'Silk Crop Top Premium', price: '₹4,999', rating: 4.9, reviews: 178 },
    { id: 6, name: 'Cotton Crop Top Basic', price: '₹999', rating: 4.4, reviews: 567 },
  ],
};

const categoryInfo = {
  'saree': { name: 'Saree', description: 'Elegant traditional wear for every occasion' },
  'half-saree': { name: 'Half Saree', description: 'Contemporary fusion of tradition and style' },
  'lehanga': { name: 'Lehanga', description: 'Royal ethnic collection for special moments' },
  'crop-top': { name: 'Crop Top', description: 'Modern trendy fashion for the bold' },
};

const CategoryListing = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const items = categoryItems[categoryId] || [];
  const info = categoryInfo[categoryId] || { name: 'Category', description: '' };

  const handleItemClick = (itemId) => {
    navigate(`/category/${categoryId}/customize/${itemId}`);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="category-listing-container">
      {/* Header */}
      <div className="category-header">
        <div className="container">
          <button onClick={handleBackClick} className="back-button">
            ← Back to Home
          </button>
          <div className="category-header-content fade-in">
            <h1 className="category-title">{info.name}</h1>
            <p className="category-description">{info.description}</p>
            <div className="category-meta">
              <span className="meta-item">{items.length} Items</span>
              <span className="meta-divider">•</span>
              <span className="meta-item">Premium Collection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="container">
          <div className="filters-wrapper">
            <div className="filter-group">
              <label className="filter-label">Sort By:</label>
              <select className="filter-select">
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Price Range:</label>
              <select className="filter-select">
                <option>All Prices</option>
                <option>Under ₹5,000</option>
                <option>₹5,000 - ₹10,000</option>
                <option>₹10,000 - ₹20,000</option>
                <option>Above ₹20,000</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="items-section">
        <div className="container">
          <div className="items-grid">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="item-card"
                onClick={() => handleItemClick(item.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="item-image-wrapper">
                  <div className="item-image">
                    <div className="item-badge">New</div>
                    <div className="item-icon">👗</div>
                  </div>
                </div>
                <div className="item-content">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-rating">
                    <span className="rating-stars">⭐ {item.rating}</span>
                    <span className="rating-reviews">({item.reviews})</span>
                  </div>
                  <div className="item-footer">
                    <span className="item-price">{item.price}</span>
                    <button className="item-button">Customize →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryListing;
