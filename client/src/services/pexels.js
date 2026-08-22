// Pexels API service with caching
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY || 'wjEcYBXpW2BKoGfKYOAS7p0rmdo8ox94mPaTWIpSUd0IkDYaFcO78AqP';
const BASE_URL = 'https://api.pexels.com/v1';

const cache = new Map();

export async function searchPhotos(query, perPage = 1, page = 1) {
  const cacheKey = `${query}-${perPage}-${page}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&orientation=landscape`,
      {
        headers: { Authorization: API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Pexels API error:', error);
    return { photos: [] };
  }
}

export async function getPhotoUrl(query, size = 'large2x') {
  const data = await searchPhotos(query, 1);
  if (data.photos && data.photos.length > 0) {
    return data.photos[0].src[size] || data.photos[0].src.large;
  }
  return null;
}

export async function getMultiplePhotos(query, count = 5) {
  const data = await searchPhotos(query, count);
  if (data.photos) {
    return data.photos.map(p => ({
      id: p.id,
      url: p.src.large2x || p.src.large,
      medium: p.src.medium,
      small: p.src.small,
      alt: p.alt || query,
      photographer: p.photographer,
    }));
  }
  return [];
}

// Fallback gradient for when images haven't loaded yet
export const placeholderGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
