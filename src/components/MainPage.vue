<template>
  <div></div>
</template>

<script>
import { request } from "@/request/index.js";

export default {
  mounted() {
    request({
      url: "/student/testToken",
      method: "POST",
    })
    .then(res =>{
        console.log(res);
    },err =>{
        console.log(err);
    })
  },
};
</script>

<style>
</style>