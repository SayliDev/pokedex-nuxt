import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Pokemon } from "../types/PokemonType";

export const useTeamStore = defineStore("team", () => {
  // State
  const team = ref<Pokemon[]>([]);
  const maxTeamSize = 6;
  const toastMessage = ref("");
  const toastType = ref("");
  const showToast = ref(false);

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
    if (team.value.length < maxTeamSize) {
      team.value.push(pokemon);
      saveTeam();

      showToastNotification(
        `${pokemon.name} a été ajouté à votre équipe!`,
        "success"
      );

      return true;
    } else {
      showToastNotification("Votre équipe est déjà complète!", "error");
      return false;
    }
  };

  const removeFromTeam = (index: number) => {
    if (index >= 0 && index < team.value.length) {
      const pokemonName = team.value[index].name;
      team.value.splice(index, 1);
      saveTeam();

      showToastNotification(
        `${pokemonName} a été retiré de votre équipe.`,
        "info"
      );

      return true;
    }
    return false;
  };

  const clearTeam = () => {
    team.value = [];
    saveTeam();
    showToastNotification("Votre équipe a été vidée.", "info");
  };

  // Gestion des toasts
  const showToastNotification = (message: string, type: string) => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  };

  const hideToast = () => {
    showToast.value = false;
  };

  const saveTeam = () => {
    localStorage.setItem("pokemon-team", JSON.stringify(team.value));
  };

  const saveTeamAndShowToast = () => {
    saveTeam();
    showToastNotification("Votre équipe a été sauvegardée.", "success");
  };

  const loadTeam = () => {
    if (import.meta.client) {
      const savedTeam = localStorage.getItem("pokemon-team");
      if (savedTeam) {
        try {
          team.value = JSON.parse(savedTeam);
        } catch (error) {
          console.error("Erreur lors du chargement de l'équipe :", error);
          clearTeam();
        }
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
    toastMessage,
    toastType,
    showToast,
    saveTeamAndShowToast,
    hideToast,
  };
});
