<template>
  <div>
    {{oneStudent}}
    <el-button @click="back">back</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapState(['oneStudent'])
    },
    methods:{
        back(){
            this.$router.push({
                name:'studentList'
            })
        }
    },
    mounted(){
        if(!this.oneStudent._id){
            this.$router.replace({
                name:'studentList'
            })
        }
    }
}
</script>

<style>

</style>