import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import reducer from '../shared/reducer'
import App from '../shared/components/App'

const root = document.getElementById('root')
const store = createStore(reducer,  window.state)

const provider = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

render(provider, root)
delete window.state
