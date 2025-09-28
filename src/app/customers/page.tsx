'use client'

import { useState } from 'react';
import { Customer } from '../../types';
import { mockData } from '../../data/mockData';

const ITEMS_PER_PAGE = 10;

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockData.customers);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contactPersonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== customerId));
    }
  };

  const handleAddCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `cust-${String(customers.length + 1).padStart(3, '0')}`
    };
    setCustomers([...customers, newCustomer]);
    setShowAddForm(false);
  };

  const handleEditCustomer = (customerData: Customer) => {
    setCustomers(customers.map(c => c.id === customerData.id ? customerData : c));
    setEditingCustomer(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Customers</h1>
          <p className="text-slate-600">Manage your customer relationships</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Add Customer
        </button>
      </div>

      <div className="glass-card p-6 border border-slate-200/20">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search customers..."
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
                  Business Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.businessName}</div>
                      <div className="text-sm text-gray-500">{customer.businessAddress}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.customerCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.contactPersonName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.contactPersonPhone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.lastInvoiceDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingCustomer(customer)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredCustomers.length)} of{' '}
            {filteredCustomers.length} results
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

      {(showAddForm || editingCustomer) && (
        <CustomerForm
          customer={editingCustomer}
          onSave={editingCustomer ? handleEditCustomer : handleAddCustomer}
          onCancel={() => {
            setShowAddForm(false);
            setEditingCustomer(null);
          }}
        />
      )}
    </div>
  );
}

interface CustomerFormProps {
  customer: Customer | null;
  onSave: (customer: any) => void;
  onCancel: () => void;
}

function CustomerForm({ customer, onSave, onCancel }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    businessName: customer?.businessName || '',
    businessAddress: customer?.businessAddress || '',
    customerCode: customer?.customerCode || '',
    contactPersonName: customer?.contactPersonName || '',
    contactPersonPhone: customer?.contactPersonPhone || '',
    lastInvoiceDate: customer?.lastInvoiceDate || new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customer) {
      onSave({ ...customer, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {customer ? 'Edit Customer' : 'Add Customer'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Address
            </label>
            <textarea
              required
              value={formData.businessAddress}
              onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Code
            </label>
            <input
              type="text"
              required
              value={formData.customerCode}
              onChange={(e) => setFormData({ ...formData, customerCode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person Name
            </label>
            <input
              type="text"
              required
              value={formData.contactPersonName}
              onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person Phone
            </label>
            <input
              type="tel"
              required
              value={formData.contactPersonPhone}
              onChange={(e) => setFormData({ ...formData, contactPersonPhone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Invoice Date
            </label>
            <input
              type="date"
              required
              value={formData.lastInvoiceDate}
              onChange={(e) => setFormData({ ...formData, lastInvoiceDate: e.target.value })}
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
              {customer ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}