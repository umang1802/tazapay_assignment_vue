<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Please Login to continue...</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-alert v-if="error" type="error">{{ errMsg }}</v-alert>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "login",
  data: function () {
    return {
      username: "",
      password: "",
      error: false,
      errMsg: "",
    };
  },
  methods: {
    login: function () {
      let email = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { email: email, password: password })
        .then(() => this.$router.push("/catalogue"))
        .catch((err) => {
          this.error = true,
          this.errMsg = err
        });
    },
  },
};
</script>

<style>
</style>