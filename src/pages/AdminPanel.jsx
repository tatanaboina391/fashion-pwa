import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  // Editable fields (storing in local state for the demo)
  // In a real app, these would be fetched/pushed to a database
  const [studioName, setStudioName] = useState("Fashion Studio");
  const [founder, setFounder] = useState("Avinash T.");
  const [primaryPhone, setPrimaryPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("contact@fashionstudio.luxury");

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234') { // Simple hardcoded PIN for management access
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Management PIN');
    }
  };

  const handleSave = () => {
    alert("Changes saved locally! (In a real system, this would update the database)");
    // Here we would ideally send a POST request to a backend
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h1 className="admin-title">Management Access</h1>
          <p className="admin-subtitle">Please enter your secure access PIN</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              className="admin-input" 
              placeholder="Enter PIN" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="admin-btn">Login</button>
          </form>
          <button className="admin-back-btn" onClick={() => navigate('/')}>Back to Website</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="admin-header">
          <h1>Fashion Studio Management</h1>
          <p>Update your public studio information across the website</p>
        </header>

        <div className="admin-form-card">
          <div className="admin-form-group">
            <label>Studio Name</label>
            <input type="text" value={studioName} onChange={(e) => setStudioName(e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label>Founder Name</label>
            <input type="text" value={founder} onChange={(e) => setFounder(e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label>Primary Phone</label>
            <input type="text" value={primaryPhone} onChange={(e) => setPrimaryPhone(e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label>Studio Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="admin-actions">
            <button className="admin-save-btn" onClick={handleSave}>Apply & Save Changes</button>
            <button className="admin-cancel-btn" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
