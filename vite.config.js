import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Use root path for production on custom domain
  const base = '/'
  
  return {
    plugins: [react()],
    base: base,
    assetsInclude: ['**/*.glb', '**/*.gltf'],
  }
})