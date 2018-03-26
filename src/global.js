import store from './store'
import {uiState} from './components/app/ui.action'

const {dispatch, getState} = store

const setResize = uiState()
const mediaQuery = window.matchMedia('(min-width: 768px)')
const listener = mq=>{
  setResize({
    phone: !mq.matches,
    size: {
      w: window.innerWidth,
      h: window.innerHeight
    }
  })(dispatch, getState)
}
mediaQuery.addListener(listener)
listener(mediaQuery)

