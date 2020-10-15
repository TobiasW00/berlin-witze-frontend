import React from 'react'
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import App from './App';
import UserProvider from './provider/UserContext';
import InboxProvider from './provider/InboxContext';
import MemberProvider from './provider/MemberContext';
import TagsProvider from './provider/TagsContext';
import FantasieFilterProvider from './provider/WitzeFilterContext';
import FantasieProvider from './provider/WitzeContext';
import MemberFilterProvider from './provider/MemberFilterContext';
import WebsocketProvider from './provider/WebsocketContext';
import { Provider } from "react-redux";
import { createStore, applyMiddleware ,compose } from "redux";
import reducers from "./reducers";
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
  whyDidYouRender(React);
}
export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

render((
  <Provider store={store}>
  <Router history={history}>
  <RecoilRoot>
  <WebsocketProvider>
  <MemberFilterProvider>
  <FantasieFilterProvider>
  <MemberProvider>
  <FantasieProvider>
  <InboxProvider>

  <UserProvider>
  <App />
  </UserProvider>

  </InboxProvider>
  </FantasieProvider>
  </MemberProvider>
  </FantasieFilterProvider>
  </MemberFilterProvider>
  </WebsocketProvider>
  </RecoilRoot>
  </Router>
  </Provider>
), document.getElementById('content'));
/*
history.listen((location) => {
  if(localStorage.getItem("disclaimer")==="true")
  window.gtag('config', 'UA-81359783-1', {'page_path':location.pathname});
});
*/
serviceWorker.register()