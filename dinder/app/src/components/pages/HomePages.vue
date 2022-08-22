<template>
  <div>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../../assets/logo.svg')"
            class="my-3"
            contain
            height="200"
          />
        </v-col>

        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">Welcome to DINDER !!!</h1>

          <p class="subheading font-weight-regular">
            It starts here. Dogs, Dogs, Dogs, and everything in between.
          </p>
        </v-col>

        <v-col cols="12">
           <strong class="text-h6"> Let's get started now! </strong> 
        </v-col>
        <v-col cols="12">
          <router-link to="/search"><v-btn color="pink lighten-1" min-width="100" class="mx-2"> START </v-btn></router-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
