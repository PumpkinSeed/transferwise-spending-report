<template>
  <v-app>
    <v-app-bar app color="primary" flat>
      <app-header></app-header>
    </v-app-bar>
    <v-content>
      <app-main></app-main>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Main from './components/Main.vue';

export default {
  name: 'App',

  components: {
    appHeader: Header,
    appMain: Main
  }
}
</script>

