import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
  server: {
    host: true, // <-- listen on all network interfaces (0.0.0.0)
    port: process.env.PORT ? Number(process.env.PORT) : 5173, // <-- use Render port if available
    allowedHosts: 'all', // <-- allow external access
  },
  preview: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
    allowedHosts: ['rio-shoes.onrender.com'], // <-- add your Render domain here
  },

});
