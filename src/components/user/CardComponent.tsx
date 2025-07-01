import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import products from '../../Constants/Products';
import './CardComponent.css';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import trendingProducts from 'Constants/trendingProducts';

export interface Product {
  _id: string;
  name: string;
  images: string[];
  description: [];
  price: string;
  specifications: [];
  brand: string;
}

export interface IceMakerProduct {
  id: number;
  name: string;
  model: string;
  image: string;
}

interface CardComponentProps {
  title: string;
  products?: (Product | IceMakerProduct)[]; // Allow both Product and IceMakerProduct types
  limit?: number; // Add limit prop
}

const CardComponent: React.FC<CardComponentProps> = ({ title, products: customProducts, limit }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const [displayProducts, setDisplayProducts] = useState<{ _id: string; name: string; images: string[] }[]>([]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (customProducts) {
      const transformedProducts = customProducts.map((p) => {
        if ('id' in p) { // Check if it's an IceMakerProduct
          const iceMaker = p as IceMakerProduct;
          return {
            _id: iceMaker.id.toString(),
            name: `${iceMaker.name} - ${iceMaker.model}`,
            images: [`/product_images/${iceMaker.image}`],
            description: [], // Placeholder
            price: '',       // Placeholder
            specifications: [], // Placeholder
            brand: '',       // Placeholder
          };
        } else {
          return p as Product; // It's already a Product type
        }
      });
      setDisplayProducts(limit ? transformedProducts.slice(0, limit) : transformedProducts); // Apply limit here
    } else if (title.toLowerCase() === 'trending products') {
      setDisplayProducts(limit ? trendingProducts.map(el => ({ ...el, _id: String(el._id) })).slice(0, limit) : trendingProducts.map(el => ({ ...el, _id: String(el._id) })));
    } else if (!hasFetchedData.current) {
      hasFetchedData.current = true;
      getProducts()
        .then((data: Product[]) => {
          if (data.length) {
            setDisplayProducts(limit ? data.map(el => ({ ...el, _id: String(el._id) })).slice(0, limit) : data.map(el => ({ ...el, _id: String(el._id) })));
          } else {
            setDisplayProducts(limit ? products.map(el => ({ ...el, _id: String(el._id) })).slice(0, limit) : products.map(el => ({ ...el, _id: String(el._id) })));
          }
        })
        .catch((error: unknown) => {
          console.error('Error fetching products:', error);
          setDisplayProducts(limit ? products.map(el => ({ ...el, _id: String(el._id) })).slice(0, limit) : products.map(el => ({ ...el, _id: String(el._id) })));
        });
    }
  }, [customProducts, title, limit]);

  const handleSelectProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="main-container">
      <h4
        style={{
          fontWeight: 600,
          textAlign: 'left',
          fontFamily: 'sans-serif',
        }}
      >
        {title}
      </h4>

      <div className="card-container">
        {displayProducts.map((el) => (
          <div className="card-wrapper" key={el._id}>
            <Card className="card">
              <Card.Img
                className="card-image img-fluid"
                variant="top"
                src={el.images[0]}
                alt={el.name}
              />
              <Card.Body className="card-body-content"> {/* Add a class for styling */}
                <Card.Title className="card-title">{el.name}</Card.Title>
                {/* The button will now be on a new line below the title */}
                <Button className="card-button" onClick={() => handleSelectProduct(el._id)}>
                  {isMobile ? 'ADD +' : 'ADD TO CART'}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;
