<template>
  <v-app id="inspire">
    <SideBar />
    <v-main>
      <!-- 条件 (三項) 演算子:roomNamesがもしあれば左側、なければ右側 -->
      <h1>{{ roomNames ? roomNames.name : "" }}</h1>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="(data, index) in chatMessage">
                  <v-list-item :key="index">
                    <v-list-item-avatar color="grey darken-1"
                      ><v-img :src="data.photoURL"></v-img
                    ></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-subtitle class="text-left">{{
                        data.message
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider
                    v-if="index !== 6"
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
          label="メッセージを入力して下さい"
          rows="3"
          prepend-icon="mdi-comment"
          auto-grow
        ></v-textarea>
        <v-btn
          @click.prevent="submitText"
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
// ※ firebase:モジュール毎の読み込みなため、firebase.js(初期化ファイル)からのimportを忘れがちになるため注意！！！ ※
import { db } from "@/firebase/firebase";
//import { collection, getDocs } from "firebase/firestore"; // v9ではモジュール毎に使用する。よって、処理速度が大幅に向上した。
import {
  collection,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import SideBar from "@/components/SideBar.vue";

export default {
  name: "HomeView",
  data() {
    return {
      textKeep: "",
      chatMessage: [],
      cards: ["メッセージ履歴"],
      roomNames: null,
      roomId: "",
      auth: null,
    };
  },
  mounted() {
    this.auth = JSON.parse(sessionStorage.getItem("user"));
    // console.log(this.auth);

    // リアルタイムでメッセージを更新する処理
    const q = query(
      collection(db, "rooms", this.roomId, "messages"),
      orderBy("createdAt")
    );
    // console.log(q);
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log("New!!!", change.doc.data());
        this.chatMessage.push(change.doc.data());
      });
    });
  },
  async created() {
    this.roomId = this.$route.query.room_id;
    console.log(this.roomId);

    // 以下Firebaseの処理
    const thatRoomId = this.roomId;
    const funcRouter = this.$router;
    // const thatMessage = this.chatMessage;
    const getData = async () => {
      const docRef = doc(db, "rooms", thatRoomId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await funcRouter.push("/room");
      }
      const docRoom = docSnap.data();
      // console.log(docRoom);
      this.roomNames = docRoom;

      // // messagesコレクションを読み取る処理
      // const querySnapshot = await getDocs(
      //   query(collection(docRef, "messages"), orderBy("createdAt"))
      // );
      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      //   thatMessage.push(doc.data()); // ここでthis.chatMessageはスコープ外になるので使用不可
      // });
    };
    getData();
    // 以下firebaseの処理
    // const thatMessage = this.chatMessage;
    // getData();
    // async function getData() {
    //   const querySnapshot = await getDocs(collection(db, "chats"));
    //   querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    //     thatMessage.push(doc.data()); // ここでthis.chatMessageはスコープ外になるので使用不可
    //   });
    // }
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
      // this.chatMessage.push({
      //   message: this.textKeep,
      //   name: this.auth.displayName,
      //   photoURL: this.auth.photoURL,
      //   createdAt: serverTimestamp(),
      // });
      // Firestoreに保存する処理
      addDoc(collection(db, "rooms", this.roomId, "messages"), {
        message: this.textKeep,
        name: this.auth.displayName,
        photoURL: this.auth.photoURL,
        createdAt: serverTimestamp(),
      })
        .then((result) => {
          console.log("Success!!!", result);
          this.textKeep = "";
        })
        .catch((error) => {
          console.log("Failed...", error);
          alert("メッセージの送信に失敗しました！");
        });
    },
  },
  components: { SideBar },
};
</script>

<style></style>
