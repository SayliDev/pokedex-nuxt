<script setup lang="ts">
import { useTeamStore } from "@/stores/teamStore";

const teamStore = useTeamStore();

if (import.meta.client) {
  teamStore.loadTeam();
}
</script>

<template>
  <html lang="fr" data-theme="bumblebee">
    <body data-theme="bumblebee">
      <NuxtPage />
    </body>
  </html>
</template>
