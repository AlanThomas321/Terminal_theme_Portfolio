import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // allow external access (including ngrok)
    port: 5173,       // optional: specify a consistent port
    allowedHosts: ['6e85-109-78-157-55.ngrok-free.app'],
    strictPort: true  // optional: ensures Vite fails if port is taken
  }
})
