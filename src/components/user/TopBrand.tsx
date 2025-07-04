import React, { useEffect, useRef } from 'react';
import './CardComponent.css'; // Import the external CSS file

const images: string[] = [
  'https://vtlogo.com/wp-content/uploads/2021/01/astoria-vector-logo-small.png',
  'https://getlogo.net/wp-content/uploads/2021/08/hamilton-beach-logo-vector.png',
  'https://mfk.co.id/wp-content/uploads/2020/12/winterhalter-logo.png',
  'https://www.pi-india.com/uploaded_files/cf66d20b8daffd.jpg',
  'https://www.rahatindivanam.com/wp-content/uploads/2022/06/Western-Ref..png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzF5JruCxKftxjAgWMkHpjCqtm80UgfFdy1PXbvS0DGQQEu4_sDlCwfCKX96QbjajkPW4&usqp=CAU',
  'https://info.welbilt.com/hs-fs/hubfs/RGB_CRE_Grey-1.png?width=257&height=77&name=RGB_CRE_Grey-1.png',
  'https://www.convotherm.com/images/shared/logos/Convotherm_Color.svg',
  'https://www.lincolnfp.com/images/shared/logos/Lincoln_Black.svg',
  'https://www.merrychef.com/images/shared/logos/Merrychef_PMS186C.svg',
];

const TopBrands: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const totalWidth = content.offsetWidth;
    let currentPosition = 0;
    let animationFrameId: number;

    const scroll = () => {
      currentPosition += 1;
      if (currentPosition >= totalWidth / 2) {
        currentPosition = 0;
      }
      container.scrollLeft = currentPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="main-container">
      {/* <h5
        style={{
          fontWeight: 600,
          textAlign: 'left',
          fontFamily: 'sans-serif',
        }}
      >
        Shop from Top Brands
      </h5> */}

      <div
        ref={containerRef}
        className="card-container top-container"
        style={{ overflowX: 'hidden', whiteSpace: 'nowrap', padding: '2px' }}
      >
        <div ref={contentRef} style={{ display: 'inline-block' }}>
          {images.concat(images).map((imageSrc, index) => (
            <div
              className="top-brand-card"
              key={index}
              style={{
                textAlign: 'center',
                margin: '0 10px',
                display: 'inline-block',
                verticalAlign: 'top',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              <img
                src={imageSrc}
                className="top-brand-image"
                alt={`brand-${index % images.length}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                  marginBottom: '10px',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBrands;
