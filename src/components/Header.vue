<template>
  <div class="d-flex row justify-space-between align-center">
    
    <!-- <div class="level-left">
      <div class="level-item">
        <img src="@/assets/tw_fast_flag_blue_rgb.svg" width="112" height="28">
      </div>
    </div> -->

    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="white" v-on="on" class="text-capitalize">
            <span v-if="selected < 0">select a profile</span>
            <div v-else>
              <span>{{ profiles[selected].name }} </span>
              <span>{{ profiles[selected].type }}</span>
            </div>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(profile, index) in profiles" :key="index">
              <app-profile-card
                elevation="14"
                :name="profile.name" :type="profile.type"
                @click.native="onSelectProfile(index)"/>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div>
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn text color="white" class="text-capitalize" v-on="on">
            API key
          </v-btn>
        </template>
        <v-card>
                <v-text-field class="api-key-input" placeholder="API Key" v-model="inputApiKey"></v-text-field>
                <div class="level-left">
                  <v-btn text @click="onSetApiKey">set</v-btn>
                  <v-btn text @click="onClearApiKey">clear</v-btn>
                </div>
        </v-card>
      </v-menu>
    </div>




  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileCard from './ProfileCard.vue';

export default {
  name: 'Header',

  components: {
    appProfileCard: ProfileCard
  },

  computed: {
    ...mapGetters({
      profiles: 'profiles',
      apiKey: 'apiKey'
    })
  },

  data() {
    return {
      selected: -1,
      inputApiKey: ''
    }
  },

  methods: {
    ...mapActions({
      init: 'init',
      selectProfile: 'selectProfile',
      setApiKey: 'setApiKey',
      removeApiKey: 'removeApiKey'
    }),
    onSelectProfile(index) {
      this.selected = index;
      this.selectProfile(this.profiles[this.selected].id);
    },
    onSetApiKey() {
      this.setApiKey(this.inputApiKey);
    },
    onClearApiKey() {
      this.inputApiKey = '';
      this.removeApiKey();
    }
  },

  mounted() {
    this.init().then(() => {
      this.inputApiKey = this.apiKey;
    })
  }

}
</script>

<style scoped>

.api-key-input {
  width: 350px;
}

</style>
