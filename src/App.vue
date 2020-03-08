<template>
  <div id="app">
    <SpendingReport/>
  </div>
</template>

<script>
import SpendingReport from './components/SpendingReport.vue'

export default {
  name: 'App',
  components: {
    SpendingReport
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
