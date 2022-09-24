<template>
  <!-- RoomViewに推移する際に不明なエラーが発生するため、一旦ここをRoomViewとする。 -->
  <v-app id="inspire">
    <SideBar />
    <v-app-bar
      color="orange lighten-5"
      class="bar-relative"
      app
      shrink-on-scroll
    >
      <v-toolbar-title>Room List</v-toolbar-title>
      <modal-window class="modal-position" />
    </v-app-bar>

    <v-main class="mt-4">
      <v-container>
        <v-row>
          <v-col v-for="room in rooms" :key="room.id" cols="4">
            <router-link
              class="underline-delete"
              :to="{ path: '/chat', query: { room_id: room.id } }"
            >
              <v-avatar color="orange" size="116">
                <v-icon v-if="!room.thumbnailUrl" size="60" dark>
                  mdi-account-circle
                </v-icon>
                <img :src="room.thumbnailUrl" v-if="room.thumbnailUrl" />
              </v-avatar>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import ModalWindow from "@/components/createRoom/ModalWindow.vue";
import { db } from "@/firebase/firebase";
import { getDocs, collection } from "firebase/firestore";

export default {
  data() {
    return {
      rooms: [],
    };
  },
  components: { SideBar, ModalWindow },
  mounted() {
    this.getRooms();
  },
  methods: {
    async getRooms() {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        const data = doc.data();
        data.id = doc.id;
        this.rooms.push(data);
      });
    },
  },
};
</script>

<style>
.underline-delete {
  text-decoration: none;
}
.bar-relative {
  position: relative;
}
.modal-position {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>
