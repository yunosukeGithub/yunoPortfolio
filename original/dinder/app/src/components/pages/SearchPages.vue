<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-btn @click="getDogImage()">最近ログインした順で表示する</v-btn>
          <v-spacer></v-spacer>
        </v-col>
        <v-col cols="3">
          <v-card>
            <div>
              <v-toolbar>
                <input type="text" v-model="keyword" placeholder="名前で検索する">

                <v-spacer></v-spacer>

                <v-btn
                  icon
                  class="hidden-xs-only"
                >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-toolbar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-img width="200px" :src="dogImage"></v-img> -->
    <v-container>
      <v-row dense>
        <v-col v-for="(dogProfs, index) in filterUsers" :key="dogProfs.index" cols="6" sm="3">
          <v-card>
            <v-img
              :src="dogProfs.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
            </v-img>

            <v-card-actions>
              <v-card-title>{{dogProfs.name}} ({{dogProfs.age}})</v-card-title>
              <v-spacer></v-spacer>

              <v-btn @click="addDogList(index), colorChange()" icon>
                <v-icon v-bind="{ favoriteColor:favoriteColor }">mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <div class="text-center">
        <v-pagination
          color="pink darken-1"
          v-model="page"
          :length="100"
          circle
          @input="getNumber"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
const dogUrl = "https://dog.ceo/api/breeds/image/random";
const Options = {
  method: "get",
};

export default {
  name: "app",
  data() {
    return {
      ageTwo: '2',
      ageThree: '3',
      ageFour: '4',
      checkFunc: false,
      keyword: '',
      page: 1,
      pageViewControl: 10,
      pageViewDisplay: [],
      favoriteColor: false,
      dogImage: "",
      dogImageResults: [],
      // dogProfsResults: [],
      dogNames: [
        {
          id: 1,
          name: 'もも',
          age: '24'
        },
        {
          id: 2,
          name: 'いちご',
          age: '22'
        },
        {
          id: 3,
          name: 'めろん',
          age: '27'
        },
        {
          id: 4,
          name: 'はるか',
          age: '29'
        },
        {
          id: 5,
          name: 'たえこ',
          age: '72'
        },
        {
          id: 5,
          name: 'ゆうこ',
          age: '21'
        },
        {
          id: 6,
          name: 'あんり',
          age: '26'
        },
        {
          id: 7,
          name: 'ゆうな',
          age: '20'
        },
        {
          id: 8,
          name: 'ゆっち',
          age: '19'
        },
        {
          id: 9,
          name: 'よしお',
          age: '22'
        },
        {
          id: 10,
          name: 'ゆい',
          age: '28'
        },
        {
          id: 11,
          name: 'たいち',
          age: '34'
        },
        {
          id: 12,
          name: 'やすえ',
          age: '93'
        }
        ]
    };
  },
  methods: {
    getNumber(number) {
      console.log(number)
    },
    // いいねボタンをクリックしたら、色を変更する
    colorChange() {
      this.favoriteColor = !this.favoriteColor
    },

    // localStorageにデータを保存する。
    addDogList(index) {
      // $emit('データを飛ばす親のメソッド名', 飛ばしたいデータ)
      this.$emit('add-dog-list', this.dogImageResults[index]) 
    },
    async getDogImage() {
      this.dogImageResults = []; // マッチング相手を初期化する

      // fetchを20回実行する
      for (let i=0; i<20; i++) {
        // fetchでJSON取得
        const response = await fetch(dogUrl, Options)
        .then((response) => response.json());
              // console.log(response)
              // this.dogImage = response.message;

        // 取得したデータを配列にpushする
        let dogJsonImg = response.message
              // console.log(dogJsonImg)
              // let consoleSearch = 
        let ranDogs =  this.dogNames
        let runDogResults = ranDogs[Math.floor(Math.random() * ranDogs.length)];
        // const runConsole = this.dogImageResults.push =({
        // }) 
        // console.log(runConsole)
        this.dogImageResults.push({
            // 条件 (三項) 演算子 (真値:偽値)
            // →Udemyで使われていたので書いてみたけど、別に使わなくても出来るから使用する必要性があるのかが不明
            image: dogJsonImg, //? dogJsonImg :''
            id: runDogResults.id,
            name: runDogResults.name,
            age: runDogResults.age
        })
      }


              // console.log(consoleSearch)
    },
  },
  created() {
    this.getDogImage();
  },
  mounted() {
    this.pageViewDisplay = this.dogImageResults.slice(0, this.pageViewControl);
    console.log(this.dogImageResults)
    console.log(this.pageViewDisplay)
  },
  computed: {
    filterUsers() {

    let dogImageResults = [];

    for(let i in this.dogImageResults) {
        let user = this.dogImageResults[i];
        if(user.name.indexOf(this.keyword) !== -1) {
            dogImageResults.push(user);
        }
    }
    return dogImageResults;
    }
  },
  components: {},
};
</script>

<style>
  .favorite-color {
    background-color: pink lighten-3;
  }
</style>
