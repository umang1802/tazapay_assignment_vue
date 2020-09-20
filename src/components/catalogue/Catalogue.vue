<template>
  <div>
    <Navbar />
    <h1>COURSE CATALOGUE</h1>
    <v-container>
    <v-row>
      <v-col
        v-for="cat in  catalogue"
        :key="cat.id"
        cols="6"
        md="4"
      >
        <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <v-img
      height="250"
      :src="cat.image"
    ></v-img>

    <v-card-title>{{ cat.name }}</v-card-title>

    <v-card-text>
      <div class="my-4 subtitle-1">
        ${{ cat.cost }} • {{ cat.instructor }}
      </div>

      <div>{{ cat.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
      <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="launchCourse(cat.id)"
      >
        Join Course
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>
   


<script>
import Navbar from "../Navbar/NavBar.vue";
export default {
  name: "Catalogue",
  data: () => {
    return {
      catalogue: [...this.$store.getters.catalogue]
    }
  },
  components: {
    Navbar: Navbar,
  },
  methods: {
    launchCourse: function(id) {
      console.log(id)
    }
  },
  mounted () {
      this.$store.dispatch('getCatalogue').then(resp => {
      console.log('log--> ',resp);
      })
    },
    computed: {
      catalogue : function(){ return this.$store.getters.catalogue }
    }
};
</script>

<style scoped>
</style>