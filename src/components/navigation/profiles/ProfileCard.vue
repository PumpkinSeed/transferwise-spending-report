<template>
    <v-hover>
      <template v-slot="{ hover }">

        <v-card
          class="ma-2 profile-card"
          :color="isBusiness ? 'secondary accent--text' : 'accent secondary--text'"
          :elevation="hover ? 16 : baseElevation"
        >
          <v-card-title>{{ name }}</v-card-title>
          <v-card-subtitle :class="isBusiness ? 'accent--text' : 'secondary--text'">{{ type }}</v-card-subtitle>
        </v-card>

      </template>
    </v-hover>
</template>

<script>
export default {

  props: {
    type: String,
    name: String,
    isBusiness: Boolean,
    isSelected: Boolean,
  },

  computed: {
    baseElevation() {
      return this.isSelected ? 16 : 0;
    }
  }

}
</script>

<style scoped>

.profile-card{
  width: 220px;
  cursor: pointer;
}

</style>
