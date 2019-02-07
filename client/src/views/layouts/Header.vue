<template>
    <v-toolbar>
      <v-toolbar-title></v-toolbar-title>
      <v-flex xs12>
        <v-img
          :src="require('../../assets/gerb.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-spacer></v-spacer>
      
    </v-toolbar>
</template>

<script>
// import router from "../../../router/index";
export default {  
  methods: {
    // navigateTo (route) {
    //   this.$router.push(route);
    // },
    // logout() {
    //   this.$store.dispatch("setToken", null);
    //   this.$store.dispatch("setUser", null);
    //   router.push({
    //     name: "Authentication"
    //   });
    // }
  }
};
</script>

<style lang='scss'>

  .v-toolbar__content {
    background-color: #092470;
  }
  
  .v-toolbar__title {
    color: #fff;
  }

  body {    
    &:after {
      content: '';
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: .3;
      z-index: -1;
    }
  }
</style>

