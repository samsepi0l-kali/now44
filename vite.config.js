import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Use different base paths based on environment
  const base = mode === 'production' ? '/now44/' : '/'
  
  return {
    plugins: [react()],
    base: base,
    assetsInclude: ['**/*.glb', '**/*.gltf'],
  }
})
