<template>
  <div class="main"></div>
</template>
<style>
</style>


<script>
import { mapState } from "vuex";
export default {
  name: "Classes",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    ...mapState(["classMap"]),
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  padding: 20px;
}
</style>