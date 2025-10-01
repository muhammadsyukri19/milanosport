import React from 'react';
import { Star } from 'lucide-react';

interface FieldCardProps {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  rating: number;
  isAvailable: boolean;
  openHour: string;
  closeHour: string;
  onClick: () => void;
}

export const FieldCard: React.FC<FieldCardProps> = ({
  id,
  name,
  type,
  image,
  price,
  rating,
  isAvailable,
  openHour,
  closeHour,
  onClick,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={`field-card glass-panel ${!isAvailable ? 'unavailable' : ''}`}
      onClick={onClick}
      data-testid={`field-card-${id}`}
    >
      <div className="field-image">
        <img src={image} alt={name} />
        {!isAvailable && <div className="unavailable-overlay">Tidak Tersedia</div>}
      </div>
      <div className="field-content">
        <div className="field-type">{type}</div>
        <h3 className="field-name">{name}</h3>
        <div className="field-rating">
          <Star className="star-icon" size={16} />
          <span>{rating.toFixed(1)}</span>
        </div>
        <div className="field-hours">
          {openHour} - {closeHour} WIB
        </div>
        <div className="field-price">
          {formatPrice(price)}
          <span className="price-suffix">/jam</span>
        </div>
      </div>
    </div>
  );
};
