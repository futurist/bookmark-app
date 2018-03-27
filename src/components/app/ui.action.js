
export const UI_ACTION = 'UI_ACTION'

export function uiState (options={}){
  return (obj) => (dispatch, getState) => dispatch(
    {
      type: UI_ACTION,
      payload: obj
    }
  )
}

export function hideBG (){
  return ()=>dispatch=>dispatch({
    type: UI_ACTION,
    payload: {unfold: false}
  })
}
