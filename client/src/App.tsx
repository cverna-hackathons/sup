import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import { ImagesListContainer } from './components/ImagesListContainer';
import { createReduxStore } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={createReduxStore()}>
      <Router>
        <div className="wrapper">
          <header>
            <nav>
              <Link to="/">Home</Link>
              <NavLink to="/test" activeClassName="active">
                Test
              </NavLink>
            </nav>
          </header>
          <div className="content">
            {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/test">
                <ImagesListContainer />
              </Route>
              <Route path="/" exact>
                <h1>Welcome!</h1>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
