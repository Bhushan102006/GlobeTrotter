const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

function getStoredToken() {
  return localStorage.getItem('globetrotter_access_token');
}

function setStoredToken(token) {
  if (!token) {
    localStorage.removeItem('globetrotter_access_token');
    return;
  }

  localStorage.setItem('globetrotter_access_token', token);
}

function getStoredUser() {
  try {
    const raw = localStorage.getItem('globetrotter_user');
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function setStoredUser(user) {
  if (!user) {
    localStorage.removeItem('globetrotter_user');
    return;
  }

  localStorage.setItem('globetrotter_user', JSON.stringify(user));
}

function clearAuth() {
  localStorage.removeItem('globetrotter_access_token');
  localStorage.removeItem('globetrotter_user');
}

async function apiRequest(endpoint, options = {}) {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token && !options.skipAuth) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
    headers,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed');
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export const authApi = {
  login: (data) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  register: (data) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  logout: () => apiRequest('/auth/logout', {
    method: 'POST',
  }),
};

export const userApi = {
  getProfile: () => apiRequest('/users/me'),
  updateProfile: (data) => apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

export const tripApi = {
  list: () => apiRequest('/trips'),
  create: (data) => apiRequest('/trips', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getById: (tripId) => apiRequest(`/trips/${tripId}`),
  update: (tripId, data) => apiRequest(`/trips/${tripId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  remove: (tripId) => apiRequest(`/trips/${tripId}`, {
    method: 'DELETE',
  }),
};

export { getStoredToken, setStoredToken, getStoredUser, setStoredUser, clearAuth };
