<template>
  <Calculator class="calc"/>
</template>

<script>

import Calculator from './components/Calculator.vue';

export default {
  name: 'App',
  components: {
    Calculator,
  },
}
</script>

<style>
* {
  margin: 0;
}
#app {
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #ced4da;
  font-family: 'Poppins', sans-serif;
}
</style>
