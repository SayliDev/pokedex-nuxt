import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@pinia/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },

  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
});
