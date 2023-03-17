<template>
  <div class="flex justify-center">
    <FlashMessage :messages="errors" type="error" />
    <FlashMessage v-if="success" :messages="['User logged in successfully!']" type="success" />
    <form class="w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-md bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 class="text-lg font-semibold mb-4">Create User</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          Name
        </label>
        <input
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline-blue"
            id="name"
            type="text"
            v-model="user.name"
            placeholder="Enter name"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="age">
          Age
        </label>
        <input
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline-blue"
            id="age"
            type="number"
            v-model="user.age"
            placeholder="Enter age"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="phoneNumber">
          Phone Number
        </label>
        <input
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline-blue"
            id="phoneNumber"
            type="tel"
            v-model="user.phoneNumber"
            placeholder="Enter phone number"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="password">
          password
        </label>
        <input
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline-blue"
            id="password"
            type="password"
            v-model="user.password"
            placeholder="Enter Password"
        />
      </div>
      <button
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          type="submit"
          @click.prevent="submitUser"
      >
        Create User
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import FlashMessage from "../components/FlashMessage.vue";
import { ref, reactive } from "vue";
import { is400ErrorResponse, HttpResponse } from "../../repository/repository";
import { User } from "../../repository/user_repository";
import { useAuthRepository } from "../../repository/auth_repository";
const { signup } = useAuthRepository();
const success = ref<boolean>(false);
const user = reactive<Omit<User, 'id'>>({
  name: "",
  age: null,
  phoneNumber: "",
});
const errors = ref<string[]>([]);
const submitUser = async () => {
  try {
    const userResponse = await signup(user as User);
    const res = userResponse as HttpResponse;

    if (is400ErrorResponse(res)) {
      errors.value = res.message;
      console.error('error', res.message);
      return;
    }

    success.value = true;
  } catch (e) {
    console.error('error', e);
  }
};
</script>
