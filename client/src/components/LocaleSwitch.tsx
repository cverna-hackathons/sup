import React from 'react';
import { connect } from 'react-redux';

import { changeLocale } from '../store/actions/LocaleActions';
import { Select } from '../design-system/components/select/Select';

interface DispatchProps {
  changeLocale(newLocale: string): void;
}

const ITEMS = [
  {
    value: 'en',
    label: 'EN',
  },
  {
    value: 'sk',
    label: 'SK',
  },
];

class LocaleSwitchView extends React.PureComponent<DispatchProps> {
  render() {
    return <Select items={ITEMS} onChange={this.props.changeLocale} />;
  }
}

const mapDispatchToProps = {
  changeLocale,
};

export const LocaleSwitch = connect(
  null,
  mapDispatchToProps,
)(LocaleSwitchView);
