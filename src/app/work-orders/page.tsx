'use client'

import { useState } from 'react';
import Link from 'next/link';
import { WorkOrder, Customer } from '../../types';
import { mockData } from '../../data/mockData';

export default function WorkOrdersPage() {
  const [workOrders] = useState<WorkOrder[]>(mockData.workOrders);
  const [customers] = useState<Customer[]>(mockData.customers);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStage, setFilterStage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getCustomerName = (customerId: string) => {
    return customers.find(c => c.id === customerId)?.businessName || 'Unknown Customer';
  };

  const filteredWorkOrders = workOrders.filter(wo => {
    const matchesSearch = wo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getCustomerName(wo.customerId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.salesperson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || wo.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'complete': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePrintWorkOrder = (workOrder: WorkOrder) => {
    const printWindow = window.open();
    if (!printWindow) return;

    const customer = customers.find(c => c.id === workOrder.customerId);
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Work Order ${workOrder.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; }
            .parts-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .parts-table th, .parts-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .parts-table th { background-color: #f2f2f2; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Work Order ${workOrder.id}</h1>
            <p>Contour ERP System</p>
          </div>

          <div class="grid">
            <div>
              <div class="section">
                <h3>Order Information</h3>
                <div class="field"><span class="label">Date Created:</span> ${workOrder.dateCreated}</div>
                <div class="field"><span class="label">Required By:</span> ${workOrder.requiredBy}</div>
                <div class="field"><span class="label">Status:</span> ${workOrder.currentStatus}</div>
                <div class="field"><span class="label">Stage:</span> ${workOrder.stage.replace('_', ' ')}</div>
                <div class="field"><span class="label">Salesperson:</span> ${workOrder.salesperson}</div>
              </div>
            </div>

            <div>
              <div class="section">
                <h3>Customer Information</h3>
                <div class="field"><span class="label">Customer:</span> ${customer?.businessName || 'Unknown'}</div>
                <div class="field"><span class="label">Address:</span> ${customer?.businessAddress || 'N/A'}</div>
                <div class="field"><span class="label">Contact:</span> ${customer?.contactPersonName || 'N/A'}</div>
                <div class="field"><span class="label">Phone:</span> ${customer?.contactPersonPhone || 'N/A'}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <h3>Financial Information</h3>
            <div class="field"><span class="label">Estimated Price:</span> $${workOrder.estimatedPrice.toFixed(2)}</div>
          </div>

          <div class="section">
            <h3>Parts Used</h3>
            <table class="parts-table">
              <thead>
                <tr>
                  <th>Part ID</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${workOrder.partsUsed.map(part => `
                  <tr>
                    <td>${part.partId}</td>
                    <td>${part.quantity}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h3>Work Order Route</h3>
            <p>${workOrder.workOrderRoute.join(' → ')}</p>
          </div>

          <div class="section">
            <h3>Comments</h3>
            <p>${workOrder.comments}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Work Orders</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Work Order
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search work orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Stages</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estimated Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkOrders.map((workOrder) => (
                <tr key={workOrder.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/work-orders/details?id=${workOrder.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {workOrder.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {getCustomerName(workOrder.customerId)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {workOrder.salesperson}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workOrder.dateCreated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(workOrder.stage)}`}>
                      {workOrder.stage.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workOrder.currentStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${workOrder.estimatedPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handlePrintWorkOrder(workOrder)}
                      className="text-green-600 hover:text-green-900 mr-3"
                      title="Print Work Order"
                    >
                      <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd"/>
                      </svg>
                    </button>
                    <Link
                      href={`/work-orders/details?id=${workOrder.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredWorkOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No work orders found matching your criteria.</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateWorkOrderModal
          customers={customers}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}

interface CreateWorkOrderModalProps {
  customers: Customer[];
  onClose: () => void;
}

function CreateWorkOrderModal({ customers, onClose }: CreateWorkOrderModalProps) {
  const [formData, setFormData] = useState({
    customerId: '',
    salesperson: '',
    requiredBy: '',
    estimatedPrice: 0,
    comments: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Work order creation functionality would be implemented here');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Create New Work Order
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <select
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.businessName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salesperson
            </label>
            <input
              type="text"
              value={formData.salesperson}
              onChange={(e) => setFormData({ ...formData, salesperson: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required By
            </label>
            <input
              type="date"
              value={formData.requiredBy}
              onChange={(e) => setFormData({ ...formData, requiredBy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Price
            </label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create Work Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}