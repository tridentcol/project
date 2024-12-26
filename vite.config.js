import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'project1', // Reemplaza con el nombre de tu repositorio
})
