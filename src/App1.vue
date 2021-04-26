<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import FrontHeader from "./components/front/home/FrontHeader"

    export default {
        name: "App1",
    components: {
      FrontHeader
    }
    }
</script>

<style scoped>

</style>
