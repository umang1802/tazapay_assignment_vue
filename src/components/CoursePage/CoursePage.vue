<template>
  <div>
    <Navbar />
    <v-app id="inspire">
      <v-container>
        <v-row>
          <div class="fixed">
            <v-treeview
              v-model="selection"
              :items="items"
              :selection-type="selectionType"
              selectable
              return-object
              open-all
            ></v-treeview>
          </div>
          <v-col cols="3"></v-col>
          <v-divider vertical></v-divider>
          <v-col class="pa-6" cols="7">
            <template v-if="!selection.length">No nodes selected.</template>
            <template v-else>
              <div v-for="node in selection" :key="node.id">
                <div class="content-card">
                  <h2 class="content-heading-card">{{node.content.title}}</h2>
                  <div class="content-img">
                    <img :src="node.content.image" class="content-img" />
                  </div>
                  <div class="text-content">
                    <p>{{node.content.textcontent}}</p>
                  </div>
                </div>
              </div>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Navbar from "../Navbar/NavBar.vue";
export default {
  name: "CoursePage",
  components: {
    Navbar: Navbar,
  },
  data: () => ({
    selectionType: "independent",
    selection: [],
    items: [],
  }),
  mounted() {
    const id = this.$route.params.id;
    this.$store.dispatch("getCourse", { id: id }).then((resp) => {
      console.log(resp);
      //console.log(this.$store.state.course);
      this.items = this.$store.state.course;
    });
  },
  computed: {
    //computed item not picking bug-- visit back
    items: function () {
      return this.$store.getters.getCourse;
    },
  },
  methods: {
    selection: function (item) {
      console.log("item-->", item);
    },
  },
};
</script>
<style scoped>
.content-heading {
  margin-top: 5%;
  margin-bottom: 3%;
}

.content-heading-card {
  margin-top: 5%;
}

.course-tree-container {
  float: left;
  width: 30%;
  margin-left: 5%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.content-img {
  margin-top: 5%;
  width: 80%;
  margin-left: 10%;
  margin-bottom: 10%;
}

.text-content {
  width: 80%;
  margin-left: 10%;
  text-align: justify;
  margin-bottom: 5%;
}

.content-card {
  float: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin-left: 5%;
  width: 55%;
  height: 60%;
  margin-bottom: 5%;
  margin-right: 5%;
}

.fixed {
  position: fixed;
  z-index: 0;
}
</style>