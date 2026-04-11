import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth_Teal.css';

const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a 10-digit number';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Registration Submitted:", formData);
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Premium Header */}
        <div className="auth-header-teal">
          <h1 className="auth-title-large">Fashion Studio</h1>
          <p className="auth-subtitle-teal">Join the Elite Fashion Community</p>
        </div>

        <div className="auth-body">
          <form onSubmit={handleSubmit} noValidate>
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

            <div className="form-group">
              <label className="form-label-teal">Email Address</label>
              <input
                type="email"
                name="email"
                className={`form-input-teal ${errors.email ? 'input-error' : ''}`}
                placeholder="you@luxury.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="auth-error-hint">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label-teal">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                className={`form-input-teal ${errors.phoneNumber ? 'input-error' : ''}`}
                placeholder="Enter 10-digit number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <span className="auth-error-hint">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
              <label className="form-label-teal">Password</label>
              <input
                type="password"
                name="password"
                className={`form-input-teal ${errors.password ? 'input-error' : ''}`}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="auth-error-hint">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label-teal">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-input-teal ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <span className="auth-error-hint">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="btn-teal">
              Create Account
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '700', textDecoration: 'none' }}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
