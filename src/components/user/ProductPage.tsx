/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import './ProductPage.css';
import ProductImageZoom from './ProductImageZoom';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import { useParams } from 'react-router-dom';
import IceMakerProducts from '../../assets/IceMaker.json';

interface Product {
  id: number;
  name: string;
  model: string;
  ice_production_kg_per_24h?: number;
  bin_capacity_kg?: number;
  dimensions_mm: string | { external: string; internal: string };
  power_supply?: string;
  refrigerant?: string;
  weight_kg?: number;
  image: string; // Changed to string as per IceMaker.json
  description?: string;
  capacity_liters?: { effective: number; vaccine: number; max_water_pack_freezing?: number };
  current_amp?: number;
  temperature_controller?: string;
  operating_condition?: string;
  safe_temperature_range?: string;
  min_hold_over_time?: string;
  energy_consumption_kwh_per_day?: number;
  no_of_baskets?: number;
  insulation?: string;
  gross_volume_liters?: number;
  no_of_shelves?: number;
  options?: string;
  net_volume_liters?: number;
  ambient_condition?: string;
  shelves?: number;
  product_visibility_sqm?: number;
  features?: string[];
  truck_loading?: { truck_size_ft: number; units_per_truck: number };
  images?: string[];
  availability?: string;
  // Removed specifications?: { word: string }[]; as it's not directly from JSON
}

const ProductPage = () => {
  const { id } = useParams();
  // const navigate = useNavigate(); // Removed as it's not used
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>(''); // Initialize with empty string
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (id) {
      const foundProduct = IceMakerProducts.find((p) => p.id.toString() === id);
      if (foundProduct) {
        setProduct(foundProduct as Product);
        setMainImage(`/product_images/${foundProduct.image}`); // Modified line
      } else {
        setProduct(null);
        setMainImage(''); // Reset to empty string if product not found
      }
    }
    setLoading(false);
  }, [id]);

  if (loading || !product) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <HeaderComponent />
      <div className="product-page">
        <div className="product-image-container">
          <div className="product-main-image">
            <ProductImageZoom imageSrc={mainImage} />
          </div>
          <div className="product-preview-images">
            {/* Render preview images if available, using product.image as the only image for now */}
            {product.image && (
              <img
                src={`/product_images/${product.image}`}
                alt={product.name}
                className="preview-image"
                onClick={() => setMainImage(`/product_images/${product.image}`)} // Modified line
              />
            )}
            {/* If you later add an 'images' array to IceMaker.json, you can uncomment this */}
            {/*
            {product.images?.map((img: string, index: number) => (
              <img
                key={index}
                src={`/assets/product_images/${img}`}
                alt={product.name}
                className="preview-image"
                onClick={() => setMainImage(img)}
              />
            ))}
            */}
          </div>
        </div>
        <div className="product-details">
          <span className="product-name">{product.name}</span>
          <h6 className="product-availability">
            Availability: <span className="availability-status">{product.availability}</span>
          </h6>
          <div className="product-actions">
            <a
              href="https://wa.me/+919447458735?text=Hi, I would like to enquire about your services."
              className="enquire-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire Now
            </a>
          </div>
          <div className="product-description">
            {/* Dynamically render product specifications */}
            <ul className="product-specifications-list">
              {Object.entries(product).map(([key, value]) => {
                // Exclude non-specification fields
                if (['id', 'name', 'model', 'image', 'description', 'availability', 'features', 'truck_loading', 'specifications'].includes(key)) {
                  return null;
                }

                let displayValue = value;
                if (typeof value === 'object' && value !== null) {
                  if (key === 'dimensions_mm' && (value as any).external && (value as any).internal) {
                    displayValue = `External: ${(value as any).external}, Internal: ${(value as any).internal}`;
                  } else if (key === 'capacity_liters') {
                    displayValue = Object.entries(value).map(([subKey, subValue]) => `${subKey.replace(/_/g, ' ')}: ${subValue}`).join(', ');
                  } else {
                    // For other nested objects, stringify or format as needed
                    displayValue = JSON.stringify(value);
                  }
                }

                // Format key for display (e.g., ice_production_kg_per_24h -> Ice Production (kg/24h))
                const formattedKey = key
                  .replace(/_/g, ' ')
                  .replace(/kg per 24h/i, '(kg/24h)')
                  .replace(/kg/i, '(kg)')
                  .replace(/mm/i, '(mm)')
                  .replace(/liters/i, '(liters)')
                  .replace(/kwh per day/i, '(kWh/day)')
                  .replace(/amp/i, '(Amp)')
                  .replace(/sqm/i, '(sqm)')
                  .replace(/hrs/i, '(hrs)')
                  .replace(/no of/i, 'Number of ')
                  .replace(/min hold over time/i, 'Min. Hold Over Time')
                  .replace(/ambient condition/i, 'Ambient Condition')
                  .replace(/safe temperature range/i, 'Safe Temperature Range')
                  .replace(/operating condition/i, 'Operating Condition')
                  .replace(/temperature controller/i, 'Temperature Controller')
                  .replace(/power supply/i, 'Power Supply')
                  .replace(/product visibility/i, 'Product Visibility')
                  .replace(/gross volume/i, 'Gross Volume')
                  .replace(/net volume/i, 'Net Volume')
                  .replace(/bin capacity/i, 'Bin Capacity')
                  .replace(/ice production/i, 'Ice Production')
                  .replace(/current/i, 'Current')
                  .replace(/energy consumption/i, 'Energy Consumption')
                  .replace(/refrigerant/i, 'Refrigerant')
                  .replace(/weight/i, 'Weight')
                  .replace(/insulation/i, 'Insulation')
                  .replace(/options/i, 'Options')
                  .replace(/shelves/i, 'Shelves')
                  .replace(/dimensions/i, 'Dimensions')
                  .replace(/model/i, 'Model')
                  .replace(/name/i, 'Name')
                  .replace(/description/i, 'Description')
                  .replace(/image/i, 'Image')
                  .replace(/id/i, 'ID')
                  .replace(/availability/i, 'Availability')
                  .replace(/features/i, 'Features')
                  .replace(/truck loading/i, 'Truck Loading')
                  .replace(/images/i, 'Images')
                  .replace(/specifications/i, 'Specifications')
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');

                return (
                  <li key={key}>
                    <strong>{formattedKey}:</strong> {displayValue}
                  </li>
                );
              })}
              {product.features && product.features.length > 0 && (
                <li>
                  <strong>Features:</strong>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </li>
              )}
              {product.truck_loading && (
                <li>
                  <strong>Truck Loading:</strong>
                  <ul>
                    <li>Truck Size (ft): {product.truck_loading.truck_size_ft}</li>
                    <li>Units per Truck: {product.truck_loading.units_per_truck}</li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
          <div className="more-details">
            <p className="delivery-info">
              Delivery: <span>Within 2 days.</span>
            </p>
            {/* Removed the static specifications table as it's replaced by dynamic list */}
            {/*
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <h3 className="specifications-title">Specifications</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.specifications && product.specifications.map((item: any, index: any) => (
                    <tr key={index}>
                      <td className="spec-key">{item.word}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            */}
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default ProductPage;
