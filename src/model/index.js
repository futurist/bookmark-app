import {combineReducers} from 'redux'
import list from './list'
import filter from './filter'
import ui from './ui'

export default combineReducers({
  list,
  filter,
  ui,
})
