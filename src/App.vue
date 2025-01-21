<script lang="ts">
import { defineComponent } from 'vue';
import { Authenticator } from '@aws-amplify/ui-vue';
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
        <OnCallApplication :signOut="signOut" :user="user" />
      </template>
    </Authenticator>
  </main>
</template>


<style>
@import '@aws-amplify/ui-vue/styles.css';
</style>