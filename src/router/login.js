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
    path: '/student/:id',
    name: 'student',
    props({ params }) {
      return {
        id: params.id
      }
    },
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
  {
    path: '/Class/:theClass',
    name: 'class',
    props({ params }) {
      return {
        theClass: params.theClass
      }
    },
    component: () => import('@/components/Class.vue')
  },
  {
    path: '/Personal',
    name: 'personal',
    component: () => import('@/components/Personal.vue')
  },
  {
    path: '*',
    redirect: '/studentList'
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
})

export default router
