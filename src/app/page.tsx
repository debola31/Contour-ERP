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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-slate-600">Welcome to your ERP command center</p>
        </div>
        <div className="glass-card px-4 py-2">
          <div className="text-sm text-slate-600">System Status</div>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700">All Systems Operational</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 hover:shadow-xl transition-all duration-300 border border-slate-200/20">
          <div className="flex items-center">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-slate-600">Total Customers</h2>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{stats.totalCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">👥</span>
            </div>
          </div>
          <Link href="/customers" className="text-blue-600 text-sm hover:text-blue-800 font-medium mt-3 block transition-colors">
            View all customers →
          </Link>
        </div>

        <div className="glass-card p-6 hover:shadow-xl transition-all duration-300 border border-slate-200/20">
          <div className="flex items-center">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-slate-600">Inventory Items</h2>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">{stats.totalInventoryItems}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">📦</span>
            </div>
          </div>
          <div className="text-sm text-red-600 mt-1 font-medium">
            {stats.lowStockItems} items low stock
          </div>
          <Link href="/inventory" className="text-green-600 text-sm hover:text-green-800 font-medium mt-2 block transition-colors">
            Manage inventory →
          </Link>
        </div>

        <div className="glass-card p-6 hover:shadow-xl transition-all duration-300 border border-slate-200/20">
          <div className="flex items-center">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-slate-600">Work Orders</h2>
              <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">{stats.totalWorkOrders}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">⚙️</span>
            </div>
          </div>
          <div className="text-sm mt-2 flex flex-wrap gap-1">
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">{stats.pendingWorkOrders} pending</span>
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">{stats.inProgressWorkOrders} active</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">{stats.completedWorkOrders} complete</span>
          </div>
          <Link href="/work-orders" className="text-amber-600 text-sm hover:text-amber-800 font-medium mt-3 block transition-colors">
            View work orders →
          </Link>
        </div>

        <div className="glass-card p-6 hover:shadow-xl transition-all duration-300 border border-slate-200/20">
          <div className="flex items-center">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-slate-600">Stations</h2>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">{stats.totalStations}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🏭</span>
            </div>
          </div>
          <Link href="/stations" className="text-purple-600 text-sm hover:text-purple-800 font-medium mt-3 block transition-colors">
            Manage stations →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 border border-slate-200/20">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3"></span>
            Recent Work Orders
          </h3>
          <div className="space-y-4">
            {workOrders.slice(0, 5).map(wo => (
              <div key={wo.id} className="flex justify-between items-center p-3 rounded-lg bg-white/50 border border-slate-100 hover:bg-white/70 transition-colors">
                <div>
                  <Link href={`/work-orders/details?id=${wo.id}`} className="font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                    {wo.id}
                  </Link>
                  <p className="text-sm text-slate-600 mt-1">{wo.currentStatus}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  wo.stage === 'complete' ? 'bg-green-100 text-green-800 border border-green-200' :
                  wo.stage === 'in_progress' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  'bg-slate-100 text-slate-800 border border-slate-200'
                }`}>
                  {wo.stage.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 border border-slate-200/20">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mr-3"></span>
            Low Stock Alert
          </h3>
          <div className="space-y-4">
            {inventory.filter(item => item.quantity < 100).slice(0, 5).map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 rounded-lg bg-white/50 border border-slate-100 hover:bg-white/70 transition-colors">
                <div>
                  <p className="font-semibold text-slate-800">{item.description}</p>
                  <p className="text-sm text-slate-600 mt-1">{item.partId}</p>
                </div>
                <div className="text-right">
                  <span className="text-red-600 font-bold text-lg">
                    {item.quantity}
                  </span>
                  <p className="text-xs text-slate-500">{item.unitOfMeasurement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
