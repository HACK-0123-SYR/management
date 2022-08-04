import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/index',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/studentList',
    name: 'studentList',
    component: () => import('@/components/StudentList.vue')
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('@/components/Student.vue')
  }
  // {
  //   path: '*',
  //   redirect: '/'
  // }
]

const router = new VueRouter({
  routes
})

export default router
