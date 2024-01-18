<template>
  <Login />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Login from '../components/login_comp.vue';

export default defineComponent({
  name: 'LoginView',

  components: {
    Login,
  },
});
</script>
