import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import MyTrips from './pages/MyTrips/MyTrips';
import CreateTrip from './pages/CreateTrip/CreateTrip';
import Explore from './pages/Explore/Explore';
import Activities from './pages/Activities/Activities';
import Itinerary from './pages/Itinerary/Itinerary';
import Budget from './pages/Budget/Budget';
import CalendarPage from './pages/Calendar/Calendar';
import Community from './pages/Community/Community';
import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';

function hasToken() {
  return Boolean(localStorage.getItem('globetrotter_access_token'));
}

function ProtectedRoute({ children }) {
  return hasToken() ? children : <Navigate to="/login" replace />;
}

function PublicOnlyRoute({ children }) {
  return hasToken() ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />

          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<Navigate to={hasToken() ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </BrowserRouter>
    </TripProvider>
  );
}
