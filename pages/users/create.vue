<template>
  <div class="flex justify-center">
    <form class="w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-md bg-white">
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
import { reactive } from "vue";
import { User, useUserRepository } from "../../repository/user_repository";
const { create: createUser } = useUserRepository();

const user = reactive<Omit<User, 'id'>>({
  name: "",
  age: 10,
  phoneNumber: "",
});
const submitUser = async () => {
  try {
    const res = await createUser(user as User);
  } catch (e) {
    console.error(e);
  }
};
</script>
