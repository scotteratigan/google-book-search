import React from 'react';
import Books from './pages/Books';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <>
          <Nav />
          <Switch>
            <Route path='/' exact component={Books} />
            <Route path='/books' exact component={Books} />
            <Route path='/books/:id' component={Detail} />
            <Route component={NoMatch} />
          </Switch>
        </>
      </Router>
    </div>
  );
}

export default App;
