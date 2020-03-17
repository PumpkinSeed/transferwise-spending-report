<template>
  <div id="app">
    <Header/>
    <SpendingReport/>
  </div>
</template>

<script>
import SpendingReport from './components/SpendingReport.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    SpendingReport,
    Header
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
