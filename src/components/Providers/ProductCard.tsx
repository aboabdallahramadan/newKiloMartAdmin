import React from 'react';
import { ProductOffer } from '@/types/productOffer';

interface ProductCardProps {
  product: ProductOffer;
  onShowDetails: (product: ProductOffer) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowDetails }) => {
  return (
    <div className="bg-white dark:bg-gray-dark rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={`${product.productImageUrl}`} 
          alt={product.productName} 
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <span className="absolute top-2 right-2 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
          {product.productOfferOffPercentage}% OFF
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-dark dark:text-white mb-2">{product.productName}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
            <span className="text-lg font-semibold text-green-600 dark:text-green-400">{product.productOfferPrice} RS</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Quantity:</span>
            <span className="text-base font-medium text-dark dark:text-white">{product.productOfferQuantity} units</span>
          </div>
        </div>

        <button
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300"
          onClick={() => onShowDetails(product)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
