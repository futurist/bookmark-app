import {MAIN_ACTION} from '../components/app/main.action'

export const initState = {
  data: []
}

const reducer = (state = initState , action = {type: ''}) => {
  switch (action.type) {
    case MAIN_ACTION.GET_LIST: {
      return action.payload
    }
    default:
      return state
  }
}

export default reducer
