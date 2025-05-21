import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavBar from './TopNavBar';
import { useNavigate } from 'react-router-dom';

const AccountInformation = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [userFirstName, setUserFirstName] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.firstName) setUserFirstName(parsedUser.firstName);
        if (parsedUser.emailAddress) setUserEmail(parsedUser.emailAddress);
        if (parsedUser._id) setUserId(parsedUser._id);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const updateEmail = async (e) => {
    e.preventDefault();
    if (!email || email === userEmail) {
      setMessage('Please enter a valid new email address.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.put('http://localhost:5002/api/auth/update-email', {
        userId,
        newEmail: email,
      });

      setUserEmail(response.data.user.emailAddress);

      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        parsedUser.emailAddress = response.data.user.emailAddress;
        localStorage.setItem('user', JSON.stringify(parsedUser));
      }

      setMessage('Email updated successfully');
      setMessageType('success');
      setEmail('');
    } catch (error) {
      console.error('Error updating email:', error);
      setMessage(error.response?.data?.message || 'Failed to update email.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      setMessage('Please check your password fields.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      await axios.put('http://localhost:5002/api/auth/update-password', {
        userId,
        currentPassword,
        newPassword,
      });

      setMessage('Password updated successfully');
      setMessageType('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage(error.response?.data?.message || 'Failed to update password.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb, #e2b0ff, #d896ff)',
      alignItems: 'center',
      paddingTop: '120px',
      paddingBottom: '40px',
    },
    mainContent: {
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '30px',
      width: '90%',
      maxWidth: '500px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '8px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#ff6347',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    message: {
      textAlign: 'center',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb',
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
    },
    divider: {
      height: '1px',
      backgroundColor: '#eee',
      margin: '30px 0',
    },
  };

  return (
    <div style={styles.container}>
      <TopNavBar
        userFirstName={userFirstName}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
        hoveredNav={hoveredNav}
        setHoveredNav={setHoveredNav}
      />

      <div style={styles.mainContent}>
        <h2 style={styles.title}>Update Email</h2>
        {message && (
          <div
            style={{
              ...styles.message,
              ...(messageType === 'success' ? styles.success : styles.error),
            }}
          >
            {message}
          </div>
        )}

        <div>
          <label style={styles.label}>Current Email:</label>
          <p>{userEmail || 'Not available'}</p>
        </div>

        <form onSubmit={updateEmail}>
          <label style={styles.label}>New Email</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email"
          />
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Email'}
          </button>
        </form>

        <div style={styles.divider}></div>

        <h2 style={styles.title}>Change Password</h2>
        <form onSubmit={updatePassword}>
          <label style={styles.label}>Current Password</label>
          <input
            type="password"
            style={styles.input}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label style={styles.label}>New Password</label>
          <input
            type="password"
            style={styles.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label style={styles.label}>Confirm New Password</label>
          <input
            type="password"
            style={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountInformation;
