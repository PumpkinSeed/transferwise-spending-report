<template>
    <v-navigation-drawer :value="isOpen" absolute>
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


export default {
  
  components: {
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
    }
  },
}
</script>

<style>

</style>