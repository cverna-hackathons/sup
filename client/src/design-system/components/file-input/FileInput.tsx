import React from 'react';
import './FileInput.scss';

interface Props {
  primaryText: string;
  secondaryText: string;
  inputText: string;
  confirmBtnText: string;
  onSelect(file: File): void;
}

interface State {
  file?: File;
}

export class FileInput extends React.PureComponent<Props, State> {
  state: State = {};

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        file: event.target.files[0],
      });
    }
  };

  handleDrag = (event: React.DragEvent<HTMLElement>) => {
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      this.setState({
        file: event.dataTransfer.files[0],
      });
    }
    event.preventDefault();
  };

  handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  handleConfirmation = () => {
    if (!this.state.file) {
      return;
    }
    this.props.onSelect(this.state.file);
    this.setState({
      file: undefined,
    });
  };

  renderConfirmation() {
    if (!this.state.file) {
      return null;
    }

    return (
      <button onClick={this.handleConfirmation}>
        {this.props.confirmBtnText} {this.state.file.name}
      </button>
    );
  }

  render() {
    return (
      <div
        className="file-input-wrapper"
        onDrop={this.handleDrag}
        onDragOver={this.handleDragOver}
      >
        <span>
          <strong>{this.props.primaryText}</strong>
          <label htmlFor="fileInput">{this.props.inputText}</label>
        </span>
        <p>{this.props.secondaryText}</p>
        {this.renderConfirmation()}
        <input
          id="fileInput"
          accept="image/*"
          type="file"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
