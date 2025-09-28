'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { WorkOrder, Customer, Station, InventoryItem, WorkOrderTemplate } from '../../types';
import { mockData } from '../../data/mockData';

export default function WorkOrderDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workOrderId = searchParams?.get('id');

  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
  const [customers] = useState<Customer[]>(mockData.customers);
  const [stations] = useState<Station[]>(mockData.stations);
  const [inventory] = useState<InventoryItem[]>(mockData.inventory);
  const [templates] = useState<WorkOrderTemplate[]>(mockData.workOrderTemplates);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const wo = mockData.workOrders.find(w => w.id === workOrderId);
    if (wo) {
      setWorkOrder(wo);
    } else {
      router.push('/work-orders');
    }
  }, [workOrderId, router]);

  if (!workOrder) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const customer = customers.find(c => c.id === workOrder.customerId);
  const template = templates.find(t => t.id === workOrder.workOrderTemplateId);
  const currentStation = stations.find(s => s.id === workOrder.currentStationId);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'complete': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPartDescription = (partId: string) => {
    return inventory.find(item => item.partId === partId)?.description || 'Unknown Part';
  };

  const getStationName = (stationId: string) => {
    return stations.find(s => s.id === stationId)?.name || 'Unknown Station';
  };

  const handleSave = (updatedWorkOrder: WorkOrder) => {
    setWorkOrder(updatedWorkOrder);
    setIsEditing(false);
  };

  const shouldShowField = (field: string) => {
    if (workOrder.stage === 'complete') {
      return !['currentStatus', 'currentStationId', 'deliveryDate'].includes(field);
    }
    if (workOrder.stage === 'in_progress') {
      return field !== 'deliveryDate';
    }
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Work Order {workOrder.id}</h1>
          <div className="flex items-center mt-2 space-x-4">
            <span className={`px-3 py-1 text-sm rounded-full ${getStageColor(workOrder.stage)}`}>
              {workOrder.stage.replace('_', ' ')}
            </span>
            <span className="text-sm text-gray-500">
              Created: {workOrder.dateCreated}
            </span>
          </div>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Cancel Edit' : 'Edit'}
          </button>
          <button
            onClick={() => router.push('/work-orders')}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to List
          </button>
        </div>
      </div>

      {isEditing ? (
        <EditWorkOrderForm
          workOrder={workOrder}
          customers={customers}
          stations={stations}
          templates={templates}
          inventory={inventory}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Work Order ID:</span>
                  <span className="text-sm text-gray-900">{workOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Date Created:</span>
                  <span className="text-sm text-gray-900">{workOrder.dateCreated}</span>
                </div>
                {workOrder.dateFinished && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Date Finished:</span>
                    <span className="text-sm text-gray-900">{workOrder.dateFinished}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Required By:</span>
                  <span className="text-sm text-gray-900">{workOrder.requiredBy}</span>
                </div>
                {workOrder.startedOn && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Started On:</span>
                    <span className="text-sm text-gray-900">{workOrder.startedOn}</span>
                  </div>
                )}
                {shouldShowField('deliveryDate') && workOrder.deliveryDate && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Delivery Date:</span>
                    <span className="text-sm text-gray-900">{workOrder.deliveryDate}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Salesperson:</span>
                  <span className="text-sm text-gray-900">{workOrder.salesperson}</span>
                </div>
                {shouldShowField('currentStatus') && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Current Status:</span>
                    <span className="text-sm text-gray-900">{workOrder.currentStatus}</span>
                  </div>
                )}
                {shouldShowField('currentStationId') && currentStation && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Current Station:</span>
                    <span className="text-sm text-gray-900">{currentStation.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Completed:</span>
                  <span className="text-sm text-gray-900">{workOrder.completed ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
              {customer ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Business Name:</span>
                    <span className="text-sm text-gray-900">{customer.businessName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Contact Person:</span>
                    <span className="text-sm text-gray-900">{customer.contactPersonName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Phone:</span>
                    <span className="text-sm text-gray-900">{customer.contactPersonPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Address:</span>
                    <span className="text-sm text-gray-900">{customer.businessAddress}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Customer information not available</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Financial Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Estimated Price:</span>
                  <span className="text-sm font-semibold text-gray-900">${workOrder.estimatedPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Parts Used</h2>
              {workOrder.partsUsed.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Part ID</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {workOrder.partsUsed.map((part, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 text-sm text-gray-900">{part.partId}</td>
                          <td className="px-3 py-2 text-sm text-gray-900">{getPartDescription(part.partId)}</td>
                          <td className="px-3 py-2 text-sm text-gray-900">{part.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No parts used yet</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Work Order Operations</h2>
              {template && (
                <div>
                  <p className="text-sm text-gray-600 mb-3">Template: {template.name}</p>
                  <div className="space-y-2">
                    {workOrder.workOrderRoute.map((stationId, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-700 mr-3">
                            {index + 1}.
                          </span>
                          <span className="text-sm text-gray-900">
                            {getStationName(stationId)}
                          </span>
                        </div>
                        {workOrder.currentStationId === stationId && workOrder.stage === 'in_progress' && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Comments</h2>
              <p className="text-sm text-gray-700">{workOrder.comments || 'No comments'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface EditWorkOrderFormProps {
  workOrder: WorkOrder;
  customers: Customer[];
  stations: Station[];
  templates: WorkOrderTemplate[];
  inventory: InventoryItem[];
  onSave: (workOrder: WorkOrder) => void;
  onCancel: () => void;
}

function EditWorkOrderForm({ workOrder, customers, stations, templates, inventory, onSave, onCancel }: EditWorkOrderFormProps) {
  const [formData, setFormData] = useState(workOrder);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Edit Work Order</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <select
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.businessName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salesperson</label>
            <input
              type="text"
              value={formData.salesperson}
              onChange={(e) => setFormData({ ...formData, salesperson: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
            <select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
            <input
              type="text"
              value={formData.currentStatus}
              onChange={(e) => setFormData({ ...formData, currentStatus: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required By</label>
            <input
              type="date"
              value={formData.requiredBy}
              onChange={(e) => setFormData({ ...formData, requiredBy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.estimatedPrice}
              onChange={(e) => setFormData({ ...formData, estimatedPrice: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        </div>

        <div className="flex justify-end space-x-3">
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
  );
}