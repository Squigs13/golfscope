<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-btn icon color="white" to="/">
          <v-icon>mdi-golf-tee</v-icon>
        </v-btn>
        <v-toolbar-title>Tee Heights</v-toolbar-title>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    // HelloWorld
  },

  created () {
    this.$store.dispatch('getRounds')
    this.$store.dispatch('getClubs')
  },

  data: () => ({
    //
  })
}
</script>
