'use client'

import { useState } from 'react';
import { Station } from '../../types';
import { mockData } from '../../data/mockData';

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>(mockData.stations);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.consumableMaterials.some(material =>
      material.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAddStation = (stationData: Omit<Station, 'id'>) => {
    const newStation: Station = {
      ...stationData,
      id: `station-${String(stations.length + 1).padStart(2, '0')}`
    };
    setStations([...stations, newStation]);
    setShowAddForm(false);
  };

  const handleEditStation = (stationData: Station) => {
    setStations(stations.map(s => s.id === stationData.id ? stationData : s));
    setEditingStation(null);
  };

  const handleDeleteStation = (stationId: string) => {
    if (confirm('Are you sure you want to delete this station?')) {
      setStations(stations.filter(s => s.id !== stationId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Station Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Station
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search stations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <div key={station.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{station.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{station.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingStation(station)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStation(station.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Consumable Materials:</h4>
                {station.consumableMaterials.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {station.consumableMaterials.map((material, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No consumable materials assigned</p>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Station ID:</span>
                  <span className="text-gray-900 font-mono">{station.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stations found matching your search criteria.</p>
          </div>
        )}
      </div>

      {(showAddForm || editingStation) && (
        <StationForm
          station={editingStation}
          onSave={editingStation ? handleEditStation : handleAddStation}
          onCancel={() => {
            setShowAddForm(false);
            setEditingStation(null);
          }}
        />
      )}
    </div>
  );
}

interface StationFormProps {
  station: Station | null;
  onSave: (station: any) => void;
  onCancel: () => void;
}

function StationForm({ station, onSave, onCancel }: StationFormProps) {
  const [formData, setFormData] = useState({
    name: station?.name || '',
    description: station?.description || '',
    consumableMaterials: station?.consumableMaterials || []
  });
  const [newMaterial, setNewMaterial] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (station) {
      onSave({ ...station, ...formData });
    } else {
      onSave(formData);
    }
  };

  const addMaterial = () => {
    if (newMaterial.trim() && !formData.consumableMaterials.includes(newMaterial.trim())) {
      setFormData({
        ...formData,
        consumableMaterials: [...formData.consumableMaterials, newMaterial.trim()]
      });
      setNewMaterial('');
    }
  };

  const removeMaterial = (materialToRemove: string) => {
    setFormData({
      ...formData,
      consumableMaterials: formData.consumableMaterials.filter(material => material !== materialToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addMaterial();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {station ? 'Edit Station' : 'Add Station'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Station Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Cutting Station"
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
              placeholder="Brief description of the station's purpose"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consumable Materials
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add consumable material"
                />
                <button
                  type="button"
                  onClick={addMaterial}
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add
                </button>
              </div>

              {formData.consumableMaterials.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex flex-wrap gap-2">
                    {formData.consumableMaterials.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        <span>{material}</span>
                        <button
                          type="button"
                          onClick={() => removeMaterial(material)}
                          className="text-blue-600 hover:text-blue-800 ml-1"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Add materials that are regularly consumed at this station
            </p>
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
              {station ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}