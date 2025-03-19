<template>
  <Teleport to="body">
    <div class="toast-container fixed bottom-4 right-4 pointer-events-none">
      <Transition
        name="toast"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
        @after-leave="onAfterLeave"
      >
        <div
          v-if="showToast"
          class="toast-content pointer-events-auto"
          ref="toastElement"
        >
          <div
            class="alert shadow-lg flex items-center backdrop-blur-sm"
            :class="{
              'alert-success bg-success/90 text-success-content':
                toastType === 'success',
              'alert-error bg-error/90 text-error-content':
                toastType === 'error',
              'alert-info bg-info/90 text-info-content': toastType === 'info',
              'alert-warning bg-warning/90 text-warning-content':
                toastType === 'warning',
            }"
          >
            <div class="flex items-center gap-2 w-full">
              <template v-if="toastType === 'success'">
                <CheckCircle class="w-6 h-6 flex-shrink-0" />
              </template>
              <template v-else-if="toastType === 'error'">
                <AlertOctagon class="w-6 h-6 flex-shrink-0" />
              </template>
              <template v-else-if="toastType === 'info'">
                <InfoIcon class="w-6 h-6 flex-shrink-0" />
              </template>
              <template v-else-if="toastType === 'warning'">
                <AlertTriangle class="w-6 h-6 flex-shrink-0" />
              </template>

              <span class="font-medium">{{ message }}</span>

              <button
                @click="hideToast"
                class="ml-auto p-1 rounded-full hover:bg-black/10 transition-colors"
                aria-label="Fermer"
              >
                <X class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  CheckCircle,
  AlertOctagon,
  InfoIcon,
  AlertTriangle,
  X,
} from "lucide-vue-next";
import { ref } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  toastType: {
    type: String,
    default: "info",
  },
  showToast: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["hide"]);
const toastElement = ref(null);

const hideToast = () => {
  emit("hide");
};

const onBeforeEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.opacity = "0";
  element.style.transform = "translateX(30px) translateY(10px) scale(0.95)";
};

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.offsetHeight;
  element.style.transition = "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
  element.style.opacity = "1";
  element.style.transform = "translateX(0) translateY(0) scale(1)";
  setTimeout(done, 400);
};

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.transition = "";
};

const onBeforeLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
};

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.style.opacity = "0";
  element.style.transform = "translateX(50px) translateY(0) scale(0.9)";
  setTimeout(done, 500);
};

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.transition = "";
  element.style.transform = "";
  element.style.opacity = "";
};
</script>

<style scoped>
.toast-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  max-width: 24rem;
  z-index: 100;
}

.toast-content {
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.toast-enter-active {
  animation: toast-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
  animation: toast-out 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes toast-in {
  0% {
    opacity: 0;
    transform: translateX(30px) translateY(10px) scale(0.95);
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(0) scale(1);
  }
}

@keyframes toast-out {
  0% {
    opacity: 1;
    transform: translateX(0) translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(50px) translateY(0) scale(0.9);
  }
}
</style>
