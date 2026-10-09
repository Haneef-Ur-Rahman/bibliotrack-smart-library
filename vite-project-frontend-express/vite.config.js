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
  // Note: 'darkMode' is usually configured in tailwind.config.js,
  // but if this works for your setup, you can keep it.
  darkMode: "class",

  plugins: [react(), tailwindcss()],

  // ==================== ADD THIS PROXY CONFIGURATION ====================
  server: {
    proxy: {
      // Forward any request that starts with '/api' to your backend server
      "/api": {
        target: `${import.meta.env.VITE_API_URL}`, // Your Express server address
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Don't verify SSL certs (for local dev)
      },
    },
  },
  // ===================================================================
});
