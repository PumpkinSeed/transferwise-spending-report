<template>
  <div>
    <v-fade-transition mode="out-in" appear>

      <v-list v-if="profiles.length !== 0">
        <v-scroll-y-transition appear group>
          <v-list-item v-for="(profile, index) in profiles" :key="index">
              <app-profile-card
                :name="profile.name"
                :type="profile.type"
                :isBusiness="profile.isBusiness"
                :isSelected="selectedProfile == index"
                @click.native="onSelectProfile(index)"/>
          </v-list-item>
        </v-scroll-y-transition>
      </v-list>

      <div v-if="profiles.length === 0">
        <h4>Add Api Key to see profiles.</h4>
      </div>

    </v-fade-transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ProfileCard from './ProfileCard.vue';


export default {
  
  components: {
    appProfileCard: ProfileCard,
  },

  computed: {
    ...mapGetters({
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
      selectProfile: 'selectProfile',
      deselectProfile: 'deselectProfile'
    }),

    onSelectProfile(index) {
      if (index !== this.selectedProfile) {
        this.selectedProfile = index;
        this.selectProfile(this.profiles[this.selectedProfile].id);
      } else {
        this.selectedProfile = -1;
        this.deselectProfile();
      }
    }
  },
}
</script>

<style>

</style>