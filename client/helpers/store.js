import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import callApi from './callApi'

function makeParams (params) {
  if (!params) return

  const { param, value } = params
  switch (param) {
    case 'id':
    case 'name':
    case 'type':
    case 'language':
      return { [param]: `eq.${value}` }
    case 'author':
    case 'group':
    case 'character':
    case 'tag':
      return { [param + 's']: `@>.{${value}}` }
    case 'series':
      return { [param + 'es']: `@>.{${value}}` }
  }
}

const store = new Vuex.Store({
  state: {
    manga: {
      list: [],
      info: {},
      itemsPerPage: 12,
    },
  },
  actions: {
    // ensure data for rendering given list type
    FETCH_MANGA_LIST: ({ commit, state }, { page }) =>
      callApi({
        url: 'mangas',
        params: makeParams(state.route.params),
        page,
        itemsPerPage: state.manga.itemsPerPage,
      }).then(json => commit('SET_MANGA_LIST', json)),

    FETCH_MANGA: ({ commit, state }, id) =>
      callApi({
        url: `mangas`,
        params: { id: `eq.${id}` },
        single: true,
      }).then(json => commit('SET_MANGA', json)),

    FETCH_MANGA_PAGE: async ({ commit, state, dispatch }, id) => {
      if (!state.manga.info[id]) {
        await dispatch('FETCH_MANGA', id)
      }
      return await callApi(`pages?mangaId=eq.${id}`)
        .then(json => commit('SET_MANGA_PAGE', { id, pages: json }))
    },
  },
  mutations: {
    SET_MANGA_LIST: (state, list) => {
      state.manga.list = list
      list.forEach(manga => {
        if (!state.manga.info[manga.id]) state.manga.info[manga.id] = manga
      })
    },

    SET_MANGA: (state, manga) => {
      if (manga && !state.manga.info[manga.id]) state.manga.info[manga.id] = manga
    },

    SET_MANGA_PAGE: (state, { id, pages }) => {
      state.manga.info[id].pages = pages
    },
  },

  getters: {
    mangaList: state => state.manga.list,
    mangaInfo: state => id => state.manga.info[id],
  },
})

export default store
