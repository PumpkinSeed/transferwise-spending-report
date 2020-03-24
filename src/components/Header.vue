<template>
  <div class="d-flex row justify-space-between align-center">

    <div>
      <v-btn dark icon @click="setNavDrawerOpen(!isNavDrawerOpen)">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </div>

    <div class="level-left">
      <div class="level-item">
        <img src="@/assets/tw_fast_flag_blue_rgb.svg" width="112" height="28">
      </div>
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

export default {
  name: 'Header',

  computed: {
    ...mapGetters({
      isNavDrawerOpen: 'isNavDrawerOpen',
      apiKey: 'apiKey'
    })
  },

  data() {
    return {
      inputApiKey: ''
    }
  },

  methods: {
    ...mapActions({
      setNavDrawerOpen: 'setNavDrawerOpen',
      init: 'init',
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
