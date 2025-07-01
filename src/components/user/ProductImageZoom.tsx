import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type ProductImageZoomProps = {
  imageSrc: string;
};

const ProductImageZoom: React.FC<ProductImageZoomProps> = ({ imageSrc }) => {
  return (
    <div className="image-zoom-container">
      <Zoom
        // Removed overlayBgColorEnd and overlayBgColorStart as they are causing a TypeScript error
      >
        <img
          src={imageSrc}
          alt={imageSrc}
          className="preview-image"
        />
      </Zoom>
    </div>
  );
};

export default ProductImageZoom;
