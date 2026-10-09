// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
//-------------------------------------------

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   darkMode: "class", // 🔥 REQUIRED

//   plugins: [
//     react(),
//     tailwindcss(), // 👈 yeh add karna zaroori hai
//   ],
// });
//--------------------------------------------------

// In vite.config.js (in your React project's root folder)

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  darkMode: "class",

  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3002", // ← Yeh waise hi rakho
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
  // ===================================================================

