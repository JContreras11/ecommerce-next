'use client';

import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: FC<ProductCardProps> = ({ product, className }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className={`relative rounded-2xl p-3 shadow-md ${className}`}>
      <div className="h-[250px] w-full overflow-hidden rounded-2xl">
        <Image
          src={product.image || ''}
          alt={product.title}
          width={300}
          height={300}
          className="size-full object-contain"
        />
      </div>
      <div className="mt-3 space-y-2">
        <h3 className="line-clamp-2 font-semibold">{product.title}</h3>
        <p className="text-sm text-neutral-500">{product.category}</p>
        <p className="line-clamp-2 text-xs text-neutral-600">
          {product.description}
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm">{product.rating.rate}</span>
          </div>
          <span className="text-xs text-neutral-500">
            ({product.rating.count} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-primary">${product.price}</p>
          <button
            onClick={() => addItem(product)}
            className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-white"
            type="button"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
