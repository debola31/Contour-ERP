export interface Customer {
  id: string;
  businessName: string;
  businessAddress: string;
  customerCode: string;
  contactPersonName: string;
  contactPersonPhone: string;
  lastInvoiceDate: string;
}

export interface InventoryItem {
  id: string;
  partId: string;
  description: string;
  unitOfMeasurement: string;
  minimumUnitOfConsumption: number;
  price: number;
  source: string;
  quantity: number;
}

export interface Station {
  id: string;
  name: string;
  description: string;
  consumableMaterials: string[];
}

export interface WorkOrderTemplate {
  id: string;
  name: string;
  route: string[];
}

export interface WorkOrder {
  id: string;
  dateCreated: string;
  dateFinished?: string;
  stage: 'pending' | 'in_progress' | 'complete';
  customerId: string;
  salesperson: string;
  completed: boolean;
  partsUsed: { partId: string; quantity: number }[];
  workOrderTemplateId?: string;
  requiredBy: string;
  startedOn?: string;
  deliveryDate?: string;
  currentStatus: string;
  currentStationId?: string;
  estimatedPrice: number;
  partNumbers: string[];
  workOrderRoute: string[];
  comments: string;
}

export interface WorkOrderOperation {
  id: string;
  workOrderId: string;
  stationId: string;
  order: number;
  completed: boolean;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
}