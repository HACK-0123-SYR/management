import Vue from 'vue'
import Vuex from 'vuex'
//request <== axios
import { request } from '@/request/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teacherInfo: {},
    classMap: new Map(),
    studentList: [],
  },
  getters: {
  },
  mutations: {
    TOKEN(state, data) {
      state.teacherInfo = data
    },
    THECLASS(state, { classSet }) {
      state.classMap = new Map(classSet)
      // console.log(state.classMap);
    }

  },
  actions: {
    testToken: async ({ commit }) => {
      try {
        let res = await request({
          url: "/teacher/testToken",
          method: "POST",
        })
        if (res.data.code == 200) {
          //token验证成功 commit
          commit('TOKEN', res.data.data)
        }
        else {
          //token验证失败 需要跳转
          //返回跳转标志
        }
      } catch (error) {
        console.log(error);
      }
    },
    getAllClass: async ({ commit }) => {
      try {
        let res = await request({
          url: "/teacher/getAllClass",
          method: "GET",
        })
        // console.log(res);
        if (res.data.code == 200) {
          //拿到教师所有教课的班级
          commit('THECLASS', res.data.data)
        }
        else {
          //拿不到 
        }
      } catch (error) {
        console.log(error);
      }
    },
    getStudent: async (context, theClass) => {
      console.log();
    }
  },
  modules: {
  }
})
