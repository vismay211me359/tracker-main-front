// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const API_ENDPOINTS = {
  signup: `${API_BASE_URL}/api/signup`,
  login: `${API_BASE_URL}/api/login`,
  verify: `${API_BASE_URL}/api/verify`,
  submit: `${API_BASE_URL}/api/submit`,
  history: `${API_BASE_URL}/api/history`,
}

export { API_BASE_URL }
