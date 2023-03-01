<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>


<script setup lang="ts">
import { useUserRepository } from "../../repository/user_repository";
const { index } = useUserRepository();

const users = await index();
</script>