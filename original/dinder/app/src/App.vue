<template>
  <v-app>
    <HeaderModules />
      <v-main>
        <v-container>
          <router-view :dogs="dogs" @add-dog-list="addDogList" />
        </v-container>
      </v-main>
    <FooterModules />
  </v-app>
</template>

<script>
import HeaderModules from './components/modules/HeaderModules.vue';
import FooterModules from './components/modules/FooterModules.vue';
const STORAGE_KEY = 'dogs'

export default {
    name: "App",
    data(){
      return {
        dogs: [],
        newDog: null
      }
  },
    mounted() {
      if (localStorage.getItem(STORAGE_KEY)) {
        try {
          this.dogs = JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch(e) {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    },
    methods: {
      // 子要素からデータを取得
      addDogList(e) {
        this.dogs.push({
          id: this.dogs.length,
          image: e.image,
          name: e.name,
          age: e.age
        });
        this.saveDogs();
      },
      removeDog(x) {
        this.dogs.splice(x, 1);
        this.saveDogs();
      },
      saveDogs() {
        const parsed = JSON.stringify(this.dogs);
        localStorage.setItem(STORAGE_KEY, parsed);
      }
    },
    components: {
      HeaderModules,
      FooterModules
    }
  };
</script>
