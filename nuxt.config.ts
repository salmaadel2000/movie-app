import path from 'path';
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  css: ['~/assets/css/main.css'], 
  alias: {
    '@': path.resolve(__dirname, './src'), 
    '~': path.resolve(__dirname, './'), 
  },
  postcss: {
    plugins: {
      tailwindcss: {}, 
      autoprefixer: {},
    },
  },
  plugins: [
    '~/plugins/pinia.js',    
  ],
});
