import {getList} from './main.action'

const updateList = getList()()

export const FILTER_ACTION = 'FILTER_ACTION'

export function addFilter (options={}){
  return ({keyword, tag, like}) => (dispatch, getState) => dispatch(
    {
      type: FILTER_ACTION,
      payload: { keyword, tag, like }
    }
  ) && updateList(dispatch, getState)
}

