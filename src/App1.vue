<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import FrontHeader from "./components/front/home/FrontHeader"
  import Registered from "./views/front/Registered"

  export default {
    name: "App1",
    components: {
      FrontHeader,
      Registered
    },
    }
</script>

<style scoped>

</style>
