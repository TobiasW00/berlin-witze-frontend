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

import { createBrowserHistory } from 'history';


if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
  whyDidYouRender(React);
}
export const history = createBrowserHistory();

render((
  <Router history={history}>
  <WebsocketProvider>
  <MemberFilterProvider>
  <FantasieFilterProvider>
  <MemberProvider>
  <FantasieProvider>
  <InboxProvider>
  <TagsProvider>
  <UserProvider>
  <App />
  </UserProvider>
  </TagsProvider>
  </InboxProvider>
  </FantasieProvider>
  </MemberProvider>
  </FantasieFilterProvider>
  </MemberFilterProvider>
  </WebsocketProvider>
  </Router>
), document.getElementById('content'));
/*
history.listen((location) => {
  if(localStorage.getItem("disclaimer")==="true")
  window.gtag('config', 'UA-81359783-1', {'page_path':location.pathname});
});
*/
serviceWorker.register()