<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Auth } from 'aws-amplify';
import { Hub } from 'aws-amplify'
import Login from './components/Login.vue';
import OnCallApplication from './components/OnCallApplication.vue';

const isAuthenticated = ref(false);

const checkAuthStatus = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    isAuthenticated.value = true;
  } catch (error) {
    isAuthenticated.value = false;
  }
};

onMounted(async () => {
  await checkAuthStatus();

  // Listen for auth events to update the UI
  Auth.Hub.listen('auth', async (data: any) => {
    switch (data.payload.event) {
      case 'signIn':
        isAuthenticated.value = true;
        break;
      case 'signOut':
        isAuthenticated.value = false;
        break;
    }
  });
});
</script>

<template>
  <main>
    <Login v-if="!isAuthenticated" />
    <OnCallApplication v-else />
  </main>
</template>