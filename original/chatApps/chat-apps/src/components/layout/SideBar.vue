<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-sheet>
      <v-avatar color="orange" size="70">
        <!-- プロフィール画像の選択 -->
        <!-- ref属性を指定することで、別の要素からその要素を参照することが出来る。 -->
        <!-- 今回の事例を言語化すると、inputのtype="fire"を使用したいが、inputは画面上に表示させたくない。そういう場合に、ref属性を使用すると、inputタグを表示させなくても使用することが可能になる。 -->
        <input
          ref="imageInput"
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          style="display: none"
          @change="updateImage"
        />
        <v-icon v-if="!photoData" dark @click="imageChange">
          mdi-account-circle
        </v-icon>
        <img
          style="cursor: pointer"
          :src="photoData"
          v-if="photoData"
          @click="imageChange"
        />
      </v-avatar>
      <!-- {{ userName && userName.displayName }} もしuserNameの中身に値があれば、userNameのdisplayNameを挿入する この記述だと割と簡潔 -->
      <div class="my-5">{{ userName }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text, to] in links" :key="icon" :to="to" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- ログアウト機能の実施 -->
      <v-list-item @click="logoutRun">
        <v-list-item-icon>
          <v-icon color="red">mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="font-logout">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// sessionStorageの情報をObject化
const userData = JSON.parse(sessionStorage.getItem("user"));

export default {
  data() {
    return {
      cards: ["Today", "Yesterday"],
      drawer: null,
      links: [
        ["mdi-home", "Home", "/"],
        ["mdi-account-multiple", "Friend", "/friend"],
        ["mdi-home-import-outline", "Room", "/room"],
        // ["mdi-chat", "Chat", "/chat"],
      ],
      userName: "",
      photoData: "", // updateImageメソッドから格納されていることを確認
    };
  },
  mounted() {
    // sessionStorageは文字列でしか保存出来ないため、JSON.parseでObjectに変換する必要がある。
    console.log(userData);
    // Objectになったので、keyを指定し、dataのuserNameにvalueを挿入する。
    this.userName = userData.displayName;

    this.photoData = userData.photoURL;
  },
  methods: {
    logoutRun() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("Success!!!");
          localStorage.message = "ログアウトに成功しました！";
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log("Failed...", error);
        });
    },
    imageChange() {
      console.log("imageChange is called");
      this.$refs.imageInput.click();
    },
    updateImage() {
      console.log("updateImage is called");
      const user = this.getUser();
      if (!user) {
        sessionStorage.removeItem("user");
        this.$router.push("/login");
      }

      const imageFile = this.$refs.imageInput.files[0];
      const filePath = `/user/${imageFile.name}`;
      console.log(imageFile);

      // Create a root reference
      const storage = getStorage();

      // 参照を作成 → 'images/(画像名)'
      const storageRef = ref(storage, filePath);
      uploadBytes(storageRef, imageFile)
        .then(async (snapshot) => {
          console.log("アップロードに成功しました", snapshot);

          const getUrl = await getDownloadURL(ref(storage, filePath));
          console.log(getUrl);

          const auth = getAuth();
          await onAuthStateChanged(auth, (user) => {
            if (user) {
              updateProfile(auth.currentUser, {
                photoURL: getUrl,
              });
              // console.log(user); // photoURLを変更出来ていることを確認。
              // sessionStorageのphotoURLを更新する
              userData.photoURL = getUrl;
              sessionStorage.setItem("user", JSON.stringify(userData));
              this.photoData = getUrl;
            }
          });
        })
        .catch((error) => {
          console.log("アップロードに失敗しました", error);
        });
    },
    getUser() {
      const auth = getAuth();
      return onAuthStateChanged(auth, (user) => {
        console.log(user);
        return user;
      });
    },
  },
};
</script>

<style>
.font-logout {
  font-weight: bold;
}
</style>
