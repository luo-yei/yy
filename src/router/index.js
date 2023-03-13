import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path:'find',
        alias: '',
        name:'Find',
        component: () => import('../views/Find.vue'),
        children: [
          
        ]
      },
      {
        path:'podcast',
        name:'Podcast',
        component: () => import('../views/Podcast.vue'),
      },
      {
        path:'my',
        name:'My',
        component: () => import('../views/My.vue'),
      },
      {
        path:'attention',
        name:'Attention',
        component: () => import('../views/Attention.vue'),
      },
      {
        path:'community',
        name:'Community',
        component: () => import('../views/Community.vue'),
      },
    ] 
  },
  {
    path: 'search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    children: [
        {
          path: 'singers',
          name: 'Singers',
          component: () => import('../views/Singers.vue')
        },
    ]
  },
  {
    path:'/singerSong/:id',
    name:'SingerSong',
    component: () => import('../views/SingerSong.vue'),
  },
  {
    path:'/login',
    name:'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path:'/everyRecommend',
    name:'EveryRecommend',
    component: () => import('../views/EveryRecommend.vue'),
  },
  {
    path:'/recSongs',
    name:'RecSongs',
    component: () => import('../views/RecSongs.vue'),
  }
]

const router = new VueRouter({
  routes
})
export default router
