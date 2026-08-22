import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route without Layout */}
        <Route path="/login" element={<Login />} />

        {/* App Routes wrapped in common Layout (Navbar + Footer) */}
        <Route element={<Layout />}>
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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
