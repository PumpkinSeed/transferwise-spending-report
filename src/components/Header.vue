<template>
  <div class="d-flex row justify-space-between align-center">

    <div>
      <v-btn dark icon @click="setNavDrawerOpen(!isNavDrawerOpen)">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </div>

    <div class="ma-2">
      <img src="@/assets/tw_fast_flag_blue_rgb.svg" width="auto" height="40">
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters({
      isNavDrawerOpen: 'navigation/isNavDrawerOpen'
    })
  },

  methods: {
    ...mapActions({
      setNavDrawerOpen: 'navigation/setNavDrawerOpen',
    })
  }

}
</script>

<style scoped>

</style>
