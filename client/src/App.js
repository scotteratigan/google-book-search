import React from 'react';
import Books from './pages/Books';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Search from './pages/Search';
import ViewBook from './pages/ViewBook';
import Nav from './components/Nav';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <>
          <Nav />
          <Switch>
            <Route path='/' exact component={Books} />
            <Route path='/search' exact component={Search} />
            <Route path='/view/:id' component={ViewBook} />
            <Route path='/books' exact component={Books} />
            <Route path='/books/:id' component={Detail} />
            {/* <Route path='/books/:id' component={ViewBook} /> */}
            <Route component={NoMatch} />
          </Switch>
        </>
      </Router>
    </>
  );
}

export default App;
