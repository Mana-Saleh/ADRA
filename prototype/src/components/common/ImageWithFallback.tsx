import React, { useState } from 'react';
import fallback from '../../assets/icons/Saudi_Riyal_Symbol-1.png';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

const ImageWithFallback: React.FC<Props> = ({ src, alt, ...rest }) => {
  const [error, setError] = useState(false);
  return (
    <img
      src={error || !src ? fallback : src}
      onError={() => setError(true)}
      alt={alt || 'Image'}
      {...rest}
    />
  );
};

export default ImageWithFallback;
