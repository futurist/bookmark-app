import React from 'react'
import Loadable from 'react-loadable'
import loading from '../loading'
import ReactCSS from 'react-cssobj'
import flexbox from 'cssobj-plugin-flexbox'
import defaultUnit from 'cssobj-plugin-default-unit'

const gridLayout = {
  '.app':{
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gridTemplateRows: '80px 1fr',
    gridTemplateAreas: `
"nav header header"
"nav main main"
`
  },
  'header':{ gridArea: 'header' },
  'nav':{ gridArea: 'nav' },
  'main':{ gridArea: 'main', minHeight: 200 },
}

const {css, mapClass} = ReactCSS({
  '@supports(display:grid)': gridLayout
}, {
  local: true,
  plugins: [flexbox(), defaultUnit()]
})

const LoadableComponent = Loadable({
  loader: () => import('../user'),
  loading,
  delay: 1000,
  timeout: 15e3,
  render (el, props){
    const Component = el.default
    return <main className="main"><div/></main>
  }
})

class App extends React.Component {
  constructor(props, context){
    super(props, context)
    this.state = {}
  }
  componentWillReceiveProps(a,b,c){
    console.log(a,b,c)
  }
  render () {
    // const d= cloneTree(
    //   <div className="a"><p className="b"><span>text</span></p></div>,
    //   el => el.type=='span' ? {children:<h1/>} : replacer(el.props.className)
    // ); return d;
    return mapClass(
      <div className='app'>
        <nav>
          It's NAV
        </nav>
        <header>
          <h2 className={{appTitle:1, abc:this.state.ok}} onClick={e=>{
            css.set('.appTitle', {color: 'white'})
            this.setState({ok: !this.state.ok})
          }}><span>Bookmark List</span></h2>
        </header>
        <LoadableComponent />
      </div>
    )
  }
}

export default App
