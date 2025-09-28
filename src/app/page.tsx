import Link from 'next/link';
import { mockData } from '../data/mockData';

export default function Dashboard() {
  const { customers, inventory, workOrders, stations } = mockData;

  const stats = {
    totalCustomers: customers.length,
    totalInventoryItems: inventory.length,
    totalWorkOrders: workOrders.length,
    totalStations: stations.length,
    pendingWorkOrders: workOrders.filter(wo => wo.stage === 'pending').length,
    inProgressWorkOrders: workOrders.filter(wo => wo.stage === 'in_progress').length,
    completedWorkOrders: workOrders.filter(wo => wo.stage === 'complete').length,
    lowStockItems: inventory.filter(item => item.quantity < 100).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Contour ERP System
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-gray-500">Total Customers</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
            </div>
            <div className="text-blue-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <Link href="/customers" className="text-blue-600 text-sm hover:underline mt-2 block">
            View all customers →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-gray-500">Inventory Items</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInventoryItems}</p>
            </div>
            <div className="text-green-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <div className="text-sm text-red-600 mt-1">
            {stats.lowStockItems} items low stock
          </div>
          <Link href="/inventory" className="text-blue-600 text-sm hover:underline mt-2 block">
            Manage inventory →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-gray-500">Work Orders</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.totalWorkOrders}</p>
            </div>
            <div className="text-yellow-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <div className="text-sm mt-1">
            <span className="text-red-600">{stats.pendingWorkOrders} pending</span> •
            <span className="text-yellow-600 ml-1">{stats.inProgressWorkOrders} active</span> •
            <span className="text-green-600 ml-1">{stats.completedWorkOrders} complete</span>
          </div>
          <Link href="/work-orders" className="text-blue-600 text-sm hover:underline mt-2 block">
            View work orders →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-gray-500">Stations</h2>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStations}</p>
            </div>
            <div className="text-purple-500">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <Link href="/stations" className="text-blue-600 text-sm hover:underline mt-2 block">
            Manage stations →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Work Orders</h3>
          <div className="space-y-3">
            {workOrders.slice(0, 5).map(wo => (
              <div key={wo.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <Link href={`/work-orders/details?id=${wo.id}`} className="font-medium text-blue-600 hover:underline">
                    {wo.id}
                  </Link>
                  <p className="text-sm text-gray-500">{wo.currentStatus}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  wo.stage === 'complete' ? 'bg-green-100 text-green-800' :
                  wo.stage === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {wo.stage.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Low Stock Alert</h3>
          <div className="space-y-3">
            {inventory.filter(item => item.quantity < 100).slice(0, 5).map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{item.description}</p>
                  <p className="text-sm text-gray-500">{item.partId}</p>
                </div>
                <span className="text-red-600 font-medium">
                  {item.quantity} {item.unitOfMeasurement}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
