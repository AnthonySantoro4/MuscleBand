import React from 'react';
import { useNavigate } from 'react-router-dom';

const Severe = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      background: 'linear-gradient(to bottom, #ffe0b2, #ffcc80)',
      border: '2px solid #FF9800',
      color: '#7c4700',
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
      maxWidth: '650px',
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
      <h1 style={styles.title}>SEVERE</h1>
      <p style={styles.text}>
        Your bicep imbalance is in the severe range (15% - 20%). Prioritize your weaker arm:
      </p>
      <ul style={styles.list}>
        <li>🛠️ Add 2–4 extra reps per set on the weaker arm</li>
        <li>💪 Focus on isolated single-arm exercises</li>
        <li>🪞 Use a mirror to ensure proper form</li>
        <li>📉 Drop the weight and perform slow, controlled reps</li>
      </ul>
    </div>
  );
};

export default Severe;