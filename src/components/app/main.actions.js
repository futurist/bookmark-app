import API from '../../api'
import {GenerateActions} from '../../utils'

export const MAIN_ACTION = GenerateActions('MAIN_ACTION', [
  'GET_LIST',
  'FETCH_ERROR'
])

export function getList({resize}={}){
  return e => (dispatch, getState) => API.get('/bookmark')
    .then(data=>{
      dispatch({type: MAIN_ACTION.GET_LIST, payload: data})
      if(resize){
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'))
      }
    })
    .catch(error=>dispatch({type: MAIN_ACTION.FETCH_ERROR}))
}

