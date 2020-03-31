<template>
  <v-card>
    <v-card-text>
      <div class="pa-2">

        <div class="d-flex justify-center mb-3 mt-3">
          <h3>Set Api Key</h3>
        </div>

        <v-text-field
          class="api-key-input"
          placeholder="API Key"
          :append-icon="showApiKey ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showApiKey ? 'text' : 'password'"
          @click:append="showApiKey = !showApiKey"
          v-model="inputApiKey"
          :loading="isApiKeyLoading"/>

        <div class="d-flex justify-space-between">
          <div>
            <v-btn text @click="onSetApiKey">set</v-btn>
            <v-btn text @click="onClearApiKey">clear</v-btn>
          </div>
          <div>
            <v-btn text @click="onCancel">cancel</v-btn>
          </div>
        </div>

      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters({
      apiKey: 'apiKey',
      isApiKeyLoading: 'loading/isProfileCardsLoading',
    })
  },

  data() {
    return {
      inputApiKey: '',
      showApiKey: false
    }
  },

  methods: {
    ...mapActions({
      setApiKey: 'setApiKey',
      removeApiKey: 'removeApiKey',
      setApiKeyModalOpen: 'navigation/setApiKeyModalOpen',
    }),
    onSetApiKey() {
      this.setApiKey(this.inputApiKey);
    },
    onClearApiKey() {
      this.inputApiKey = '';
      this.removeApiKey();
    },
    onCancel() {
      this.setApiKeyModalOpen(false);
    }
  },

  mounted() {
    this.inputApiKey = this.apiKey;
  }

}
</script>


<style>

</style>