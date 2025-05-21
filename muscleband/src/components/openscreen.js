import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OpenScreen = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);

  // CSS styles as JavaScript objects
  const styles = {
    container: {
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
    centerBox: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '40px',
      width: '500px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '50px',
      color: '#333',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      gap: '20px',
    },
    button: {
      flex: 1,
      padding: '15px',
      borderRadius: '25px',
      border: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    loginButton: {
      background: 'linear-gradient(to right, #ff3e3e 0%, #ff8443 100%)',
      color: 'white',
    },
    signupButton: {
      backgroundColor: 'white',
      color: '#333',
      border: '2px solid #ddd',
    },
    buttonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
    logo: {
      width: '120px',
      height: '120px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom, #ff3e3e 0%, #ff8443 100%)',
      borderRadius: '50%',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    logoIcon: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.centerBox}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <svg viewBox="0 0 24 24" width="60" height="60">
              <circle cx="12" cy="8" r="4" fill="currentColor" />
              <path d="M12,14c-6.1,0-8,4-8,4v2h16v-2C20,18,18.1,14,12,14z" fill="currentColor" />
            </svg>
          </div>
        </div>
        <h1 style={styles.title}>MuscleBand</h1>
        <div style={styles.buttonContainer}>
          <button 
            style={{
              ...styles.button,
              ...styles.loginButton,
              ...(hoveredButton === 'login' ? styles.buttonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('login')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            style={{
              ...styles.button,
              ...styles.signupButton,
              ...(hoveredButton === 'signup' ? styles.buttonHover : {})
            }}
            onMouseEnter={() => setHoveredButton('signup')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigate('/signup')}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenScreen;