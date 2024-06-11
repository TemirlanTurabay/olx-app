'use client'

import React, { useState, useEffect } from 'react';
import { useProducts as useItems } from './mutations/productsService';
import Link from 'next/link';

interface Item {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  images?: string[];
}

const LandingPage = () => {
  const { data: items = [], isLoading, error } = useItems();
  const [localItems, setLocalItems] = useState<Item[]>([]);
  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setLocalItems(parsedItems);
      console.log('Loaded items from localStorage:', parsedItems);
    } else {
      setLocalItems(items);
    }
  }, [items]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading items</div>;
  return (
    <div className="container mx-auto px-4">
      <div className="flex space-x-4 overflow-x-auto pb-4">
      </div>
      {items.length === 0 ? (
        <div>No items available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item: Item) => (
            <Link href={`/item/${item.id}`} key={item.id}>
              <div className="border p-4 rounded shadow">
                {item.images && item.images.length > 0 ? (
                  <img src={item.images[0]} alt={item.title} className="h-40 w-full object-cover mb-2" />
                ) : item.image ? (
                  <img src={item.image} alt={item.title} className="h-40 w-full object-cover mb-2" />
                ) : (
                  <div className="h-40 w-full bg-gray-200 mb-2 flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p>${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
