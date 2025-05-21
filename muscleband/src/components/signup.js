import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const styles = {
    signupContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh', 
      width: '100%',
      background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb, #e2b0ff, #d896ff)',
      color: '#333',
      position: 'relative',
      overflow: 'hidden', 
      alignItems: 'center',
      justifyContent: 'center', 
    },
    mainContent: {
      position: 'relative',
      zIndex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '1200px',
      padding: '20px',
    },
    signupForm: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '30px',
      width: '350px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    formTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
    },
    inputField: {
      width: '100%',
      padding: '12px 15px',
      margin: '8px 0',
      borderRadius: '25px',
      border: '1px solid #ddd',
      fontSize: '16px',
      transition: 'border 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box',
    },
    signupButton: {
      width: '100%',
      padding: '12px',
      margin: '15px 0',
      borderRadius: '25px',
      border: 'none',
      background: 'linear-gradient(to right, #ff3e3e 0%, #ff8443 100%)',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    signupButtonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
    message: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      textAlign: 'center',
      fontSize: '14px'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    disabledButton: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    backButton: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      borderRadius: '25px',
      border: '1px solid #ddd',
      background: 'white',
      color: '#333',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }
  };

  const validateInputs = () => {
    if (!firstName.trim() || !lastName.trim() || !emailAddress.trim() || !password.trim()) {
      setMessage('All fields are required');
      setIsError(true);
      return false;
    }
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
      setIsError(true);
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        firstName,
        lastName,
        emailAddress,
        password
      });

      setMessage(response.data.message || 'Signup successful!');
      setIsError(false);

      localStorage.setItem('user', JSON.stringify(response.data.user));

      setTimeout(() => navigate('/home'), 1000);
    } catch (error) {
      console.error('Signup error:', error);
      setIsError(true);
      setMessage(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div style={styles.signupContainer}>
      <div style={styles.mainContent}>
        <div style={styles.signupForm}>
          <h2 style={styles.formTitle}>Create an Account</h2>

          {message && (
            <div style={{
              ...styles.message,
              ...(isError ? styles.errorMessage : styles.successMessage)
            }}>
              {message}
            </div>
          )}

          <form style={{ width: '100%' }} onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.inputField}
              disabled={isLoading}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.inputField}
              disabled={isLoading}
            />
            <input
              type="email"
              placeholder="Email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              style={styles.inputField}
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.inputField}
              disabled={isLoading}
            />
            <button
              type="submit"
              style={{
                ...styles.signupButton,
                ...(isLoading ? styles.disabledButton : {})
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <button
            type="button"
            style={styles.backButton}
            onClick={handleBackClick}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
