import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { State } from '../store/store';
import { fetchImages } from '../store/actions/ImagesActions';
import { Image } from '../store/reducers/ImagesReducer';

interface Props {
  images: Image[];
  fetchImages(): void;
}

class ImagesListContainerView extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchImages();
  }

  renderImage(image: Image) {
    return (
      <div key={image.id}>
        {image.id} - {image.src} - {image.fileName} - {image.type}
        <p>
          <img src={image.src} alt={`${image.id} - ${image.fileName}`} />
        </p>
      </div>
    );
  }
  render() {
    return (
      <>
        <h1>
          <FormattedMessage id="imagesHeadline" />
        </h1>
        {this.props.images.map(this.renderImage)}
      </>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    images: state.images.data,
  };
}

const mapDispatchToProps = {
  fetchImages,
};

export const ImagesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImagesListContainerView);
