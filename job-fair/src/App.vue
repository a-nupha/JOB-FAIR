<template>
  <v-app id="app" class="myFont">
    <div id="grad1">

    <v-card
    class="mx-auto overflow-hidden"

  >
    <v-app-bar
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="nextRegister()">Login</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>



      
    </v-navigation-drawer>
    
   <transition name="component-fade" mode="out-in">
              <component v-bind:is="z"></component>
    </transition>
                  
  <v-footer app bottom absolute padless>
      <v-card flat tile width="100%" color="#2d3e4e" class=" text-center">
        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>&copy; JOBFAIR </strong>
        </v-card-text>
      </v-card>
    </v-footer>
    </v-card>
    </div>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import { mapState } from "vuex";
import { sync } from "vuex-pathify";
import registerConsent from './components/sample/registerConsent.vue';
import applicationFrom from './components/applicationFrom.vue';
import productPackage from './components/sample/productPackage.vue';
import booking from './components/sample/booking.vue';
import location from './components/sample/location.vue';
import chanelNotification from './components/sample/chanelNotification.vue';
import homeRegister from './components/homeRegister.vue';
import jobItems from './components/jobItems.vue';

export default {
  name: "App",

  components: {
    registerConsent,
    applicationFrom,
    productPackage,
    booking,
    location,
    chanelNotification,
    homeRegister,
    jobItems,
  },
  computed: {
    ...mapState({
      page: store => store.getApi.page,
    }),
    ...sync("*"),
  },
  data: () => ({
     drawer: false,
      group: null,
  }),
  watch: {

  },
  mounted() {},
  created() {},
  methods: {
    nextRegister(){
          this.z = 'homeRegister';
          console.log('z',this.z);
        }
  },
};
</script>
<style>
#grad1 {
    height: 250
px
;
    width: 100%;
    background: linear-gradient(
141deg, #0fb8ad 0%, #95cac7 51%, #83bdb9 75%);
    color: white;
    opacity: 0.95;
}
#bottom {
    height: 250
px
;
    width: 100%;
    background: linear-gradient(
141deg, #fccc92 0%, #f5bb74 51%, #e09e50 75%);
    color: white;
    opacity: 0.95;
}
.myFont {
  font-family: 'Mitr', sans-serif; 
}
</style>