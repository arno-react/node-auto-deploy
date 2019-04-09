
import mutation from './mutations'
import action from './actions'
import {createWebSocketPlugin} from '../plugins/socket'
import {createStorePlugin} from '../layouts/mixin/ResizeHandler'
export let store = {}

export const plugins = [ (d) => {store = d }]
export const state = {
  user: {},
  deployList: []
}
export const mutations = mutation
export const actions =  action

