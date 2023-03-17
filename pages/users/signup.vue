<template>
  <div class="flex justify-center">
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
    <div v-if="errors.length > 0">
      <ul class="text-red-500">
<!--        <li v-for="error in errors" :key="error">-->
<!--          {{ error }}-->
<!--        </li>-->
        {{ errors }}
      </ul>
    </div>
    <div v-if="success">
      <p class="text-green-500">User created successfully!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { is400ErrorResponse, HttpResponse } from "../../repository/repository";
import { User, useUserRepository } from "../../repository/user_repository";
const { create: createUser } = useUserRepository();
const success = ref<boolean>(false);
const user = reactive<Omit<User, 'id'>>({
  name: "",
  age: null,
  phoneNumber: "",
});
const errors = ref<string[]>([]);
const submitUser = async () => {
  try {
    const userResponse = await createUser(user as User);
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
