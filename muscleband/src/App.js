import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import OpenScreen from './components/openscreen';
import About from './components/about';
import AccountInformation from './components/accountinformation';
import ProtectedRoute from './components/ProtectedRoute';
import PreviousTrackings from './components/PreviousTrackings';

// 👇 Add your new severity pages here
import Safe from './components/Safe';
import Moderate from './components/Moderate';
import Severe from './components/Severe';
import Dangerous from './components/Dangerous';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpenScreen />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />
        <Route path="/account" element={
          <ProtectedRoute>
            <AccountInformation />
          </ProtectedRoute>
        } />
        <Route path="/trackings" element={
          <ProtectedRoute>
            <PreviousTrackings />
          </ProtectedRoute>
        } />

        {/* 🔥 New Severity Routes */}
        <Route path="/safe" element={
          <ProtectedRoute>
            <Safe />
          </ProtectedRoute>
        } />
        <Route path="/moderate" element={
          <ProtectedRoute>
            <Moderate />
          </ProtectedRoute>
        } />
        <Route path="/severe" element={
          <ProtectedRoute>
            <Severe />
          </ProtectedRoute>
        } />
        <Route path="/dangerous" element={
          <ProtectedRoute>
            <Dangerous />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
