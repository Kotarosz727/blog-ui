<!-- components/GlobalHeader.vue -->
<template>
  <header class="bg-blue-500 text-white shadow-md py-4">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <div>
        <a href="/" class="text-lg font-bold">My App</a>
      </div>
      <div>
        <Menu as="div">
          <MenuButton class="focus:outline-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="24"
                height="24"
            >
              <path
                  fill-rule="evenodd"
                  d="M2 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm1 5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H3z"
                  clip-rule="evenodd"
              />
            </svg>
          </MenuButton>
          <MenuItems class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg text-black z-50 flex flex-col">
            <MenuItem class="p-2 hover:bg-blue-500 hover:text-white" as="a" href="/users/login">
              Login
            </MenuItem>
            <MenuItem class="p-2 hover:bg-blue-500 hover:text-white" as="a" href="/users/signup">
              Signup
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
</script>

<style scoped>
.container {
  max-width: 1280px;
}
</style>
