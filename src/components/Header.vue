<template>

  <nav class="level">

    <div class="level-left">
      <div class="level-item">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </div>
    </div>

    <div class="level-item">
      <div class="dropdown is-hoverable" v-if="profiles.length > 0">
        <div class="dropdown-trigger">
          <button class="button" v-if="selected < 0">select a profile to see account balances</button>
          <app-profile-card v-else :name="profiles[selected].name" :type="profiles[selected].type"></app-profile-card>
        </div>
        <div class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <app-profile-card
              v-for="(profile, index) in profiles" :key="index"
              :name="profile.name" :type="profile.type"
              @click.native="onSelectProfile(index)"/>
          </div>
        </div>
      </div>
      <div v-else>
        <p>add api key to see your profiles</p>
      </div>
    </div>

    <div class="level-right">
      <div class="level-item">
        <div class="dropdown is-right" :class="{ 'is-active': showApiDropdown }">
          <div class="dropdown-trigger">
            <button class="button" @click="showApiDropdown = !showApiDropdown">
              <span>api key</span>
            </button>
          </div>
          <div class="dropdown-menu">
            <div class="dropdown-content">
              <b-input class="api-key-input" placeholder="API Key" v-model="inputApiKey"></b-input>
              <div class="level-left">
                <button class="button" @click="onSetApiKey">set</button>
                <button class="button" @click="onClearApiKey">clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </nav>

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
      // TODO close api dropdown when clicking away
      showApiDropdown: false,
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
      this.showApiDropdown = false;
    },
    onClearApiKey() {
      this.inputApiKey = '';
      this.removeApiKey();
      this.showApiDropdown = false;
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
