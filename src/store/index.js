import Vue from 'vue'
import Vuex from 'vuex'
//request <== axios
import { request } from '@/request/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teacherInfo: {},
    classMap: new Map(),
    oneStudentInfo: {},
    oneStudentWeekStatus: []
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
    },
    CHANGESTU(state, { oneStudentInfo, oneStudentWeekStatus }) {
      state.oneStudentInfo = oneStudentInfo
      state.oneStudentWeekStatus = oneStudentWeekStatus
    },
    DestoryInfo(state){
      state.oneStudentInfo = {}
      state.oneStudentWeekStatus = []
      console.log("Destorying");
      console.log(state.oneStudentInfo,state.oneStudentWeekStatus);
    },
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
    getStudentData: async (context, row) => {
      // console.log(row);
      try {
        let res = await request({
          url: "/teacher/getWeekStatus",
          method: "POST",
          data: {
            id: row.student_id
          }
        })
        if (res.data.code == 200) {
          context.commit('CHANGESTU', {
            oneStudentInfo: row,
            oneStudentWeekStatus: res.data.data,
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
