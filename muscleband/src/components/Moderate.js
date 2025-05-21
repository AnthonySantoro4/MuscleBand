import React from 'react';
import { useNavigate } from 'react-router-dom';

const Moderate = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      background: 'linear-gradient(to bottom, #fff3cd, #ffeeba)',
      border: '2px solid #FFC107',
      color: '#856404',
      padding: '40px',
      borderRadius: '20px',
      margin: '40px auto',
      textAlign: 'center',
      maxWidth: '800px',
      fontFamily: 'Segoe UI, sans-serif',
      position: 'relative',
    },
    title: {
      fontSize: '32px',
      marginBottom: '20px',
    },
    text: {
      fontSize: '18px',
      marginBottom: '20px',
    },
    list: {
      fontSize: '16px',
      textAlign: 'left',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    backArrow: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      fontSize: '24px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backArrow} onClick={() => navigate('/home')}>←</div>
      <h1 style={styles.title}>MODERATE</h1>
      <p style={styles.text}>
        Your bicep imbalance falls within the moderate range (10% - 15%). Consider adjusting your training:
      </p>
      <ul style={styles.list}>
        <li>✅ Prioritize single arm movements (e.g. dumbbell curls, hammer curls)</li>
        <li>✅ Maintain equal reps on both arms</li>
        <li>⚠️ Seek physical therapy if any discomfort or pain arises</li>
      </ul>
    </div>
  );
};

export default Moderate;