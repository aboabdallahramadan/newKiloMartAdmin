import React from 'react';
import { ProductOffer } from '@/types/productOffer';
import Image from 'next/image';

interface ProductCardProps {
  product: ProductOffer;
  onShowDetails: (product: ProductOffer) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowDetails }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm flex flex-col justify-between">
      <img src={`${process.env.NEXT_PUBLIC_API_URL_MAIN}/${product.productImageUrl}`} alt={product.productName} className="w-full h-32 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{product.productName}</h3>
      <p>Price: <span className="text-green-600 dark:text-green-300">{product.productOfferPrice} RS</span></p>
      <p>Quantity: {product.productOfferQuantity}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => onShowDetails(product)}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;