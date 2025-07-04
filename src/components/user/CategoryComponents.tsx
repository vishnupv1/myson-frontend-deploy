import React, { useEffect, useState } from 'react';

interface Brand {
  _id: number;
  name: string;
  image: string;
}

const CategoryComponents: React.FC = () => {
  const [adminBrands, setAdminBrands] = useState<Brand[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    setAdminBrands(images);

    // Check screen size on mount
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 767);
      setIsSmallMobile(window.innerWidth <= 480);
    };

    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const images: Brand[] = [
    {
      image: 'https://lighthousefnb.com/wp-content/uploads/2024/08/WBM-1080-T.png',
      _id: 1,
      name: 'Western',
    },
    {
      image: 'https://www.hoshizaki-sea.com/wp-content/uploads/2024/11/4.-HW-320B-1.png',
      _id: 2,
      name: 'Hoshizaki',
    },
    {
      image: 'https://www.scotsice.com.au/_images/_dihr/RX101E.jpg',
      _id: 3,
      name: 'Dihr',
    },
    {
      image: 'https://www.pi-india.com/uploaded_files/ca424938a90417.png',
      _id: 4,
      name: 'Merrychef',
    },
    {
      image:
        'https://5.imimg.com/data5/IJ/IH/WD/SELLER-3836337/classeq-undercounter-dishwasher-for-pubs-1000x1000.jpg',
      _id: 5,
      name: 'Classeq',
    },
  ];

  const containerStyle: React.CSSProperties = {
    padding: isSmallMobile ? '15px' : '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: isSmallMobile ? '10px' : isMobile ? '15px' : '20px',
    gridTemplateColumns: isSmallMobile
      ? 'repeat(auto-fit, minmax(150px, 1fr))'
      : isMobile
        ? 'repeat(auto-fit, minmax(200px, 1fr))'
        : 'repeat(auto-fit, minmax(250px, 1fr))',
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
  };

  const cardContentStyle: React.CSSProperties = {
    padding: isSmallMobile ? '12px' : isMobile ? '15px' : '20px',
    textAlign: 'center' as const,
  };

  const imageStyle: React.CSSProperties = {
    width: isSmallMobile ? '60px' : isMobile ? '80px' : '100px',
    height: isSmallMobile ? '60px' : isMobile ? '80px' : '100px',
    objectFit: 'cover' as const,
    borderRadius: '8px',
    marginBottom: '12px',
  };

  const placeholderStyle: React.CSSProperties = {
    width: isSmallMobile ? '60px' : isMobile ? '80px' : '100px',
    height: isSmallMobile ? '60px' : isMobile ? '80px' : '100px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
    fontWeight: '600',
    color: '#666',
    fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '14px',
    textAlign: 'center' as const,
    padding: '8px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isSmallMobile ? '12px' : isMobile ? '14px' : '16px',
    fontWeight: '600',
    color: '#333',
    marginTop: '8px',
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        {adminBrands.map((item) => (
          <div key={item._id} style={cardStyle}>
            <div style={cardContentStyle}>
              {item.image ? (
                <img src={item.image} style={imageStyle} alt={`category-${item._id}`} />
              ) : (
                <div style={placeholderStyle}>{item.name}</div>
              )}
              <div style={titleStyle}>{item.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryComponents;
