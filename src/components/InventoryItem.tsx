
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
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-slate-800">{name}</h3>
          <p className="text-sm text-slate-600">{category}</p>
        </div>
        <span className="text-lg font-semibold text-green-600">${price}</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-slate-600">Stock</span>
            <span className={`text-sm font-medium ${isLowStock ? 'text-red-600' : 'text-slate-800'}`}>
              {stock} unidades
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                isLowStock ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${stockPercentage}%` }}
            ></div>
          </div>
          {isLowStock && (
            <p className="text-xs text-red-600 mt-1">⚠️ Stock bajo (mín: {minStock})</p>
          )}
        </div>
        
        <div className="text-sm">
          <span className="text-slate-600">Vence: </span>
          <span className="text-slate-800">{expiryDate}</span>
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
