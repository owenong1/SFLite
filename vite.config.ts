import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // String shorthand for simple proxy
      '/api': {
        target: 'https://www.myskillsfuture.gov.sg',
        changeOrigin: true,
        // Rewrite the path: remove '/api' from the start
        rewrite: (path ) => path.replace(/^\/api/, ''),
      },
    },
  },
})
