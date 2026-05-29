// Get the base URL from environment variables
export const BASE_URL = import.meta.env.VITE_BASE_URL

// Helper function to get full asset path
export const getAssetPath = (path) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}${cleanPath}`
}
