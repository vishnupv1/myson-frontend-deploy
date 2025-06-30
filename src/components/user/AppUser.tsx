import React from 'react';
import CardComponent from './CardComponent';
import HeaderComponent from './HeaderComponent';
import Footer from './FooterComponent';
import FormComponent from './FormComponent';
import TopBrands from './TopBrand';
import CategoryComponents from './CategoryComponents';
import BannerSlider from './BannerSlider';
import Testimonial from './TestimonialComponent';
import OfferComponent from './OfferComponent';
import YouTubeShort from './YoutubeShort';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AppUser.css';

const UserApp: React.FC = () => {
  return (
    <div className="App">
      <FormComponent />
      <HeaderComponent />
      <CategoryComponents />
      <TopBrands />
      <div className="video-row-container">
        <BannerSlider />
      </div>
      <CardComponent title="Best Sellers" />
      <CardComponent title="Trending Products" />
      <OfferComponent />
      <CardComponent title="New Arrival" />
      <CardComponent title="Recently Visited" />
      <div className="testimonial-video-section">
        <Testimonial />
        <YouTubeShort />
      </div>
      <Footer />
    </div>
  );
};

export default UserApp;
