import React, { useState, useEffect } from 'react';
import TopNavBar from './TopNavBar'; // ✅ Make sure this is correct

const About = () => {
  const [userFirstName, setUserFirstName] = useState('User');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.firstName) {
          setUserFirstName(parsedUser.firstName);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb, #e2b0ff, #d896ff)',
      alignItems: 'center',
      paddingTop: '120px',
      paddingBottom: '40px',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    contentBox: {
      width: '90%',
      maxWidth: '850px',
      padding: '20px',
      borderRadius: '20px',
      backgroundColor: 'white',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '26px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
    },
    paragraph: {
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '15px',
    },
    list: {
      listStyleType: 'decimal',
      paddingLeft: '20px',
      marginBottom: '15px',
    },
    sublist: {
      listStyleType: 'lower-alpha',
      paddingLeft: '20px',
    },
    formula: {
      fontStyle: 'italic',
      textAlign: 'center',
      fontSize: '18px',
      marginTop: '10px',
    },
    grade: {
      safe: { color: '#4CAF50' },
      moderate: { color: '#FFC107' },
      severe: { color: '#FF9800' },
      dangerous: { color: '#F44336' },
      calc: { color: '#2196F3' },
    }
  };

  return (
    <div style={styles.container}>
      {/* ✅ Reusable TopNavBar */}
      <TopNavBar
        userFirstName={userFirstName}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
        hoveredNav={hoveredNav}
        setHoveredNav={setHoveredNav}
      />

      {/* 🧠 Safe */}
      <div style={styles.contentBox}>
        <h2 style={{ ...styles.sectionTitle, ...styles.grade.safe }}>SAFE</h2>
        <p style={styles.paragraph}>
          When the percentage difference is <strong>less than 10%</strong>, you're in the safe zone! Keep up the good work.
        </p>
      </div>

      {/* ⚠️ Moderate */}
      <div style={styles.contentBox}>
        <h2 style={{ ...styles.sectionTitle, ...styles.grade.moderate }}>MODERATE</h2>
        <p style={styles.paragraph}>
          A percentage difference between <strong>10% - 15%</strong> means a moderate imbalance. Take precautions:
        </p>
        <ol style={styles.list}>
          <li>Prioritize single arm movements
            <ol style={styles.sublist}>
              <li>Dumbbell Bicep Curls</li>
              <li>Dumbbell Hammer Curls</li>
            </ol>
          </li>
          <li>Use same reps for both arms</li>
          <li>Consult a physical therapist if needed</li>
        </ol>
      </div>

      {/* 🚨 Severe */}
      <div style={styles.contentBox}>
        <h2 style={{ ...styles.sectionTitle, ...styles.grade.severe }}>SEVERE</h2>
        <p style={styles.paragraph}>
          A <strong>15% - 20%</strong> imbalance is severe. Increase reps on your weaker arm, and focus on form.
        </p>
        <ol style={styles.list}>
          <li>Do 2-4 more reps on the weaker arm</li>
          <li>Single-arm workouts like:
            <ol style={styles.sublist}>
              <li>Dumbbell Curls</li>
              <li>Incline Bench Curls</li>
            </ol>
          </li>
          <li>Slow & controlled reps</li>
        </ol>
      </div>

      {/* ❌ Dangerous */}
      <div style={styles.contentBox}>
        <h2 style={{ ...styles.sectionTitle, ...styles.grade.dangerous }}>DANGEROUS</h2>
        <p style={styles.paragraph}>
          A difference <strong>greater than 20%</strong> is dangerous. Focus solely on the weaker side for 2-4 weeks and retest.
        </p>
        <ol style={styles.list}>
          <li>Full range of motion with light weight</li>
          <li>3–4x/week mobility + stretching</li>
          <li>Isolation machines (preacher curl, cables)</li>
        </ol>
      </div>

      {/* 📐 Formula */}
      <div style={styles.contentBox}>
        <h2 style={{ ...styles.sectionTitle, ...styles.grade.calc }}>How We Calculate</h2>
        <p style={styles.formula}>
          Percentage Difference = ((Stronger - Weaker) / Stronger) × 100%
        </p>
      </div>
    </div>
  );
};

export default About;
