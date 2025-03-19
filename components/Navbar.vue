<template>
  <div class="navbar-container sticky top-0 z-40">
    <div class="navbar bg-base-100/80 backdrop-blur-md shadow-md px-4 lg:px-8">
      <div class="navbar-start">
        <div class="flex items-center">
          <div class="flex items-center">
            <img
              src="@/assets/pokeball.png"
              alt="Pokeball"
              class="w-8 h-8 mr-2"
            />
          </div>

          <a class="font-bold text-xl md:text-2xl tracking-tight pokemon-title">
            Pokédex
            <span
              class="text-xs font-normal tracking-normal opacity-70 hidden sm:inline-block"
              >v1.0</span
            >
          </a>
        </div>
      </div>

      <div class="navbar-end">
        <a
          href="https://github.com/SayliDev"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2"
        >
          <p class="text-sm font-medium text-gray-500">by SayliDev</p>
          <Github class="h-5 w-5" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Github } from "lucide-vue-next";
</script>

<style>
.pokemon-title {
  background: linear-gradient(
    90deg,
    #ff4b4b,
    #ffde4b,
    #59ed5c,
    #4bc9ff,
    #834bff
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 300% 100%;
  animation: rainbow 8s ease infinite;
}

@keyframes rainbow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
