<template>
  <div :class="{ 'profile-card-odd' : isBusiness}" class="profile-card">
    <div class="profile-name">{{ name }}</div>
    <div class="profile-type">{{ type }}</div>
    
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    type: String,
    name: String,
    isBusiness: Boolean,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile-card{
  width: 300px;
  margin: 10px;
  border-radius: 5px;
  color: rgb(37, 54, 85);
  background: rgb(255, 182, 25);
  padding: 10px;
  cursor: pointer;
}
.profile-card-odd {
  color: rgb(255, 182, 25);
  background: rgb(37, 54, 85);
}
.profile-name{
  text-align: left;
  font-size: 22px;
}
.profile-type{
  text-align: left;
  font-size: 15px;
}
</style>
