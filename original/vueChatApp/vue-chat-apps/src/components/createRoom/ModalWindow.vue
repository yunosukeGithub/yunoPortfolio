<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          ルームを新規作成
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5 center-title">ルーム情報を入力して下さい。</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Room Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="file"
                  truncate-length="15"
                  accept="image/jpeg, image/jpg, image/png"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="onSubmit"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db, storage } from "@/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  data: () => ({
    dialog: false,
    name: "",
    file: null,
  }),
  methods: {
    onSubmit() {
      this.dialog = false;

      const filePath = `/room/${this.file}`;

      // 参照を作成 → 'images/(画像名)'
      const storageRef = ref(storage, filePath);
      uploadBytes(storageRef, this.file)
        .then(async (snapshot) => {
          console.log("アップロードに成功しました", snapshot);

          const getUrl = await getDownloadURL(ref(storage, filePath));
          console.log(getUrl);
          const docRef = await addDoc(collection(db, "rooms"), {
            name: this.name,
            thumbnailUrl: getUrl,
            createdAt: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
          this.dialog = false;
        })
        .catch((error) => {
          console.log("アップロードに失敗しました", error);
        });
    },
  },
};
</script>

<style>
.center-title {
  margin: 0 auto;
}
</style>
