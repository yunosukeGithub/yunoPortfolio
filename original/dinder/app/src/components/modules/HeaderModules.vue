<template>
  <div>
    <v-app-bar app color="pink lighten-1" dark>
      <div class="d-flex align-center">
        <router-link to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        /></router-link>
        <router-link to="/"
          ><v-btn text tile class="router__btn hidden-xs-only"
            >Dinder</v-btn
          ></router-link
        >
      </div>

      <v-spacer></v-spacer>

      <router-link to="/search"><v-btn text min-width="100" class="mx-2 pink lighten-2"> search </v-btn></router-link>
      <router-link to="/list"><v-btn text min-width="100" class="pink lighten-2"> Matched </v-btn> </router-link>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
.router__btn {
  text-decoration: none;
}
</style>
