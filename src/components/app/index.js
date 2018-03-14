import React from 'react'
import Loadable from 'react-loadable'
import loading from '../loading'

const LoadableComponent = Loadable({
  loader: () => import('../user'),
  loading,
  delay: 1000,
  timeout: 15e3,
})

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <header>
          <h2 className='appTitle'>Bookmark List</h2>
        </header>
        <LoadableComponent />
      </div>
    )
  }
}

export default App
