<template>
  <Register />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Register from '../components/register_comp.vue';

export default defineComponent({
  name: 'RegisterView',

  components: {
    Register,
  },
});
</script>
