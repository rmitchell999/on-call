<script lang="ts">
import { defineComponent } from 'vue';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import OnCallApplication from './components/OnCallApplication.vue';

export default defineComponent({
  components: {
    Authenticator,
    OnCallApplication
  }
});
</script>

<template>
  <main>
    <Authenticator>
      <template #default="{ signOut, user }">
        <OnCallApplication />
      </template>
    </Authenticator>
  </main>
</template>

<style>
@import '@aws-amplify/ui-vue/styles.css';
</style>