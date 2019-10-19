import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

import { getLocaleMessages } from './locales';
import { State } from './store/store';

interface StateProps {
  locale: string;
}

class I18nView extends React.PureComponent<StateProps> {
  render() {
    const { locale } = this.props;
    return (
      <IntlProvider locale={locale} messages={getLocaleMessages(locale)}>
        {this.props.children}
      </IntlProvider>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  return {
    locale: state.locale.value,
  };
}

export const I18n = connect(mapStateToProps)(I18nView);
