import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Layout from './components/Layout';
import AddData from './components/AddData';
import Landing from './components/Landing';
import Data from './components/Data';
import Details from './components/Details';

render(
<MuiThemeProvider>

  <div>
    <div id='background'></div>
    <div id='content'>
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Landing} />
          <Route path='/adddata' component={AddData} />
          <Route path='/viewdata' component={Data} />
          <Route path='/details' component={Details} />
        </Route>
      </Router>
    </div>
  </div>
</MuiThemeProvider>,
  document.getElementById('root')
);
