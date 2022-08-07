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
  },
  {
    path: '/questions',
    name: 'questions',
    component: () => import('@/components/Questions.vue')
  },
  {
    path: '/Classes',
    name: 'classes',
    component: () => import('@/components/Classes.vue')
  },
  // {
  //   path: '*',
  //   redirect: '/'
  // }
]

const router = new VueRouter({
  routes
})

router.afterEach((to,from) =>{
})

export default router
