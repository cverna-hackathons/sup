import React from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import './design-system/styles/global.scss';
import './App.css';
import { ImagesListContainer } from './components/ImagesListContainer';
import { ImageUploadContainer } from './components/ImageUploadContainer';
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
              <Link to="/" className="brand-link">
                SUP
              </Link>
              <nav>
                <NavLink to="/about-us" activeClassName="active">
                  <FormattedMessage id="aboutUsHeadline" />
                </NavLink>
                <LocaleSwitch />
              </nav>
            </header>
            <div className="content">
              {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/about-us">
                  <h1>
                    <FormattedMessage id="aboutUsHeadline" />
                  </h1>
                </Route>
                <Route path="/" exact>
                  <ImageUploadContainer />
                  <ImagesListContainer />
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
