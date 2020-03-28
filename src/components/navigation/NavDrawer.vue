<template>
    <v-navigation-drawer :value="isOpen" absolute>

      <div class="d-flex justify-center mt-3 mb-3">
        <v-btn raised color="primary" @click="dialogOpen = !dialogOpen">api key</v-btn>
      </div>

      <v-dialog persistent v-model="dialogOpen" width="400">
        <api-key-setter
          v-on:api-key-set="closeApiSetterDialog"
          v-on:api-key-cancel="closeApiSetterDialog"/>
      </v-dialog>

      <v-divider></v-divider>

      <div>
        <app-profiles></app-profiles>
      </div>

      <div v-if="profiles.length !== 0">
        <app-balances></app-balances>
      </div>

    </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ApiKeySetter from './ApiKeySetter.vue';
import Profiles from './profiles/Profiles.vue'
import Balances from './balances/Balances.vue';

export default {
  
  components: {
    ApiKeySetter,
    appBalances: Balances,
    appProfiles: Profiles
  },

  computed: {
    ...mapGetters({
      isOpen: 'isNavDrawerOpen',
      profiles: 'profiles'
    })
  },

  data() {
    return {
      dialogOpen: false
    }
  },

  methods: {
    ...mapActions({
      setNavDrawerOpen: 'setNavDrawerOpen'
    }),
    closeApiSetterDialog() {
      this.dialogOpen = false;
    }
  }

}
</script>

<style>

</style>