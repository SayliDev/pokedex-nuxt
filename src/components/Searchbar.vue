<template>
  <div class="form-control w-full max-w-lg mx-auto flex justify-center">
    <input
      type="text"
      placeholder="Rechercher un Pokémon..."
      class="input input-bordered w-full"
      @input="$emit('search', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineEmits(["search"]);
</script>
