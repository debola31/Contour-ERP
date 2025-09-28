'use client'

import { useState } from 'react';
import { InventoryItem } from '../../types';
import { mockData } from '../../data/mockData';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockData.inventory);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [showQuantityModal, setShowQuantityModal] = useState<InventoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'partId' | 'description' | 'quantity' | 'price'>('partId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredInventory = inventory.filter(item =>
    item.partId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    const modifier = sortOrder === 'asc' ? 1 : -1;

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * modifier;
    }
    return ((aVal as number) - (bVal as number)) * modifier;
  });

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleQuantityUpdate = (itemId: string, newQuantity: number, reason: string) => {
    setInventory(inventory.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
    setShowQuantityModal(null);
  };

  const handleEditItem = (updatedItem: InventoryItem) => {
    setInventory(inventory.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
    setEditingItem(null);
  };

  const getSortIcon = (field: typeof sortBy) => {
    if (sortBy !== field) return '↕';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity < item.minimumUnitOfConsumption * 5) return 'critical';
    if (item.quantity < item.minimumUnitOfConsumption * 10) return 'low';
    return 'normal';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <div className="text-sm text-gray-500">
          {inventory.length} items • {inventory.filter(item => getStockStatus(item) === 'critical').length} critical stock
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search inventory by part ID, description, or source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('partId')}
                >
                  Part ID {getSortIcon('partId')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('description')}
                >
                  Description {getSortIcon('description')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit/Min Consumption
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('quantity')}
                >
                  Quantity {getSortIcon('quantity')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('price')}
                >
                  Price {getSortIcon('price')}
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
              {sortedInventory.map((item) => {
                const stockStatus = getStockStatus(item);
                return (
                  <tr key={item.id} className={`hover:bg-gray-50 ${
                    stockStatus === 'critical' ? 'bg-red-50' :
                    stockStatus === 'low' ? 'bg-yellow-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.partId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.unitOfMeasurement} / {item.minimumUnitOfConsumption}
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
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setShowQuantityModal(item)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Update Qty
                      </button>
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showQuantityModal && (
        <QuantityUpdateModal
          item={showQuantityModal}
          onUpdate={handleQuantityUpdate}
          onCancel={() => setShowQuantityModal(null)}
        />
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onSave={handleEditItem}
          onCancel={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

interface QuantityUpdateModalProps {
  item: InventoryItem;
  onUpdate: (itemId: string, newQuantity: number, reason: string) => void;
  onCancel: () => void;
}

function QuantityUpdateModal({ item, onUpdate, onCancel }: QuantityUpdateModalProps) {
  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const [reason, setReason] = useState('');
  const [operation, setOperation] = useState<'set' | 'add' | 'subtract'>('set');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please provide a reason for the quantity change');
      return;
    }

    let finalQuantity = newQuantity;
    if (operation === 'add') {
      finalQuantity = item.quantity + newQuantity;
    } else if (operation === 'subtract') {
      finalQuantity = Math.max(0, item.quantity - newQuantity);
    }

    if (confirm(`Update quantity from ${item.quantity} to ${finalQuantity}?`)) {
      onUpdate(item.id, finalQuantity, reason);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Update Quantity - {item.partId}
        </h2>
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-sm font-medium">Current: {item.quantity} {item.unitOfMeasurement}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="set">Set to</option>
              <option value="add">Add</option>
              <option value="subtract">Subtract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {operation === 'set' ? 'New Quantity' : 'Amount'}
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={newQuantity}
              onChange={(e) => setNewQuantity(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Change
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Stock received, Used in production, Damaged goods..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              required
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
              Update Quantity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface EditItemModalProps {
  item: InventoryItem;
  onSave: (item: InventoryItem) => void;
  onCancel: () => void;
}

function EditItemModal({ item, onSave, onCancel }: EditItemModalProps) {
  const [formData, setFormData] = useState({
    partId: item.partId,
    description: item.description,
    unitOfMeasurement: item.unitOfMeasurement,
    minimumUnitOfConsumption: item.minimumUnitOfConsumption,
    price: item.price,
    source: item.source
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...item, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Edit Item - {item.partId}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Part ID
            </label>
            <input
              type="text"
              value={formData.partId}
              onChange={(e) => setFormData({ ...formData, partId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit of Measurement
              </label>
              <input
                type="text"
                value={formData.unitOfMeasurement}
                onChange={(e) => setFormData({ ...formData, unitOfMeasurement: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Consumption
              </label>
              <input
                type="number"
                min="1"
                value={formData.minimumUnitOfConsumption}
                onChange={(e) => setFormData({ ...formData, minimumUnitOfConsumption: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}