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
import { I18n } from './I18n';
import { FormattedMessage } from 'react-intl';
import { LocaleSwitch } from './components/LocaleSwitch';

const App: React.FC = () => {
  return (
    <Provider store={createReduxStore()}>
      <I18n>
        <Router>
          <div className="wrapper">
            <header>
              <nav>
                <Link to="/">
                  <FormattedMessage id="welcomeHeadline" />
                </Link>
                <NavLink to="/test" activeClassName="active">
                  <FormattedMessage id="imagesHeadline" />
                </NavLink>
                <LocaleSwitch />
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
                  <h1>
                    <FormattedMessage id="welcomeHeadline" />
                  </h1>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </I18n>
    </Provider>
  );
};

export default App;
