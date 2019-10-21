import React from 'react';

import './select.css';

export interface Item {
  value: string;
  label: string;
}

export interface Props {
  items: Item[];
  onChange(value: string): void;
}

export class Select extends React.PureComponent<Props> {
  handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(event.target.value);
  };

  renderOption(item: Item) {
    return (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    );
  }

  render() {
    return (
      <select onChange={this.handleChange}>
        {this.props.items.map(this.renderOption)}
      </select>
    );
  }
}
