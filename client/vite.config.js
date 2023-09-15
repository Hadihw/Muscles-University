// vite.config.js

import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // Add these lines
        secure: false,
        changeOrigin: true,
      },
    },
  },
});