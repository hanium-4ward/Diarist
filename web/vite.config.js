// vite.config.js
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // '0.0.0.0'로 설정하여 모든 네트워크 인터페이스에서 접속 가능하도록 함
    port: 5173,
  },
});
