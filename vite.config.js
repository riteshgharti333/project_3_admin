import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000, // Ensures frontend runs on port 3000
    strictPort: true, // Prevents automatic port switching
  },
})
