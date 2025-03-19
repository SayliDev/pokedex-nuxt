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
      <Toast
        :message="teamStore.toastMessage"
        :toast-type="teamStore.toastType"
        :show-toast="teamStore.showToast"
        @hide="teamStore.hideToast"
      />
    </body>
  </html>
</template>
