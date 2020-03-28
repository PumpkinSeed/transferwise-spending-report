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

      <v-list>
        <v-list-item v-for="(profile, index) in profiles" :key="index">
            <app-profile-card
              :name="profile.name" :type="profile.type" :isBusiness="profile.isBusiness" :isSelected="selectedProfile == index"
              @click.native="onSelectProfile(index)"/>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- <v-list dense>
        <v-list-item>dickbutt</v-list-item>
      </v-list> -->

      <app-balances></app-balances>

    </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ProfileCard from './ProfileCard.vue';
import Balances from './balances/Balances.vue';
import ApiKeySetter from './ApiKeySetter.vue';


export default {
  
  components: {
    ApiKeySetter,
    appProfileCard: ProfileCard,
    appBalances: Balances
  },

  computed: {
    ...mapGetters({
      isOpen: 'isNavDrawerOpen',
      profiles: 'profiles'
    })
  },

  data() {
    return {
      dialogOpen: false,
      selectedProfile: -1,
    }
  },

  methods: {
    ...mapActions({
      setNavDrawerOpen: 'setNavDrawerOpen',
      init: 'init',
      selectProfile: 'selectProfile',
      setApiKey: 'setApiKey',
      removeApiKey: 'removeApiKey'
    }),

    onSelectProfile(index) {
      this.selectedProfile = index;
      this.selectProfile(this.profiles[this.selectedProfile].id);
    },
    closeApiSetterDialog() {
      this.dialogOpen = false;
    }
  },
}
</script>

<style>

</style>