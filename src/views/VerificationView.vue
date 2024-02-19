<template>
    <Verification />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import Verification from '../components/VerificationCodeInput.vue';
  
  export default defineComponent({
    name: 'VerificationView',
  
    components: {
      Verification,
    },
  });
  </script>
  