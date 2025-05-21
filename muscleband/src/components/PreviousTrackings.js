import React, { useEffect, useState } from 'react';
import TopNavBar from './TopNavBar';

const PreviousTrackings = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [userFirstName, setUserFirstName] = useState('User');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.firstName) setUserFirstName(user.firstName);

    const fetchEMGHistory = async () => {
      try {
        if (!user || !user._id) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        console.log("🧪 Fetching EMG history for user ID:", user._id);

        let attempts = 0;
        let success = false;

        while (attempts < 3 && !success) {
          try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/emg/fetch/${user._id}`);
            if (res.ok) {
              const data = await res.json();
              setHistory(data);
              success = true;
              break;
            } else {
              console.warn(`⚠️ Attempt ${attempts + 1} failed. Status: ${res.status}`);
            }
          } catch (fetchErr) {
            console.warn(`❌ Attempt ${attempts + 1} error:`, fetchErr.message);
          }

          await new Promise(resolve => setTimeout(resolve, 3000)); // wait before retry
          attempts++;
        }

        if (!success) {
          setError("Server not responding or failed to fetch data.");
        }
      } catch (err) {
        console.error("❌ Unexpected fetch error:", err);
        setError("Failed to fetch EMG history.");
      } finally {
        setLoading(false);
      }
    };

    fetchEMGHistory();
  }, []);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = history.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(history.length / recordsPerPage);

  return (
    <div style={styles.pageContainer}>
      <TopNavBar
        userFirstName={userFirstName}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
        hoveredNav={hoveredNav}
        setHoveredNav={setHoveredNav}
      />

      <h2 style={styles.title}>🧠 Previous EMG Sessions</h2>

      {loading && <p style={styles.loading}>⏳ Loading data...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && !error && history.length === 0 && (
        <p style={styles.noData}>No EMG records found yet.</p>
      )}

      {!loading && history.length > 0 && (
        <>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Left Bicep</th>
                  <th style={styles.th}>Right Bicep</th>
                  <th style={styles.th}>% Difference</th>
                  <th style={styles.th}>Severity</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleString()
                        : 'N/A'}
                    </td>
                    <td style={styles.td}>
                      {item.left_bicep?.toFixed(2) ?? 'N/A'}
                    </td>
                    <td style={styles.td}>
                      {item.right_bicep?.toFixed(2) ?? 'N/A'}
                    </td>
                    <td style={styles.td}>
                      {item.percentage_difference?.toFixed(2) ?? 'N/A'}%
                    </td>
                    <td style={{
                      ...styles.td,
                      ...getSeverityStyle(item.severity_grade),
                    }}>
                      {item.severity_grade || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={styles.pageButton}
            >
              ◀ Prev
            </button>
            <span style={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={styles.pageButton}
            >
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ========== Styles ==========
const styles = {
  pageContainer: {
    padding: '120px 30px 50px',
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)',
    minHeight: '100vh',
    overflowX: 'hidden',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '32px',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '16px',
  },
  noData: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#555',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  th: {
    backgroundColor: '#f4f6f8',
    padding: '15px',
    fontSize: '16px',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #eee',
    fontSize: '15px',
    color: '#333',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    gap: '10px',
  },
  pageButton: {
    padding: '8px 16px',
    fontSize: '14px',
    borderRadius: '6px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  pageInfo: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

const getSeverityStyle = (grade) => {
  switch (grade?.toLowerCase()) {
    case 'safe':
      return { color: 'green', fontWeight: 'bold' };
    case 'moderate':
      return { color: '#FFC107', fontWeight: 'bold' };
    case 'severe':
      return { color: '#FF9800', fontWeight: 'bold' };
    case 'dangerous':
      return { color: '#F44336', fontWeight: 'bold' };
    default:
      return { color: '#333' };
  }
};

export default PreviousTrackings;
