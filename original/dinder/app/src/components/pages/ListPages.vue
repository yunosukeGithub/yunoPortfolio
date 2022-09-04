<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-btn @click="storageClear">マッチングしたワンコを一括ブロックする</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row dense>
        <v-col v-for="dogData in dogs" :key="dogData.index" cols="6" sm="3">
          <v-card>
            <v-img
              :src="dogData.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
            </v-img>

            <v-card-actions>
              <v-card-title>{{dogData.name}} ({{dogData.age}})</v-card-title>
              <v-spacer></v-spacer>

              <v-btn @click="dogClear(index)" icon>
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ListPages',
  data() {
    return {
    }
  },
  props: {
    dogs: Array
  },
  methods: {
    storageClear() {
      this.$nextTick( ()=> {
      localStorage.clear()
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    });
    },
    dogClear(index) {
      const jsonData = this.dogs[index]
      console.log(jsonData)
      // let perseData = JSON.parse(jsonData)
      // console.log(perseData)
    }
  }
}
</script>

<style>

</style>