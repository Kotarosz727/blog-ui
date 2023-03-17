<template>
  <div class="flex justify-center">
    <FlashMessage :messages="errors" type="error" />
    <FlashMessage v-if="success" :messages="['User logged in successfully!']" type="success" />
    <form class="w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-md bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 class="text-lg font-semibold mb-4">User Login</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          Name
        </label>
        <input
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline-blue"
            id="name"
            type="text"
            v-model="userCredentials.username"
            placeholder="Enter name"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="password">
          Password
        </label>
        <input
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline-blue"
            id="password"
            type="password"
            v-model="userCredentials.password"
            placeholder="Enter Password"
        />
      </div>
      <button
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          type="submit"
          @click.prevent="login"
      >
        Login
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import FlashMessage from "../../components/FlashMessage.vue";
import {ref} from "vue";
import {UserCredentials, useAuthRepository} from "../../repository/auth_repository";
import {HttpResponse, is400ErrorResponse} from "../../repository/repository";

const { login: loginUser } = useAuthRepository();
const userCredentials = ref<UserCredentials>({
  username: '',
  password: ''
})

const errors = ref<string[]>([]);
const success = ref<boolean>(false);

const login = () => {
  if (userCredentials.value.username === '' || userCredentials.value.password === '') {
    errors.value.push('Please enter both name and password');
  }

  try {
    const loginResponse = loginUser(userCredentials.value);
    const res = loginResponse as HttpResponse;

    if (is400ErrorResponse(res)) {
      errors.value = res.message;
      console.error('error', res.message);
      return;
    }

    success.value = true;
  } catch (e) {
    errors.value.push(e.message);
  }
}
</script>