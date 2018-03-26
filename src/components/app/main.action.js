import API from '../../api'
import {GenerateActions} from '../../utils'
import {isEmpty} from 'cssobj-helper'
export const MAIN_ACTION = GenerateActions('MAIN_ACTION', [
  'GET_LIST',
  'FETCH_ERROR'
])

export function getList(options={}){
  return e => (dispatch, getState) => {
    const {list, filter} = getState()
    return API.get('/bookmark?limit='+(
      (list.limit||10)+10
    ))
    .then(payload=>{
      applyFilter(payload, filter)
      dispatch({type: MAIN_ACTION.GET_LIST, payload})
      return payload
    })
    .catch(error=>dispatch({type: MAIN_ACTION.FETCH_ERROR}))
  }
}

function applyFilter(payload, filter={}){
  const {keyword, like, tag} = filter
  payload.data = payload.data.filter(v=>
    like
    ? v.isLike
    : tag
    ? !isEmpty(v.tags) && v.tags.indexOf(tag)>-1
    : keyword
    ? [v.url||'', v.desc||'', v.title||''].join('').indexOf(keyword)>-1
    : true
  )
}

