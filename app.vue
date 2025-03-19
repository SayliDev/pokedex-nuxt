<script setup lang="ts">
import { useTeamStore } from "@/stores/teamStore";
import Navbar from "@/components/Navbar.vue";
import DrawerHandle from "@/components/DrawerHandle.vue";
import Toast from "@/components/Toast.vue";
import TeamDrawer from "@/components/TeamDrawer.vue";

const teamStore = useTeamStore();

if (import.meta.client) {
  teamStore.loadTeam();
}
</script>

<template>
  <html lang="fr" data-theme="bumblebee">
    <body data-theme="bumblebee">
      <Navbar />

      <NuxtPage />

      <DrawerHandle />

      <Toast
        :message="teamStore.toastMessage"
        :toast-type="teamStore.toastType"
        :show-toast="teamStore.showToast"
        @hide="teamStore.hideToast"
      />
      <TeamDrawer />
    </body>
  </html>
</template>
