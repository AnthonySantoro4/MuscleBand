import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dangerous = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      background: 'linear-gradient(to bottom, #ffcdd2, #ef9a9a)',
      border: '2px solid #F44336',
      color: '#b71c1c',
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
      maxWidth: '700px',
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
      <h1 style={styles.title}>DANGEROUS</h1>
      <p style={styles.text}>
        Your bicep imbalance exceeds 20%. 🛑 This puts you at a high risk of injury.
      </p>
      <ul style={styles.list}>
        <li>🚫 Stop bilateral exercises for 2–4 weeks</li>
        <li>🎯 Train only the weaker arm</li>
        <li>🧘 Stretch & foam roll biceps regularly</li>
        <li>🪞 Monitor your form strictly</li>
        <li>📈 Retest frequently until imbalance decreases</li>
      </ul>
    </div>
  );
};

export default Dangerous;
