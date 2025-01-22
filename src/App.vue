<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Amplify, Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-vue';
import OnCallApplicationAdmin from './components/OnCallApplicationAdmin.vue';
import OnCallApplicationReadonly from './components/OnCallApplicationReadonly.vue';
import outputs from "../amplify_outputs.json"; // Ensure this path is correct based on your project structure

// Configure Amplify with the outputs from your AWS Amplify project
Amplify.configure(outputs);

export default defineComponent({
  components: {
    Authenticator,
    OnCallApplicationAdmin,
    OnCallApplicationReadonly
  },
  setup() {
    const isReadOnly = ref(false);

    // Check user groups using Amplify Auth
    const checkUserGroup = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.idToken.payload['cognito:groups'] || [];
        isReadOnly.value = groups.includes('TerneuzenReadOnly');
      } catch (error) {
        console.error('Error fetching user groups:', error);
      }
    };

    onMounted(async () => {
      await checkUserGroup();
    });

    return { isReadOnly };
  }
});
</script>

<template>
  <main>
    <Authenticator>
      <template #default="{ signOut, user }">
        <component :is="isReadOnly ? 'OnCallApplicationReadonly' : 'OnCallApplicationAdmin'" :signOut="signOut" />
      </template>
    </Authenticator>
  </main>
</template>

<style>
@import '@aws-amplify/ui-vue/styles.css';
</style>