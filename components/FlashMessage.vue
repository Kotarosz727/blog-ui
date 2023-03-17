<template>
  <transition
      name="fade"
      enter-class="opacity-0"
      enter-active-class="transition-opacity duration-500"
      leave-class="opacity-100"
      leave-active-class="transition-opacity duration-500"
  >
    <div
        v-if="messages.length > 0"
        :class="[
        'px-4',
        'py-3',
        'rounded',
        'relative',
        'mt-6',
        'shadow-md',
        type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700',
      ]"
        role="alert"
    >
      <ul>
        <li v-for="message in messages" :key="message" class="list-disc ml-6">
          {{ message }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: 'error',
  },
});
</script>
