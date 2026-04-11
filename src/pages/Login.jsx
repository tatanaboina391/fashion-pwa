import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth_Teal.css';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleToggle = (tab) => {
    setActiveTab(tab);
    setErrors({}); // Clear all errors on toggle
  };

  const validate = () => {
    const newErrors = {};
    
    if (activeTab === 'register') {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone Number is required';
      } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Enter a valid 10-digit number';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(`${activeTab.toUpperCase()} Submitted:`, formData);
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Premium Header */}
        <div className="auth-header-teal">
          <h1 className="auth-title-large">Fashion Studio</h1>
          <p className="auth-subtitle-teal">Your Bespoke Fashion Companion</p>
        </div>

        <div className="auth-body">
          {/* Segmented Toggle */}
          <div className="auth-toggle-container">
            <button 
              className={`auth-toggle-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => handleToggle('login')}
            >
              Login
            </button>
            <button 
              className={`auth-toggle-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => handleToggle('register')}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            
            {activeTab === 'register' && (
              <div className="form-group">
                <label className="form-label-teal">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className={`form-input-teal ${errors.fullName ? 'input-error' : ''}`}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="auth-error-hint">{errors.fullName}</span>}
              </div>
            )}

            {activeTab === 'register' && (
               <div className="form-group">
                <label className="form-label-teal">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className={`form-input-teal ${errors.phoneNumber ? 'input-error' : ''}`}
                  placeholder="10-digit phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <span className="auth-error-hint">{errors.phoneNumber}</span>}
              </div>
            )}

            <div className="form-group">
              <label className="form-label-teal">Email ID</label>
              <input
                type="email"
                name="email"
                className={`form-input-teal ${errors.email ? 'input-error' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="auth-error-hint">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label-teal">Password</label>
              <input
                type="password"
                name="password"
                className={`form-input-teal ${errors.password ? 'input-error' : ''}`}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="auth-error-hint">{errors.password}</span>}
            </div>

            <button type="submit" className="btn-teal">
              {activeTab === 'login' ? 'Login' : 'Register'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
            {activeTab === 'login' ? (
              <>Don't have an account? <span onClick={() => handleToggle('register')} style={{ color: 'var(--color-primary)', fontWeight: '700', cursor: 'pointer' }}>Register</span></>
            ) : (
              <>Already have an account? <span onClick={() => handleToggle('login')} style={{ color: 'var(--color-primary)', fontWeight: '700', cursor: 'pointer' }}>Login</span></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
