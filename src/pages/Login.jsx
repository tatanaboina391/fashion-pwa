import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth_Teal.css';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${activeTab.toUpperCase()} Submitted:`, formData);
    // Simulate auth success
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Teal Header */}
        <div className="auth-header-teal">
          <h1 className="auth-title-large">Ethnic Wear Customization</h1>
          <p className="auth-subtitle-teal">Design your perfect ethnic outfit</p>
        </div>

        <div className="auth-body">
          {/* Segmented Toggle */}
          <div className="auth-toggle-container">
            <button 
              className={`auth-toggle-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`auth-toggle-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            
            {/* Show Full Name only in Register mode (or if screenshot implied it for login too, but usually Name is Register) */}
            {activeTab === 'register' && (
              <div className="form-group">
                <label className="form-label-teal">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input-teal"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Phone Number - Shown in both based on screenshot style, or just register? 
                I'll include it in Register, and maybe Login if using Phone Login. 
                Let's match the screenshot: It showed Name, Phone, Email. 
                I'll put Phone in Register, and maybe strict Login is just Email/Pass. 
                To match the "visual", I'll make the Register tab look EXACTLY like the screenshot.
            */}
            {(activeTab === 'register') && (
               <div className="form-group">
                <label className="form-label-teal">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="form-input-teal"
                  placeholder="10-digit phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label-teal">Email ID</label>
              <input
                type="email"
                name="email"
                className="form-input-teal"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label-teal">Password</label>
              <input
                type="password"
                name="password"
                className="form-input-teal"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-teal">
              {activeTab === 'login' ? 'Login' : 'Register'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
