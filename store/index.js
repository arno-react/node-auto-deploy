
import mutation from './mutations'
import action from './actions'
export let store = {}

export const plugins = [ (d) => {store = d }]
export const state = {
  deployList: [],
  taskList:[],
  userList: [],
  permissList: []
}
export const mutations = mutation
export const actions =  action

