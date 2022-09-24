<template>
  <v-container>
    <SideBar />
    <v-row class="text-center">
      <v-col class="mb-4 tomodachat-mr">
        <h1 class="display-2 font-weight-bold mb-3">
          ようこそ！Tomodachatへ！
        </h1>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          早速友達とチャットしてみよう！
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SideBar from "@/components/layout/SideBar.vue";
export default {
  components: {
    SideBar,
  },
};
</script>

<style>
.tomodachat-mr {
  margin-top: 300px;
}
</style>
