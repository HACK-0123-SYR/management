<template>
  <div id="app">
    <Login> </Login>
    <router-view></router-view>
    <!-- <MainPage /> -->
  </div>
</template>
<script>
import Login from "./views/login/index.vue";
// import Login from './views/login/index.vue'
import MainPage from '@/components/MainPage.vue'
  export default {
		name:'App',
		components:{ Login,MainPage }
	}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
