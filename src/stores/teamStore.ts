import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Pokemon } from "../types/PokemonType";

export const useTeamStore = defineStore("team", () => {
  // State
  const team = ref<Pokemon[]>([]);
  const maxTeamSize = 6;

  // Getters
  const isTeamFull = computed(() => team.value.length >= maxTeamSize);
  const teamSize = computed(() => team.value.length);
  const teamTypes = computed(() => {
    const types = new Set<string>();
    team.value.forEach((pokemon) => {
      pokemon.types.forEach((type) => types.add(type));
    });
    return Array.from(types);
  });

  // Actions
  const addToTeam = (pokemon: Pokemon) => {
    console.log("Flag 1");
    if (team.value.length < maxTeamSize) {
      console.log("Flag 2");

      team.value.push(pokemon);
      return true;
    } else {
      console.warn("Votre équipe est complète (6 Pokémon maximum).");
      return false;
    }
  };

  const removeFromTeam = (index: number) => {
    if (index >= 0 && index < team.value.length) {
      team.value.splice(index, 1);
      return true;
    }
    return false;
  };

  const clearTeam = () => {
    team.value = [];
  };

  const saveTeam = () => {
    localStorage.setItem("pokemon-team", JSON.stringify(team.value));
  };

  const loadTeam = () => {
    const savedTeam = localStorage.getItem("pokemon-team");
    if (savedTeam) {
      try {
        team.value = JSON.parse(savedTeam);
      } catch (error) {
        console.error("Erreur lors du chargement de l'équipe :", error);
        clearTeam();
      }
    }
  };

  loadTeam();

  return {
    team,
    maxTeamSize,
    isTeamFull,
    teamSize,
    teamTypes,
    addToTeam,
    removeFromTeam,
    clearTeam,
    saveTeam,
    loadTeam,
  };
});
