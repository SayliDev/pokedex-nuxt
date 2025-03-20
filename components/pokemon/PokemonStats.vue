<template>
  <div class="lg:col-span-8 p-6">
    <h2 class="card-title flex items-center mb-4 text-xl">
      <BarChart class="h-5 w-5 mr-2 text-secondary" />
      Statistiques
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div
          v-for="stat in stats.slice(0, 3)"
          :key="stat.stat.name"
          class="stat-progress"
        >
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium capitalize">{{
              formatStatName(stat.stat.name)
            }}</span>
            <span class="text-sm font-bold">{{ stat.base_stat }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div
              class="h-3 rounded-full transition-all duration-1000"
              :class="getStatBarColor(stat.stat.name)"
              :style="{
                width: `${Math.min(100, (stat.base_stat / 155) * 100)}%`,
              }"
            ></div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="stat in stats.slice(3)"
          :key="stat.stat.name"
          class="stat-progress"
        >
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium capitalize">{{
              formatStatName(stat.stat.name)
            }}</span>
            <span class="text-sm font-bold">{{ stat.base_stat }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div
              class="h-3 rounded-full transition-all duration-1000"
              :class="getStatBarColor(stat.stat.name)"
              :style="{
                width: `${Math.min(100, (stat.base_stat / 155) * 100)}%`,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BarChart } from "lucide-vue-next";
import { formatStatName, getStatBarColor } from "@/utils/pokemonUtils";

const props = defineProps({
  stats: {
    type: Array,
    required: true,
  },
});
</script>
