<template>
  <div class="card pokemon-card bg-base-100 shadow-xl">
    <figure class="px-10 pt-10 bg-base-200 rounded-t-2xl">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        alt="Pikachu"
        class="w-32 h-32"
      />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">Pikachu</h2>
      <div class="flex gap-2 my-1">
        <div class="badge badge-neutral">Électrik</div>
      </div>
      <p>#25</p>
      <div class="card-actions">
        <button class="btn btn-primary btn-sm gap-1">
          <PlusIcon class="w-5 h-5" /> Ajouter à l'équipe
        </button>
        <button class="btn btn-ghost btn-sm">
          <Info class="w-5 h-5" /> Détails
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, Info } from "lucide-vue-next";
</script>

<style></style>
