import API from '../../api'
import {GenerateActions} from '../../utils'

export const MAIN_ACTION = GenerateActions('MAIN_ACTION', [
  'GET_LIST',
  'FETCH_ERROR'
])

export function getList(options={}){
  return e => (dispatch, getState) => API.get('/bookmark?limit='+(
    (getState().list.limit||10)+10
  ))
    .then(data=>{
      dispatch({type: MAIN_ACTION.GET_LIST, payload: data})
      return data
    })
    .catch(error=>dispatch({type: MAIN_ACTION.FETCH_ERROR}))
}

