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
    return API.get('/bookmark?allData=1&limit='+(
      (list.limit||100)+50
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
  payload.data = payload.data.filter(v=>{
    let ok = true
    if(like) ok = ok && v.isLike
    if(tag) ok = ok && !isEmpty(v.tags) && v.tags.indexOf(tag)>-1
    if(keyword) ok = ok && [v.url||'', v.desc||'', v.title||''].join('').indexOf(keyword)>-1
    return ok
  })
  // temp pull out tags, should impement on server:
  const tags = payload.tags || {}
  let min = Infinity, max=0
  payload.allData && payload.allData.forEach(v=>{
    if(!isEmpty(v.tags)) {
      v.tags.forEach(t=>{
       const val = tags[t] = (tags[t]||0)+1
       max = Math.max(max, val)
       min = Math.min(min, val)
      })
    }
  })
  payload.tags = tags
  payload.tagsMin = min
  payload.tagsMax = max
  // console.log(tags)
}

