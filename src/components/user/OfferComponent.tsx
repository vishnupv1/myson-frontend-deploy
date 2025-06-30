import React from 'react';
import offer1 from '../../assets/images/offer1.jpg';
import offer2 from '../../assets/images/offer2.jpg';

const OfferComponent: React.FC = () => {
  return (
    <div className="offer-component">
      <div className="offer-under">
        <div
          style={{
            backgroundImage: `url(${offer1})`,
            height: 400,
            flex: 1,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 5,
          }}
        ></div>
        <div
          style={{
            backgroundImage: `url(${offer2})`,
            height: 400,
            flex: 1,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 5,
          }}
        ></div>
      </div>
      {/* <div className="offer-zone">
        <div
          className="main-offer"
          style={{
            backgroundImage: `url(https://hafeleappliances.com/images/TempBlog/banner-dishwasher.jpg)`,
          }}
        ></div>
      </div> */}
    </div>
  );
};

export default OfferComponent;
