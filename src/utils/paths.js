// Get the base URL from import.meta.env.BASE_URL (set by Vite)
export const BASE_URL = import.meta.env.BASE_URL

// Helper function to get full asset path
export const getAssetPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_URL}${cleanPath}`
}
