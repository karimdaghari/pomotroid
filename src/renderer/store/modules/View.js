import { localStore } from './index'

const state = {
  currentDrawer: 'appDrawerTimer',
  drawerOpen: false,
  autoStartTimer:
    localStore.get('autoStartTimer') === undefined
      ? true
      : localStore.get('autoStartTimer'),
  alwaysOnTop: localStore.get('alwaysOnTop'),
  minToTray: localStore.get('minToTray'),
  notifications: localStore.get('notifications'),
  miniMode: localStore.get('miniMode'),
  os: process.platform
}

const getters = {
  autoStartTimer() {
    return state.autoStartTimer
  },

  currentDrawer() {
    return state.currentDrawer
  },

  drawerOpen() {
    return state.drawerOpen
  },

  alwaysOnTop() {
    return state.alwaysOnTop
  },

  minToTray() {
    return state.minToTray
  },

  notifications() {
    return state.notifications
  },

  miniMode() {
    return state.miniMode
  },

  os() {
    return state.os
  }
}

const mutations = {
  SET_SETTING(state, payload) {
    localStore.set(payload.key, payload.val)
  },

  SET_VIEW_STATE(state, payload) {
    state[payload.key] = payload.val
  },

  TOGGLE_DRAWER(state) {
    state.drawerOpen = !state.drawerOpen
  },

  TOGGLE_MINIMODE(state) {
    state.miniMode = !state.miniMode
  }
}

const actions = {
  setSetting({ commit }, payload) {
    commit('SET_SETTING', payload)
  },

  setViewState({ commit }, payload) {
    commit('SET_VIEW_STATE', payload)
  },

  toggleDrawer({ commit }) {
    commit('TOGGLE_DRAWER')
  },

  toggleMiniMode({ commit }) {
    commit('TOGGLE_MINIMODE')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
