import ReactCSS from 'react-cssobj'
import flexbox from 'cssobj-plugin-flexbox'
import defaultUnit from 'cssobj-plugin-default-unit'

import resetCSS from './minireset.css.js'
// import resetCSS from './normalize.css.js'
import layoutCSS from './layout.css.js'

ReactCSS(resetCSS)

const cssLayout = ReactCSS(layoutCSS, {
  local: true,
  plugins: [flexbox(), defaultUnit()]
})
window.cssLayout = cssLayout

export { cssLayout }

