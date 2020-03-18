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
          <app-profile-card :name="profiles[selected].name" :type="profiles[selected].type"></app-profile-card>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
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
        asdf
      </div>
    </div>

  </nav>

</template>

<script>
import ProfileCard from './ProfileCard.vue';

export default {
  name: 'Header',

  components: {
    appProfileCard: ProfileCard
  },

  computed: {
    profiles() {
      const profiles = this.$store.getters.profiles;
      console.log(profiles);
      return profiles;
    }
  },

  data() {
    return {
      selected: 0
    }
  },

  methods: {
    onSelectProfile(index) {
      this.selected = index;
      this.$store.dispatch('selectProfile', this.profiles[this.selected].id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    width: 100%;
    height: 50px;
    background: rgb(37, 54, 85)
}
.header h1 {
    color: rgb(0, 185, 255);
    font-size: 22px;
    text-align: left;
    padding: 9px;
}
</style>
