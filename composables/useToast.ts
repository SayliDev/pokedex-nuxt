import { ref } from "vue";
import type { Component } from "vue";

interface ToastOptions {
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  icon?: Component;
}

interface Toast extends ToastOptions {
  id: number;
}

// état global pour les toasts
const toasts = ref<Toast[]>([]);
let toastIdCounter = 0;

export const useToast = () => {
  const show = (options: ToastOptions) => {
    const id = toastIdCounter++;
    const toast: Toast = {
      id,
      ...options,
      duration: options.duration || 3000,
    };

    toasts.value.push(toast);

    // Nettoiyage
    setTimeout(() => {
      dismiss(id);
    }, toast.duration);

    return id;
  };

  const dismiss = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };

  const dismissAll = () => {
    toasts.value = [];
  };

  return {
    toasts,
    show,
    dismiss,
    dismissAll,
  };
};
