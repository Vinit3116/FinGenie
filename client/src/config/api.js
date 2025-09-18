const getAPIUrl = () => {
  // In production (Render), both frontend and backend are served from same domain
  if (import.meta.env.MODE === 'production') {
    return '/api';  // Same domain, just different path
  }
  // In development, backend runs on different port
  return 'http://localhost:8000/api';
};

export const API_BASE_URL = getAPIUrl();

// Debug logging
console.log('🌍 Environment:', import.meta.env.MODE);
console.log('🔗 API Base URL:', API_BASE_URL);