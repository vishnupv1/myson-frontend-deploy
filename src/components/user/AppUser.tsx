import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent';
import IceMakerDataRaw from '../../assets/IceMaker.json';
import { IceMakerProduct } from './CardComponent'; // Corrected import path
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

// Removed unused interface CardComponentProps

const AppUser: React.FC = () => {
  const [iceMakerData, setIceMakerData] = useState<IceMakerProduct[]>([]);

  // Fisher-Yates (Knuth) shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    const shuffledData = shuffleArray(IceMakerDataRaw as IceMakerProduct[]);
    setIceMakerData(shuffledData);
  }, []);

  return (
    <div className="App">
      <FormComponent />
      <HeaderComponent />
      <CategoryComponents />
      <TopBrands />
      <div className="video-row-container">
        <BannerSlider />
      </div>
      <CardComponent title="Best Sellers" products={iceMakerData} />
      <CardComponent title="Trending Products" products={iceMakerData} />
      <OfferComponent />
      <CardComponent title="New Arrival" products={iceMakerData} />
      <CardComponent title="Recently Visited" products={iceMakerData} />
      <div className="testimonial-video-section">
        <Testimonial />
        <YouTubeShort />
      </div>
      <Footer />
    </div>
  );
};

export default AppUser;