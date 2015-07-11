import React, { PropTypes } from 'react'
import { Redirect, Router, Route } from 'react-router'
import { Provider } from 'redux/react'
import { createDispatcher, createRedux, composeStores } from 'redux'
import { loggerMiddleware, thunkMiddleware } from './middleware'
import * as stores from './stores'

import Application from './components/Application'
import Main from './components/pages/Main'
import Search from './components/pages/Search'
import Manga from './components/pages/Manga'
import Chapter from './components/pages/Chapter'

const dispatcher = createDispatcher(
  composeStores(stores),
  getState => [ thunkMiddleware(getState), loggerMiddleware ]
)
const redux = createRedux(dispatcher)

export default class Root extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    const { history } = this.props
    return (
      <Provider redux={redux}>
        {renderRoutes.bind(null, history)}
      </Provider>
    )
  }
}

function renderRoutes (history) {
  return (
    <Router history={history}>
      <Route component={Application}>
        <Route name="main" path="/" component={Main} />
        <Route name="search" path="/search" component={Search} />
        <Route name="manga" path="manga/:mangaID" component={Manga} />
        <Route name="chapter" path="/manga/:mangaID/:chapter" component={Chapter} />
      </Route>
    </Router>
  )
}