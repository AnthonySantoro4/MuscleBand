import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopNavBar = ({ userFirstName, toggleMenu, isMenuOpen, hoveredNav, setHoveredNav }) => {
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Home', path: '/home' },
    { label: 'Account Information', path: '/account' },
    { label: 'Previous Trackings', path: '/trackings' },
    { label: 'About', path: '/about' },
  ];

  const styles = {
    topBanner: {
      backgroundColor: 'white',
      padding: '10px 0',
      width: '100%', // ✅ FIXED: changed from 110% to 100%
      height: '50px',
      position: 'fixed', // ✅ make sure it stays pinned on scroll
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      boxSizing: 'border-box',
      overflowX: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      position: 'absolute',
      cursor: 'default',
      marginLeft: '100px',
      left: '0',
      zIndex: 103,
    },
    profileIcon: {
      width: '30px',
      height: '30px',
      background: '#000',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    },
    userGreeting: {
      fontWeight: 'bold',
      padding: '5px 10px',
      borderRadius: '15px',
    },
    tripleCircleButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      marginRight: '100px',
      position: 'absolute',
      right: '0',
      zIndex: 103,
    },
    circle: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'linear-gradient(to bottom, #ff3e3e 0%, #ff8443 100%)',
    },
    circleMid: {
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      background: 'linear-gradient(to bottom, #ff3e3e 0%, #ff8443 100%)',
    },
    navContainer: {
      position: 'absolute',
      top: '80px',
      left: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 102,
      opacity: isMenuOpen ? 1 : 0,
      visibility: isMenuOpen ? 'visible' : 'hidden',
      transition: 'opacity 0.2s ease-out, visibility 0.1s ease-out',
    },
    navButtonsRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      width: '80%',
    },
    navButton: {
      padding: '12px 25px',
      backgroundColor: 'white',
      color: '#333',
      border: 'none',
      borderRadius: '25px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease',
    },
    navButtonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      background: 'linear-gradient(to right, #ff3e3e 0%, #ff8443 100%)',
      color: 'white',
    },
  };

  return (
    <>
      <div style={styles.topBanner}>
        <div style={styles.userProfile}>
          <div style={styles.profileIcon}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <circle cx="12" cy="8" r="4" fill="currentColor" />
              <path d="M12,14c-6.1,0-8,4-8,4v2h16v-2C20,18,18.1,14,12,14z" fill="currentColor" />
            </svg>
          </div>
          <span style={styles.userGreeting}>Hello, {userFirstName}!</span>
        </div>

        <div style={styles.tripleCircleButton} onClick={toggleMenu}>
          <div style={styles.circle}></div>
          <div style={styles.circleMid}></div>
          <div style={styles.circle}></div>
        </div>
      </div>

      <div style={styles.navContainer}>
        <div style={styles.navButtonsRow}>
          {navigationItems.map((item, index) => (
            <button
              key={index}
              style={{
                ...styles.navButton,
                ...(hoveredNav === item.label ? styles.navButtonHover : {}),
              }}
              onMouseEnter={() => setHoveredNav(item.label)}
              onMouseLeave={() => setHoveredNav(null)}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
