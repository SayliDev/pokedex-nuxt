export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"], // Assurez-vous que le chemin est correct
});
