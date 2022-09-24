<template>
  <v-app id="inspire">
    <SideBar />
    <v-app-bar color="orange lighten-5" app shrink-on-scroll>
      <v-toolbar-title>Friend List</v-toolbar-title>
    </v-app-bar>

    <v-main class="mt-4">
      <v-container>
        <v-row>
          <v-col v-for="n in 24" :key="n" cols="4">
            <router-link :to="{ path: '/chat', query: { friend_id: n } }">
              <v-avatar color="grey lighten-2" size="116"></v-avatar>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
export default {
  components: { SideBar },
};
</script>
