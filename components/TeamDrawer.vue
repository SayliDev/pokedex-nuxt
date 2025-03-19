<template>
  <TransitionRoot as="template" :show="store.isDrawerOpen">
    <Dialog class="relative z-50" @close="store.closeDrawer()">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="pointer-events-auto relative w-screen max-w-md"
              >
                <TransitionChild
                  as="template"
                  enter="ease-in-out duration-500"
                  enter-from="opacity-0"
                  enter-to="opacity-100"
                  leave="ease-in-out duration-500"
                  leave-from="opacity-100"
                  leave-to="opacity-0"
                >
                  <div
                    class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4"
                  >
                    <button
                      type="button"
                      class="relative rounded-md text-gray-300 cursor-pointer transition ease-in-out duration-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                      @click="store.closeDrawer()"
                    >
                      <span class="absolute -inset-2.5" />
                      <span class="sr-only">Close panel</span>
                      <XCircle class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl rounded-lg"
                >
                  <div class="relative flex-1 px-4 sm:px-6">
                    <div class="flex flex-col h-full">
                      <!-- Header -->
                      <div class="mb-6">
                        <h3 class="text-xl font-bold flex items-center">
                          <ChartNoAxesGantt class="mr-2 h-6 w-6" />
                          Mon Équipe Pokémon
                        </h3>
                        <p class="text-sm text-gray-500">
                          {{ teamStore.team.length }}/6 Pokémon
                        </p>
                      </div>

                      <!-- Liste Pokémon équipe -->
                      <div
                        v-if="teamStore.team.length > 0"
                        class="space-y-4 flex-1 overflow-y-auto"
                      >
                        <draggable
                          v-model="teamStore.team"
                          item-key="id"
                          class="space-y-4"
                          ghost-class="ghost-card"
                          handle=".pokemon-team-content"
                          @end="onDragEnd"
                        >
                          <template #item="{ element: pokemon, index }">
                            <div class="pokemon-team-card group">
                              <div
                                class="pokemon-team-content relative rounded-lg shadow-md p-3 flex items-center cursor-move"
                                :class="
                                  getTypeColor(pokemon.types?.[0] || 'normal')
                                "
                              >
                                <!-- Pattern  -->
                                <div
                                  class="absolute inset-0 rounded-lg opacity-20 bg-pattern"
                                ></div>

                                <!-- Image Pokémon -->
                                <div class="pokemon-team-image flex-shrink-0">
                                  <img
                                    :src="pokemon.sprite"
                                    :alt="pokemon.name"
                                    class="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>

                                <!-- Infos Pokémon -->
                                <div class="pokemon-team-info ml-3 flex-1">
                                  <div class="flex justify-between items-start">
                                    <div>
                                      <h4
                                        class="font-bold capitalize text-white"
                                      >
                                        {{ pokemon.name }}
                                      </h4>
                                      <div class="flex gap-1 mt-1">
                                        <span
                                          v-for="type in pokemon.types"
                                          :key="type"
                                          class="badge badge-sm text-xs capitalize text-white"
                                          :class="getTypeBadgeColor(type)"
                                        >
                                          {{ type }}
                                        </span>
                                      </div>
                                    </div>
                                    <span
                                      class="text-sm font-bold text-white opacity-80"
                                    >
                                      #{{ formatId(pokemon.id) }}
                                    </span>
                                  </div>

                                  <!-- Mini stats -->
                                  <div class="grid grid-cols-3 gap-1 mt-2">
                                    <div class="mini-stat">
                                      <span class="mini-stat-value">{{
                                        pokemon.stats.find(
                                          (s) => s.name === "hp"
                                        )?.value || "?"
                                      }}</span>
                                      <span class="mini-stat-label">HP</span>
                                    </div>
                                    <div class="mini-stat">
                                      <span class="mini-stat-value">{{
                                        pokemon.stats.find(
                                          (s) => s.name === "attack"
                                        )?.value || "?"
                                      }}</span>
                                      <span class="mini-stat-label">ATK</span>
                                    </div>
                                    <div class="mini-stat">
                                      <span class="mini-stat-value">{{
                                        pokemon.stats.find(
                                          (s) => s.name === "defense"
                                        )?.value || "?"
                                      }}</span>
                                      <span class="mini-stat-label">DEF</span>
                                    </div>
                                  </div>
                                </div>

                                <!-- Actions -->
                                <div
                                  class="pokemon-team-actions flex-shrink-0 ml-2 z-40"
                                >
                                  <button
                                    @click="removePokemon(index)"
                                    class="btn btn-circle btn-sm bg-white/20 border-none text-white hover:bg-white/40"
                                  >
                                    <X class="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </template>
                        </draggable>
                      </div>

                      <!-- Message équipe vide -->
                      <div
                        v-else
                        class="flex-1 flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-lg"
                      >
                        <div class="h-24 w-24 text-gray-300 mb-4">
                          <img
                            :src="randomPokemonUrl"
                            alt="Pokemon"
                            class="w-full h-full object-contain"
                          />
                        </div>
                        <h4 class="font-medium text-lg mb-2">Équipe vide</h4>
                        <p class="text-gray-500 text-sm mb-4">
                          Ajoutez des Pokémon à votre équipe pour les voir
                          apparaître ici.
                        </p>
                        <button
                          @click="store.closeDrawer()"
                          class="btn btn-primary btn-sm"
                        >
                          Découvrir des Pokémon
                        </button>
                      </div>

                      <!-- Actions bottom -->
                      <div
                        class="mt-6 pt-4 border-t border-gray-200"
                        v-if="teamStore.team.length > 0"
                      >
                        <div class="flex justify-between">
                          <button
                            class="btn btn-outline btn-sm"
                            @click="clearTeam"
                          >
                            <Trash2 class="h-4 w-4 mr-1" />
                            Vider
                          </button>
                          <button
                            class="btn btn-primary btn-sm"
                            @click="saveTeam"
                          >
                            <Save class="h-4 w-4 mr-1" />
                            Sauvegarder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ChartNoAxesGantt, Save, Trash2, X, XCircle } from "lucide-vue-next";
import { computed, ref } from "vue";
import draggable from "vuedraggable";
import { usePokemonStore } from "../stores/pokemonStore";
import { useTeamStore } from "../stores/teamStore";
import {
  formatId,
  getTypeBadgeColor,
  getTypeColor,
} from "../utils/pokemonUtils";

const store = usePokemonStore();
const teamStore = useTeamStore();
const randomPokemonId = ref(Math.floor(Math.random() * 100) + 1);
const randomPokemonUrl = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPokemonId.value}.png`
);

const removePokemon = (index) => {
  teamStore.removeFromTeam(index);
};

const clearTeam = () => {
  teamStore.clearTeam();
};

const saveTeam = () => {
  console.log("Saving team...");

  teamStore.saveTeamAndShowToast();
};
</script>

<style>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.pokemon-team-card {
  transition: all 0.2s ease;
}

.pokemon-team-card:hover {
  transform: translateY(-2px);
}

.mini-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
}

.mini-stat-value {
  font-weight: bold;
  font-size: 0.875rem;
  color: white;
}

.mini-stat-label {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
}
.ghost-card {
  opacity: 0.5;
  background: #ccc;
  border: 1px dashed #333;
  border-radius: 0.5rem;
}

.pokemon-team-content {
  transition: background-color 0.2s;
}
</style>
