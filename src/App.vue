<template>
  <div id="app">
    <app-header/>
    <app-main></app-main>
  </div>
</template>

<script>
// import SpendingReport from './components/SpendingReport.vue';
import Header from './components/Header.vue';
import Main from './components/Main.vue';

export default {
  name: 'App',
  components: {
    // SpendingReport,
    appHeader: Header,
    appMain: Main
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
