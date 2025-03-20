<template>
  <div class="relative -mt-24 mb-12 flex justify-center">
    <div class="pokemon-image-container group">
      <img
        :src="pokemon.sprites.other.home.front_default"
        :alt="pokemon.name"
        class="pokemon-image transition-transform duration-500 group-hover:scale-110"
      />
      <div
        class="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.pokemon-image-container {
  width: 220px;
  height: 220px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pokemon-image-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
}

.pokemon-image {
  width: 85%;
  height: 85%;
  object-fit: contain;
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
}

@media (min-width: 768px) {
  .pokemon-image-container {
    width: 280px;
    height: 280px;
  }
}
</style>
