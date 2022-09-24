<!-- <template>
  <v-app id="inspire">
    <SideBar />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="(data, index) in chatMessage">
                  <v-list-item :key="index">
                    <v-list-item-avatar
                      color="grey darken-1"
                    ></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-subtitle class="text-left">{{
                        data.message
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <v-textarea
          v-model="textKeep"
          class="mx-2"
          label="text entry"
          rows="3"
          prepend-icon="mdi-comment"
          auto-grow
        ></v-textarea>
        <v-btn
          @click="submitText"
          class="mr-4"
          type="submit"
          :disabled="invalid"
          >submit</v-btn
        >
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // v9ではモジュール毎に使用する。よって、処理速度が大幅に向上した。
import { firebaseConfig } from "@/firebase/firebaseConfig";

const db = getFirestore(app);
const app = initializeApp(firebaseConfig);

import SideBar from "@/components/layout/SideBar.vue";

export default {
  name: "HomeView",
  data() {
    return {
      textKeep: "",
      chatMessage: [],
      cards: ["Today"],
      friendId: "",
    };
  },
  created() {
    this.friendId = this.$route.query.friend_id;
    // 以下firebaseの処理
    const thatMessage = this.chatMessage;
    getData();
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "chats"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        thatMessage.push(doc.data()); // ここでthis.chatMessageはスコープ外になるので使用不可
      });
    }
  },
  computed: {
    invalid() {
      if (!this.textKeep) {
        return true;
      }
      return false;
    },
  },
  methods: {
    submitText() {
      this.chatMessage.push({ message: this.textKeep });
      this.textKeep = "";
    },
  },
  components: { SideBar },
};
</script> -->
