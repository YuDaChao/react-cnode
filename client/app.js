import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react'
import {
  BrowserRouter,
} from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import AppState from './store/appState'
import App from './views/App'

// ReactDom.hydrate(<App />, document.getElementById('root'));

const initialState = window.__INITIAL_STATE__ || {} // eslint-disable-line

const root = document.getElementById('root');

const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default; // eslint-disable-line
    render(NextApp);
  })
}
