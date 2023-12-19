import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
    } else {
      try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
        });

        const { user, token } = response.data;

        sessionStorage.setItem('user_id', user.user_id);
        sessionStorage.setItem('userRole', user.role_id);
        sessionStorage.setItem('userName', user.name);
        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('isLoggedin', 'true');

        setError('');

        navigate('/a');
      } catch (error) {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <div className="container-login">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">Welcome Back</h2>
          <h4 className="animation a2">Log in to your account using email and password</h4>
        </div>
        <form onSubmit={handleLoginSubmit} className="form">
          <input
            style={{ marginTop: '20px' }}
            type="email"
            className={`form-field animation a3 ${error ? 'error' : ''}`}
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            style={{ margin: '20px 0px' }}
            type="password"
            className={`form-field animation a4 ${error ? 'error' : ''}`}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <h4>
            Do you not have an account ?{' '}
            <Link style={{ cursor: 'pointer', color: 'royalblue' }} to="/Sign">
              Sign Up
            </Link>
          </h4>
          <button type="submit" style={{ cursor: 'pointer' }} className="animation a6">
            LOGIN
          </button>
          {error && <p id="error-message">{error}</p>}
        </form>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Login;
