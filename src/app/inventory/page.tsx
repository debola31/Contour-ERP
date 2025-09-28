'use client'

import { useState } from 'react';
import { InventoryItem } from '../../types';
import { mockData } from '../../data/mockData';

const ITEMS_PER_PAGE = 10;

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockData.inventory);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory.filter(item =>
    item.partId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredInventory.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInventory = filteredInventory.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      setInventory(inventory.filter(i => i.id !== itemId));
    }
  };

  const handleAddItem = (itemData: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `inv-${String(inventory.length + 1).padStart(3, '0')}`
    };
    setInventory([...inventory, newItem]);
    setShowAddForm(false);
  };

  const handleEditItem = (itemData: InventoryItem) => {
    setInventory(inventory.map(i => i.id === itemData.id ? itemData : i));
    setEditingItem(null);
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity < item.minimumUnitOfConsumption * 5) return 'critical';
    if (item.quantity < item.minimumUnitOfConsumption * 10) return 'low';
    return 'normal';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Inventory</h1>
          <p className="text-slate-600">Manage your inventory and stock levels</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-600 transition-all shadow-lg flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Add Item
        </button>
      </div>

      <div className="glass-card p-6 border border-slate-200/20">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search inventory by part ID, description, or source..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Part ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedInventory.map((item) => {
                const stockStatus = getStockStatus(item);
                return (
                  <tr key={item.id} className={`hover:bg-gray-50 ${
                    stockStatus === 'critical' ? 'bg-red-50' :
                    stockStatus === 'low' ? 'bg-yellow-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.partId}</div>
                        <div className="text-sm text-gray-500">Min: {item.minimumUnitOfConsumption}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${
                          stockStatus === 'critical' ? 'text-red-600' :
                          stockStatus === 'low' ? 'text-yellow-600' :
                          'text-gray-900'
                        }`}>
                          {item.quantity}
                        </span>
                        {stockStatus !== 'normal' && (
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                            stockStatus === 'critical' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {stockStatus}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.unitOfMeasurement}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredInventory.length)} of{' '}
            {filteredInventory.length} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {(showAddForm || editingItem) && (
        <InventoryForm
          item={editingItem}
          onSave={editingItem ? handleEditItem : handleAddItem}
          onCancel={() => {
            setShowAddForm(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

interface InventoryFormProps {
  item: InventoryItem | null;
  onSave: (item: any) => void;
  onCancel: () => void;
}

function InventoryForm({ item, onSave, onCancel }: InventoryFormProps) {
  const [formData, setFormData] = useState({
    partId: item?.partId || '',
    description: item?.description || '',
    unitOfMeasurement: item?.unitOfMeasurement || '',
    minimumUnitOfConsumption: item?.minimumUnitOfConsumption || 1,
    quantity: item?.quantity || 0,
    price: item?.price || 0,
    source: item?.source || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onSave({ ...item, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {item ? 'Edit Inventory Item' : 'Add Inventory Item'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Part ID
            </label>
            <input
              type="text"
              required
              value={formData.partId}
              onChange={(e) => setFormData({ ...formData, partId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit of Measurement
              </label>
              <input
                type="text"
                required
                value={formData.unitOfMeasurement}
                onChange={(e) => setFormData({ ...formData, unitOfMeasurement: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Consumption
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.minimumUnitOfConsumption}
                onChange={(e) => setFormData({ ...formData, minimumUnitOfConsumption: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <input
              type="text"
              required
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {item ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}