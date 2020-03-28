<template>
  <div class="d-flex row justify-space-between align-center">

    <div>
      <v-btn dark icon @click="setNavDrawerOpen(!isNavDrawerOpen)">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </div>

    <div>
      <img src="@/assets/tw_fast_flag_blue_rgb.svg" width="112" height="40">
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters({
      isNavDrawerOpen: 'isNavDrawerOpen'
    })
  },

  methods: {
    ...mapActions({
      setNavDrawerOpen: 'setNavDrawerOpen',
    })
  }

}
</script>

<style scoped>

</style>
