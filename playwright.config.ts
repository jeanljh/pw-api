// playwright.config.ts
import { defineConfig } from '@playwright/test'
export default defineConfig({
  reporter: [['list'], ['html']],
  use: {
    baseURL: 'https://ott-details.p.rapidapi.com/search',
    extraHTTPHeaders: {
      'X-RapidAPI-Key': '367e2d391cmsha1d5ce075ea7419p11b8ddjsnfa27b3c69464',
      'X-RapidAPI-Host': 'ott-details.p.rapidapi.com',
    },
  },
})
