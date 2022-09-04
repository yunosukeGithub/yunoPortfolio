import Vue from 'vue'
import VueRouter from 'vue-router'

// ページファイル
import HomePages from '../components/pages/HomePages.vue'
import SearchPages from '../components/pages/SearchPages.vue'
import ListPages from '../components/pages/ListPages.vue'

// 部品ファイル
// import HeaderModules from '../components/modules/HeaderModules.vue'
// import FooterModules from '../components/modules/FooterModules.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePages
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPages
  },
  {
    path: '/list',
    name: 'list',
    component: ListPages
  }
  // {
  //   path: '/header',
  //   name: 'header',
  //   component: HeaderModules
  // },
  // {
  //   path: '/footer',
  //   name: 'footer',
  //   component: FooterModules
  // }
]

// const Default = { template: 'home'}
// const Header = { template: 'header' }
// const Footer = { template: 'footer' }


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes 
  //   { path: '/',
  //     components: {
  //       default: Default,
  //       a: Header,
  //       b: Footer
  //     }
  //   },
  // ]
})

export default router
