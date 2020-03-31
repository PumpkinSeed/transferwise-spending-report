<template>
    <v-navigation-drawer :value="isNavDrawerOpen" absolute>

      <div class="d-flex justify-center mt-3 mb-3">
        <v-btn raised color="primary" @click="dialogOpen = !dialogOpen">api key</v-btn>
      </div>

      <v-dialog persistent v-model="dialogOpen" width="400">
        <api-key-setter/>
      </v-dialog>

      <v-divider></v-divider>

      <div class="d-flex justify-center" >
        <div class="mt-5" v-if="isProfileCardsLoading">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate/>
        </div>
        <app-profiles v-else></app-profiles>
      </div>

      <div class="d-flex justify-center" v-if="profiles.length !== 0">
        <div class="mt-5" v-if="isBalanceCardsLoading">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate/>
        </div>
        <app-balances v-else></app-balances>
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
      isNavDrawerOpen: 'navigation/isNavDrawerOpen',
      isApiKeyModalOpen: 'navigation/isApiKeyModalOpen',
      profiles: 'profiles',
      isProfileCardsLoading: 'loading/isProfileCardsLoading',
      isBalanceCardsLoading: 'loading/isBalanceCardsLoading'
    }),
    dialogOpen: {
      get: function() {
        return this.isApiKeyModalOpen;
      },
      set: function(isOpen) {
        this.setApiKeyModalOpen(!!isOpen);
      }
    }
  },

  methods: {
    ...mapActions({
      setNavDrawerOpen: 'navigation/setNavDrawerOpen',
      setApiKeyModalOpen: 'navigation/setApiKeyModalOpen'
    })
  }

}
</script>

<style>

</style>