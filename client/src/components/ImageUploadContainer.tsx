import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { uploadImage, fetchImages } from '../store/actions/ImagesActions';

interface State {
  image: File | null;
}

interface Props {
  uploadImage(image: File): Promise<void>;
  fetchImages(): Promise<void>;
}

class ImageUploadContainerView extends React.PureComponent<Props, State> {
  state: State = { image: null };
  triggerUpload = (event: React.MouseEvent) => {
    if (this.state.image) {
      this.props
        .uploadImage(this.state.image)
        .then(() => this.props.fetchImages());
    }
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: event.target.files[0],
      });
    }
  };
  render() {
    return (
      <>
        <h2>
          <FormattedMessage id="imagesUploadLabel" />
        </h2>
        <input accept="image/*" type="file" onChange={this.handleChange} />
        <button onClick={this.triggerUpload} disabled={!this.state.image}>
          <FormattedMessage id="imagesUploadLabel" />
        </button>
      </>
    );
  }
}

function mapStateToProps(state: State) {
  return {};
}

const mapDispatchToProps = {
  uploadImage,
  fetchImages,
};

export const ImageUploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageUploadContainerView);
