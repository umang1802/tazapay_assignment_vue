<template>
  <div>
    <v-app-bar color="#1976d2" dense dark>
      <v-toolbar-title>TAZAPAY EDX</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small color="error" @click="logout">Logout</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style>
</style>