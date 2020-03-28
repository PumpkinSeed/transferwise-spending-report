<template>
  <v-card>
    <v-card-text>
      <div class="pa-2">
        <v-text-field
          class="api-key-input"
          placeholder="API Key"
          :append-icon="showApiKey ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showApiKey ? 'text' : 'password'"
          @click:append="showApiKey = !showApiKey"
          v-model="inputApiKey"></v-text-field>
        <div class="d-flex justify-space-between">
          <div>
            <v-btn text @click="onSetApiKey">set</v-btn>
            <v-btn text @click="onClearApiKey">clear</v-btn>
          </div>
          <div>
            <v-btn text @click="onCancel">cancel</v-btn>
          </DIV>
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
      apiKey: 'apiKey'
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
      removeApiKey: 'removeApiKey'
    }),
    onSetApiKey() {
      this.setApiKey(this.inputApiKey);
      this.$emit('api-key-set');
    },
    onClearApiKey() {
      this.inputApiKey = '';
      this.removeApiKey();
    },
    onCancel() {
      this.$emit('api-key-cancel');
    }
  },

  mounted() {
    this.inputApiKey = this.apiKey;
  }

}
</script>


<style>

</style>