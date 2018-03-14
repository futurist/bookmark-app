import {USER_ACTION} from '../components/user/actions'

export const initState = {
  data: []
}

const reducer = (state = initState , action = {type: ''}) => {
  switch (action.type) {
    case USER_ACTION.GET_LIST: {
      return action.data
      break
    }
    default:
      return state
  }
}

export default reducer
