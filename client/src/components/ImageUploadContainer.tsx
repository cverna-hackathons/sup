import React from 'react';
import { connect } from 'react-redux';
import { uploadImage, fetchImages } from '../store/actions/ImagesActions';
import { FileInput } from '../design-system/components/file-input/FileInput';

interface Props {
  uploadImage(image: File): Promise<void>;
  fetchImages(): Promise<void>;
}

class ImageUploadContainerView extends React.PureComponent<Props> {
  triggerUpload = async (image: File) => {
      await this.props.uploadImage(image);
      await this.props.fetchImages();
  };

  render() {
    return (
      <>
        <FileInput
          onSelect={this.triggerUpload}
          primaryText="Drag and drop file"
          secondaryText="We will do some nice magic analysis on dropped picture, all data are anonymous and we will not provide them to third parties"
          inputText=" or choose a file"
          confirmBtnText="Confirm selection of "
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  uploadImage,
  fetchImages,
};

export const ImageUploadContainer = connect(
  null,
  mapDispatchToProps,
)(ImageUploadContainerView);
