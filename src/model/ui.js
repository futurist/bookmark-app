import mapValue from 'map-value'
import {UI_ACTION} from '../components/app/ui.action'

export const initState = {
  
}

const reducer = (state = initState , action = {type: ''}) => {
  console.log(state, action)
  switch (action.type) {
    case UI_ACTION: {
      return Object.assign({}, state, action.payload)
    }
    default:
      return state
  }
}

export default reducer
