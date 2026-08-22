const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// ─── Token Storage ─────────────────────────────────────────────
export function getStoredToken() {
  return localStorage.getItem('globetrotter_access_token');
}
export function setStoredToken(token) {
  if (!token) { localStorage.removeItem('globetrotter_access_token'); return; }
  localStorage.setItem('globetrotter_access_token', token);
}
export function getStoredUser() {
  try { return JSON.parse(localStorage.getItem('globetrotter_user')); } catch { return null; }
}
export function setStoredUser(user) {
  if (!user) { localStorage.removeItem('globetrotter_user'); return; }
  localStorage.setItem('globetrotter_user', JSON.stringify(user));
}
export function clearAuth() {
  localStorage.removeItem('globetrotter_access_token');
  localStorage.removeItem('globetrotter_user');
}

// ─── Core Request ──────────────────────────────────────────────
let isRefreshing = false;
let pendingRequests = [];

async function tryRefreshToken() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    const payload = await res.json().catch(() => ({}));
    if (res.ok && payload.response?.accessToken) {
      setStoredToken(payload.response.accessToken);
      if (payload.response?.user) setStoredUser(payload.response.user);
      return payload.response.accessToken;
    }
  } catch { /* silent */ }
  clearAuth();
  return null;
}

async function apiRequest(endpoint, options = {}, _retry = false) {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token && !options.skipAuth) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
    headers,
  });

  const payload = await response.json().catch(() => ({}));

  // Auto token-refresh on 401
  if (response.status === 401 && !_retry && !options.skipAuth) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject, endpoint, options });
      });
    }
    isRefreshing = true;
    const newToken = await tryRefreshToken();
    isRefreshing = false;

    if (newToken) {
      // Retry pending
      pendingRequests.forEach(({ resolve, reject, endpoint: ep, options: op }) => {
        apiRequest(ep, op, true).then(resolve).catch(reject);
      });
      pendingRequests = [];
      return apiRequest(endpoint, options, true);
    } else {
      pendingRequests.forEach(({ reject }) => reject(new Error('Session expired')));
      pendingRequests = [];
      window.location.href = '/login';
      throw new Error('Session expired');
    }
  }

  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed');
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

// ─── Auth API ──────────────────────────────────────────────────
export const authApi = {
  login: (data) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
  logoutAll: () => apiRequest('/auth/logout-all', { method: 'POST' }),
  refresh: () => apiRequest('/auth/refresh', { method: 'POST', skipAuth: true }),
  forgotPassword: (data) => apiRequest('/auth/forgot-password', { method: 'POST', body: JSON.stringify(data) }),
  resetPassword: (data) => apiRequest('/auth/reset-password', { method: 'POST', body: JSON.stringify(data) }),
};

// ─── User API ──────────────────────────────────────────────────
export const userApi = {
  getProfile: () => apiRequest('/users/me'),
  updateProfile: (data) => apiRequest('/users/profile', { method: 'PUT', body: JSON.stringify(data) }),
};

// ─── Trip API ─────────────────────────────────────────────────
export const tripApi = {
  list: () => apiRequest('/trips'),
  getStats: () => apiRequest('/trips/stats'),
  create: (data) => apiRequest('/trips', { method: 'POST', body: JSON.stringify(data) }),
  getById: (tripId) => apiRequest(`/trips/${tripId}`),
  update: (tripId, data) => apiRequest(`/trips/${tripId}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (tripId) => apiRequest(`/trips/${tripId}`, { method: 'DELETE' }),

  // Stops
  addStop: (tripId, data) => apiRequest(`/trips/${tripId}/stops`, { method: 'POST', body: JSON.stringify(data) }),
  updateStop: (tripId, stopId, data) => apiRequest(`/trips/${tripId}/stops/${stopId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteStop: (tripId, stopId) => apiRequest(`/trips/${tripId}/stops/${stopId}`, { method: 'DELETE' }),

  // Activities
  addActivity: (tripId, data) => apiRequest(`/trips/${tripId}/activities`, { method: 'POST', body: JSON.stringify(data) }),
  updateActivity: (tripId, activityId, data) => apiRequest(`/trips/${tripId}/activities/${activityId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteActivity: (tripId, activityId) => apiRequest(`/trips/${tripId}/activities/${activityId}`, { method: 'DELETE' }),
};
