<template>
  <v-app>
    <!-- ヘッダー -->
    <div>
      <v-app-bar absolute app color="orange" dark>
        <div class="d-flex align-center"><h1>Tomodachat!!!</h1></div>

        <v-spacer></v-spacer>

        <v-btn href="https://yuno-health-record.blog/" target="_blank" text>
          <span class="mr-2">製作者のブログへ</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-app-bar>
    </div>

    <!-- ログイン画面 -->
    <v-main>
      <v-container class="mt-16">
        <v-card class="card-unit">
          <v-card-title class="card-title">ログイン</v-card-title>
          <v-card-subtitle>ユーザー情報を入力して下さい</v-card-subtitle>
          <v-btn text color="light-blue" to="/signup"
            >新規登録はこちらから</v-btn
          >
          <v-container>
            <v-row no-gutters>
              <v-col cols="8" class="mx-auto">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    type="password"
                    label="Password"
                  ></v-text-field>

                  <!-- :disabledはtrueの時にクリック不可、falseの時にクリック可能となる。 -->
                  <v-btn
                    @click="loginRun"
                    :disabled="isvalid"
                    color="success"
                    class="mr-4"
                  >
                    LOGIN
                  </v-btn>
                  <v-btn @click="clear"> CLEAR </v-btn>
                  <v-alert v-if="successMessage" class="mt-6" type="success">
                    {{ successMessage }}
                  </v-alert>
                  <v-alert v-if="errorMessage" class="mt-6" type="error">{{
                    errorMessage
                  }}</v-alert>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-main>

    <!-- フッター -->
    <v-footer absolute color="orange lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-col class="orange lighten-1 py-4 text-center white--text" cols="12">
          <strong>&copy;2022 Yunosuke Kitayama</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { auth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "メールアドレスを入力してください",
        (v) => /.+@.+\..+/.test(v) || "メールアドレスが不正です",
      ],
      password: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  mounted() {
    if (localStorage.message) {
      this.successMessage = localStorage.message;
      localStorage.message = "";
    }
  },
  computed: {
    isvalid() {
      console.log(this.valid);
      return !this.valid;
    },
  },
  methods: {
    clear() {
      this.email = "";
      this.password = "";
    },
    loginRun() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log("Success!!!", userCredential);

          // ユーザー情報をsessionStorageに保存する
          // sessionStorage→ブラウザを閉じたらデータが削除される。
          const userData = {
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            refreshToken: userCredential.user.refreshToken,
            photoURL: userCredential.user.photoURL,
          };

          sessionStorage.setItem("user", JSON.stringify(userData));

          this.$router.push("/");
        })
        .catch((error) => {
          console.log("Failed...", error);
          this.errorMessage =
            "メールアドレスまたはパスワードが間違っています！";
        });
    },
  },
  components: {},
};
</script>

<style>
.card-title {
  display: inline-block;
}

.card-unit {
  width: 50%;
  margin: 0 auto;
}
</style>
