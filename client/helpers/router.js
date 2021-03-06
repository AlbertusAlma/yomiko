import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Sample from '../views/Sample.vue'
import MangaList from '../views/MangaListView.vue'
import MangaViewer from '../views/MangaViewer.vue'

const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', redirect: '/manga' }, // FIXME: Add Main Page
    { path: '/manga', component: MangaList },
    { path: '/manga/:param/:value', component: MangaList },
    { path: '/manga/:id(\\d+)', component: MangaViewer },
    { path: '/sample', component: Sample },
    { path: '*', redirect: '/' },
  ],
})

export default router
