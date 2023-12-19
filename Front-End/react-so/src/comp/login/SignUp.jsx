import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [error, setError] = useState(''); // Define setError state
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUserNameError('');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError('');
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      return;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup', {
        name: username,
        username: username,
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);

      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(''); // Clear any previous error
    } catch (error) {
      if (error.response && error.response.status === 419) {
        setError('Your session has expired. Please log in again.');
      } else {
        setError('Registration failed. Please try again later.');
        console.error('Registration failed', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-login">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">Welcome</h2>
          <h4 className="animation a2">Create an account using the form below</h4>
        </div>
        <form onSubmit={handleRegisterSubmit} className="form">
          <input
            style={{ marginTop: '20px' }}
            type="text"
            className={`form-field animation a3 ${userNameError ? 'error' : ''}`}
            placeholder="User Name"
            value={username}
            onChange={handleUsernameChange}
          />
          {userNameError && <p className="error-message">{userNameError}</p>}
          <input
            style={{ marginTop: '20px' }}
            type="email"
            className={`form-field animation a3 ${emailError ? 'error' : ''}`}
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <input
            style={{ marginTop: '20px' }}
            type="password"
            className={`form-field animation a4 ${passwordError ? 'error' : ''}`}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          <input
            style={{ margin: '20px 0px' }}
            type="password"
            className={`form-field animation a4 ${confirmPasswordError ? 'error' : ''}`}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
          <h4>
            Already have an account?{' '}
            <Link style={{ cursor: 'pointer', color: 'royalblue' }} to="/Login">
              Login
            </Link>
          </h4>
          {error && <p className="error-message">{error}</p>}
          <button className="animation a6" type="submit" disabled={isLoading}>
            Sign Up
          </button>
        </form>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default SignUp;
