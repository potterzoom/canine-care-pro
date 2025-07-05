
import React from 'react';

interface InventoryItemProps {
  name: string;
  category: string;
  stock: number;
  minStock: number;
  expiryDate: string;
  price: number;
}

const InventoryItem = ({ 
  name, 
  category, 
  stock, 
  minStock, 
  expiryDate, 
  price 
}: InventoryItemProps) => {
  const isLowStock = stock <= minStock;
  const stockPercentage = Math.min((stock / (minStock * 3)) * 100, 100);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{category}</p>
        </div>
        <span className="text-lg font-semibold text-gray-900">${price}</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Stock</span>
            <span className={`text-sm font-medium ${isLowStock ? 'text-black' : 'text-gray-800'}`}>
              {stock} unidades
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                isLowStock ? 'bg-black' : 'bg-gray-600'
              }`}
              style={{ width: `${stockPercentage}%` }}
            ></div>
          </div>
          {isLowStock && (
            <p className="text-xs text-black mt-1">⚠️ Stock bajo (mín: {minStock})</p>
          )}
        </div>
        
        <div className="text-sm">
          <span className="text-gray-600">Vence: </span>
          <span className="text-gray-900">{expiryDate}</span>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
