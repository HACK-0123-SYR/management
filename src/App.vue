<template>
  <div id="app">
   <Login> </Login>
    <router-view/>
  </div>
</template>
<script>
import Login from "./views/login/index.vue";
  // import Login from './views/login/index.vue'
  export default {
		name:'App',
		components:{ Login}
	}
  
</script>
<style>

</style>
