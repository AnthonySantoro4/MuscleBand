import React from 'react';
import { useNavigate } from 'react-router-dom';

const Safe = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      background: 'linear-gradient(to bottom, #d0f0c0, #b2dfdb)',
      minHeight: '100vh',
      padding: '60px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      position: 'relative',
    },
    content: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '30px',
      maxWidth: '600px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    heading: {
      fontSize: '32px',
      marginBottom: '20px',
      color: '#4CAF50',
    },
    text: {
      fontSize: '18px',
      marginBottom: '10px',
      color: '#2e7d32',
    },
    tip: {
      marginTop: '20px',
      fontStyle: 'italic',
      color: '#555',
    },
    backArrow: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backArrow} onClick={() => navigate('/home')}>←</div>
      <div style={styles.content}>
        <h1 style={styles.heading}>✅ Safe Zone</h1>
        <p style={styles.text}>
          Your biceps are well balanced with less than 10% difference!
          Keep up the great work and maintain your training consistency.
        </p>
        <p style={styles.tip}>Tip: Continue training both sides equally to stay balanced!</p>
      </div>
    </div>
  );
};

export default Safe;