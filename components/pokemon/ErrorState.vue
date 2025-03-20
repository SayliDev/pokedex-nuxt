<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h2 class="text-2xl font-bold mb-4">Pokémon non trouvé</h2>
      <p class="text-gray-500 mb-6">
        Impossible de charger les données du Pokémon.
      </p>
      <button @click="$emit('go-back')" class="btn btn-primary">Retour</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(["go-back"]);
</script>
