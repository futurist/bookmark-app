import API from '../../api'
import {GenerateActions} from '../../utils'

export const USER_ACTION = GenerateActions('USER_ACTION', [
  'GET_LIST',
  'FETCH_ERROR'
])

export function getList(options){
  return e => (dispatch, getState) => API.get('/api/users')
    .then(data=>dispatch({type: USER_ACTION.GET_LIST, data}))
    .catch(error=>dispatch({type: USER_ACTION.FETCH_ERROR}))
}

