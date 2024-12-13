import React, { useState } from 'react';

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleAction = () => {
    if (!email || !password || (currState === 'Sign Up' && !name)) {
      alert('Please fill in all the required fields.');
      return;
    }

    if (currState === 'Login') {
      // Simulate login process
      console.log(`Logging in with Email: ${email}, Password: ${password}`);
      alert('Login successful!');
    } else if (currState === 'Sign Up') {
      // Simulate account creation process
      console.log(`Creating account for Name: ${name}, Email: ${email}, Password: ${password}`);
      alert('Account created successfully!');
    }

    // Reset form fields after the action
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert('Please enter your email to reset the password.');
      return;
    }
    console.log(`Password reset email sent to: ${email}`);
    alert(`Password reset email sent to: ${email}`);
    setForgotPassword(false); // Close forgot password modal
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 vw-100"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 128, 255, 0.7), rgba(0, 255, 128, 0.6))',
        backdropFilter: 'blur(15px)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1050,
      }}
    >
      <div
        className="card shadow-lg p-4 text-light bg-dark"
        style={{
          width: '400px',
          borderRadius: '20px',
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">{forgotPassword ? 'Forgot Password' : currState}</h2>
          <button
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setShowLogin(false)}
          ></button>
        </div>

        {!forgotPassword ? (
          <>
            {/* Profile Icon */}
            <div className="text-center mb-4">
              <i
                className="bi bi-person-circle text-light"
                style={{ fontSize: '4rem', color: '#70e1f5' }}
              ></i>
            </div>

            {/* Input Fields */}
            {currState === 'Sign Up' && (
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input me-1" />
                Remember me
              </label>
              <button
                className="btn btn-link text-light p-0"
                onClick={() => setForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login/Sign Up Button */}
            <button className="btn btn-primary btn-lg w-100 mb-3" onClick={handleAction}>
              {currState === 'Sign Up' ? 'Create Account' : 'Login'}
            </button>

            {/* Footer Toggle */}
            <div className="text-center">
              {currState === 'Login' ? (
                <p>
                  Don't have an account?{' '}
                  <span
                    className="text-info fw-bold"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setCurrState('Sign Up')}
                  >
                    Sign Up
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <span
                    className="text-info fw-bold"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setCurrState('Login')}
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Forgot Password Modal */}
            <div className="mb-3">
              <label htmlFor="forgotEmail" className="form-label">
                Enter your email to reset your password:
              </label>
              <input
                type="email"
                id="forgotEmail"
                className="form-control form-control-lg"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              className="btn btn-primary btn-lg w-100 mb-3"
              onClick={handleForgotPassword}
            >
              Send Reset Link
            </button>
            <button
              className="btn btn-secondary btn-lg w-100"
              onClick={() => setForgotPassword(false)}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
