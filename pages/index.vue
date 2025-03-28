<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Card from "../components/Card.vue";
import DetailModal from "../components/DetailModal.vue";
import Hero from "../components/Hero.vue";
import { usePokemonStore } from "../stores/pokemonStore";

const store = usePokemonStore();

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    store.loadMorePokemons();
  }
};

const handleSearch = (query: string) => {
  store.setSearchQuery(query);
};

onMounted(() => {
  store.loadMorePokemons();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Hero @search="handleSearch" />
  <!-- Liste des Pokémon -->
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-6 text-center">Pokémon populaires</h2>
    <TransitionGroup
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      name="fade"
    >
      <Card
        v-for="pokemon in store.filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        class="mx-auto"
        :class="{
          'col-span-full md:col-span-1 md:mx-auto':
            store.filteredPokemons.length === 1,
        }"
      />
      <div
        class="col-span-full text-center text-gray-500 text-lg font-bold"
        v-if="store.filteredPokemons.length === 0 && store.searchQuery"
      >
        <img class="w-1/4 mx-auto" src="@/assets/page-empty.png" alt="" />
        <p class="text-center">Aucun Pokémon trouvé.</p>
      </div>
    </TransitionGroup>
    <!-- Loader -->
    <div v-if="store.isLoading" class="text-center my-4">
      <span class="loading loading-spinner loading-xl"></span>
    </div>
  </div>
  <DetailModal />
</template>

<style scoped>
.fade-enter-active {
  animation: fadeInUp 0.5s ease forwards;
}

.fade-leave-active {
  animation: fadeOut 0.3s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
