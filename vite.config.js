import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/now44/',
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})
