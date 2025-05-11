import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 9002,
  },
  // Add publicDir configuration
  publicDir: 'public',
  // Add optimizeDeps configuration for better font handling
  optimizeDeps: {
    include: ['@fontsource/geist']
  }
})
