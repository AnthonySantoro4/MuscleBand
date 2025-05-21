import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const styles = {
    loginContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb, #e2b0ff, #d896ff)',
    },
    formWrapper: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '20px',
      width: '350px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '10px',
      borderRadius: '25px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      borderRadius: '25px',
      border: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      background: 'linear-gradient(to right, #ff3e3e 0%, #ff8443 100%)',
      color: 'white',
      cursor: 'pointer',
      marginTop: '10px',
    },
    backButton: {
      marginTop: '10px',
      padding: '12px',
      width: '100%',
      borderRadius: '25px',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    messageBox: {
      margin: '10px 0',
      padding: '10px',
      borderRadius: '8px',
      textAlign: 'center',
    },
    errorBox: {
      backgroundColor: '#fdecea',
      color: '#c62828',
      border: '1px solid #f5c6cb',
    },
    successBox: {
      backgroundColor: '#e8f5e9',
      color: '#2e7d32',
      border: '1px solid #c8e6c9',
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!emailAddress.trim() || !password.trim()) {
      setMessage('Please enter both email and password');
      setIsError(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
        { emailAddress, password }
      );

      // 🔍 Debug output to verify structure
      console.log('✅ User from backend:', response.data.user);

      // ✅ Save user to localStorage
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      setMessage('Login successful!');
      setIsError(false);

      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Login</h2>

        {message && (
          <div
            style={{
              ...styles.messageBox,
              ...(isError ? styles.errorBox : styles.successBox),
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            style={styles.input}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            disabled={isLoading}
          />
          <button
            type="submit"
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <button
          style={styles.backButton}
          onClick={handleBackClick}
          disabled={isLoading}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Login;
