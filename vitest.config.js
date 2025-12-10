import { defineConfig } from 'vitest/config'
import { preview } from '@vitest/browser-preview'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    browser: {
      enabled: false,
      provider: preview(),
      instances: [
      ],
    },
  },
})
