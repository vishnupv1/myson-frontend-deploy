import React, { useEffect, useState } from 'react';

interface Brand {
  _id: number;
  name: string;
  image: string;
}

const CategoryComponents: React.FC = () => {
  const [adminBrands, setAdminBrands] = useState<Brand[]>([]);

  useEffect(() => {
    setAdminBrands(images);
  }, []);

  const images: Brand[] = [
    {
      image: 'https://dms.mydukaan.io/original/webp/media/c74f22ef-eaa2-404b-832c-7d43fc0c8d86.gif',
      _id: 1,
      name: 'Offer Zone',
    },
    {
      image: 'https://lighthousefnb.com/wp-content/uploads/2024/08/WBM-1080-T.png',
      _id: 2,
      name: 'Western',
    },
    {
      image: 'https://www.hoshizaki-sea.com/wp-content/uploads/2024/11/4.-HW-320B-1.png',
      _id: 3,
      name: 'Hoshizaki',
    },
    {
      image: 'https://www.scotsice.com.au/_images/_dihr/RX101E.jpg',
      _id: 4,
      name: 'Dihr',
    },
    {
      image: 'https://www.pi-india.com/uploaded_files/ca424938a90417.png',
      _id: 5,
      name: 'Merrychef',
    },
    {
      image:
        'https://5.imimg.com/data5/IJ/IH/WD/SELLER-3836337/classeq-undercounter-dishwasher-for-pubs-1000x1000.jpg',
      _id: 6,
      name: 'Classeq',
    },
  ];

  return (
    <div className="category-top">
      {adminBrands.map((item) => (
        <div
          key={item._id}
          style={{ textAlign: 'center', margin: '0 10px', cursor: 'pointer' }}
        >
          {item.image ? (
            <img
              src={item.image}
              className="img-fluid category-image"
              alt={`category-${item._id}`}
              style={{ width: '80px', height: '80px' }}
            />
          ) : (
            <div
              className="img-fluid category-image"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                color: '#333',
                fontSize: '14px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                padding: '8px',
              }}
            >
              {item.name}
            </div>
          )}
          {item.image && (
            <div
              className="black-text category-text"
              style={{ marginTop: '5px', color: 'var(--black-12)' }}
            >
              {item.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryComponents;
