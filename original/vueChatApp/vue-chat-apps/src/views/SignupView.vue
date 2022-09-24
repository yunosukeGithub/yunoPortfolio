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
          <v-card-title class="card-title">会員登録</v-card-title>
          <v-card-subtitle>登録情報を入力して下さい</v-card-subtitle>
          <v-btn text color="light-blue" to="/login"
            >ログインはこちらから</v-btn
          >
          <v-container>
            <v-row no-gutters>
              <v-col cols="8" class="mx-auto">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="UserName"
                    required
                  ></v-text-field>

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
                    @click="submit"
                    :disabled="isvalid"
                    color="success"
                    class="mr-4"
                  >
                    Sign Up
                  </v-btn>
                  <v-btn @click="clear"> CLEAR </v-btn>
                  <v-alert v-if="errorMessage" type="error" class="mt-6">{{
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
// ※ firebase:モジュール毎の読み込みなため、firebase.js(初期化ファイル)からのimportを忘れがちになるため注意！！！ ※
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default {
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "名前を入力して下さい",
        (v) => (v && v.length <= 10) || "名前を10文字以内で入力して下さい",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "メールアドレスを入力してください",
        (v) => /.+@.+\..+/.test(v) || "メールアドレスが不正です",
      ],
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    submit() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log("Success!", userCredential);
          updateProfile(auth.currentUser, {
            displayName: this.name,
          });
          localStorage.message = "ユーザーの新規作成に成功しました！";
          this.$router.push("login");
        })
        .catch((error) => {
          console.log("Failed...", error);
          this.errorMessage = "ユーザーの新規登録に失敗しました...";
        });
    },
    clear() {
      this.name = "";
      this.email = "";
      this.password = "";
    },
  },
  computed: {
    isvalid() {
      console.log(this.valid);
      return !this.valid;
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
