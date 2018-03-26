import mapValue from 'map-value'
import {FILTER_ACTION} from '../components/app/filter.action'

export const initState = {
  
}

const reducer = (state = initState , action = {type: ''}) => {
  // console.log(state, action)
  var filterEmpty = v=>v==null ? {} : v
  switch (action.type) {
    case FILTER_ACTION: {
      return Object.assign({}, state, mapValue(
        action.payload,
        {
          keyword: filterEmpty,
          tag: filterEmpty,
          like: filterEmpty,
        }
      ))
    }
    default:
      return state
  }
}

export default reducer
