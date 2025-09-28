import { Customer, InventoryItem, Station, WorkOrder, WorkOrderTemplate, WorkOrderOperation } from '../types';

const businessNames = [
  'Acme Manufacturing', 'Global Industries', 'TechnoSystems Corp', 'Precision Engineering',
  'Advanced Materials Inc', 'Innovative Solutions LLC', 'Premier Components', 'Elite Manufacturing',
  'Dynamic Systems Group', 'Universal Parts Co', 'Modern Fabrication', 'Quality Controls Ltd',
  'Strategic Manufacturing', 'Optimal Solutions Inc', 'Professional Services Corp', 'Industrial Experts',
  'Specialized Components', 'Technical Innovations', 'Manufacturing Excellence', 'Superior Products Inc',
  'Advanced Technologies', 'Precision Industries', 'Quality Manufacturing', 'Reliable Systems Corp',
  'Expert Solutions LLC', 'Professional Manufacturing', 'Industrial Components Inc', 'Technical Services',
  'Manufacturing Specialists', 'Advanced Engineering', 'Quality Industries Ltd', 'Precision Solutions',
  'Industrial Excellence', 'Technical Manufacturing', 'Professional Components', 'Advanced Systems',
  'Quality Engineering Inc', 'Precision Manufacturing', 'Industrial Solutions LLC', 'Technical Industries'
];

const addresses = [
  '123 Industrial Ave, Manufacturing City, MC 12345',
  '456 Factory Blvd, Production Town, PT 67890',
  '789 Assembly St, Workshop Village, WV 13579',
  '321 Machinery Rd, Component City, CC 24680',
  '654 Equipment Dr, Fabrication Falls, FF 97531',
  '987 Production Ln, Assembly Heights, AH 86420',
  '147 Manufacturing Way, Industrial Park, IP 75319',
  '258 Factory Ct, Production Plaza, PP 95173',
  '369 Workshop Ave, Component Corner, CC 62840',
  '741 Assembly Blvd, Manufacturing Mall, MM 51739'
];

const contactNames = [
  'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson',
  'Jennifer Garcia', 'Robert Miller', 'Lisa Anderson', 'William Taylor', 'Jessica Martinez',
  'Christopher Lee', 'Amanda White', 'Matthew Harris', 'Ashley Clark', 'Daniel Lewis',
  'Stephanie Walker', 'Anthony Hall', 'Michelle Young', 'Mark Allen', 'Laura King'
];

const partDescriptions = [
  'Steel Bolt M8x20', 'Aluminum Bracket 5x3', 'Rubber Gasket O-Ring', 'Copper Wire 12AWG',
  'Plastic Housing Unit', 'Stainless Screw M6x15', 'Carbon Fiber Panel', 'Brass Fitting 1/4"',
  'Silicone Seal Strip', 'Titanium Rod 10mm', 'Steel Plate 100x50mm', 'Aluminum Tube 25mm',
  'Rubber Washer 20mm', 'Copper Connector RJ45', 'Plastic Spacer 5mm', 'Stainless Washer M8',
  'Carbon Spring 50N', 'Brass Valve 1/2"', 'Silicone Hose 10mm', 'Titanium Screw M4x10',
  'Steel Angle 40x40mm', 'Aluminum Sheet 2mm', 'Rubber Bumper 15mm', 'Copper Bushing 12mm',
  'Plastic Cover Clear', 'Stainless Pin 6mm', 'Carbon Tube 20mm', 'Brass Nipple 3/8"',
  'Silicone Pad 25x25mm', 'Titanium Washer M6', 'Steel Channel 50x25mm', 'Aluminum Extrusion',
  'Rubber Grommet 8mm', 'Copper Terminal Block', 'Plastic Clamp 15mm', 'Stainless Rivet 4mm',
  'Carbon Plate 200x100mm', 'Brass Adapter 1/4"', 'Silicone Tube Flexible', 'Titanium Bolt M10x30'
];

const sources = [
  'MetalWorks Supply Co', 'Industrial Parts Direct', 'Quality Components Inc', 'Precision Materials',
  'Advanced Supplies LLC', 'Professional Parts Co', 'Industrial Solutions', 'Component Specialists',
  'Manufacturing Supplies', 'Technical Components', 'Quality Materials Inc', 'Precision Supplies',
  'Industrial Components', 'Advanced Materials Co', 'Professional Supplies', 'Quality Parts Direct'
];

const stationNames = [
  'Cutting Station', 'Welding Station', 'Assembly Station', 'Quality Control',
  'Painting Station', 'Packaging Station', 'Machining Station', 'Drilling Station',
  'Inspection Station', 'Final Assembly'
];

const salespeople = [
  'Alice Cooper', 'Bob Johnson', 'Carol Smith', 'Dave Wilson', 'Eve Brown',
  'Frank Davis', 'Grace Miller', 'Henry Garcia', 'Iris Taylor', 'Jack Anderson'
];

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function generateRandomPhone(): string {
  const area = Math.floor(Math.random() * 800) + 200;
  const exchange = Math.floor(Math.random() * 800) + 200;
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `${area}-${exchange}-${number}`;
}

function generateCustomers(): Customer[] {
  const customers: Customer[] = [];
  const startDate = new Date('2020-01-01');
  const endDate = new Date('2024-12-01');

  for (let i = 0; i < 120; i++) {
    customers.push({
      id: `cust-${(i + 1).toString().padStart(3, '0')}`,
      businessName: businessNames[Math.floor(Math.random() * businessNames.length)] + (i > 39 ? ` ${Math.floor(i/40) + 1}` : ''),
      businessAddress: addresses[Math.floor(Math.random() * addresses.length)],
      customerCode: `C${(i + 1).toString().padStart(4, '0')}`,
      contactPersonName: contactNames[Math.floor(Math.random() * contactNames.length)],
      contactPersonPhone: generateRandomPhone(),
      lastInvoiceDate: generateRandomDate(startDate, endDate)
    });
  }

  return customers;
}

function generateInventoryItems(): InventoryItem[] {
  const inventory: InventoryItem[] = [];
  const units = ['pcs', 'kg', 'm', 'l', 'ft', 'lb', 'gal', 'cm'];

  for (let i = 0; i < 150; i++) {
    inventory.push({
      id: `inv-${(i + 1).toString().padStart(3, '0')}`,
      partId: `P${(i + 1).toString().padStart(4, '0')}`,
      description: partDescriptions[i % partDescriptions.length] + (i >= 40 ? ` Type ${Math.floor(i/40) + 1}` : ''),
      unitOfMeasurement: units[Math.floor(Math.random() * units.length)],
      minimumUnitOfConsumption: Math.floor(Math.random() * 10) + 1,
      price: Math.round((Math.random() * 500 + 5) * 100) / 100,
      source: sources[Math.floor(Math.random() * sources.length)],
      quantity: Math.floor(Math.random() * 1000) + 50
    });
  }

  return inventory;
}

function generateStations(): Station[] {
  const consumables = [
    'Cutting Oil', 'Welding Rod', 'Sandpaper', 'Paint', 'Lubricant', 'Cleaning Solvent',
    'Protective Film', 'Adhesive', 'Sealant', 'Polish', 'Primer', 'Flux', 'Coolant'
  ];

  return stationNames.map((name, i) => ({
    id: `station-${(i + 1).toString().padStart(2, '0')}`,
    name,
    description: `${name} for manufacturing operations`,
    consumableMaterials: consumables.slice(i, i + 3)
  }));
}

function generateWorkOrderTemplates(stations: Station[]): WorkOrderTemplate[] {
  const templates = [
    { name: 'Standard Assembly', route: ['station-01', 'station-07', 'station-03', 'station-04', 'station-09'] },
    { name: 'Heavy Manufacturing', route: ['station-01', 'station-02', 'station-07', 'station-05', 'station-09', 'station-06'] },
    { name: 'Quick Production', route: ['station-01', 'station-03', 'station-06'] },
    { name: 'Quality Focus', route: ['station-01', 'station-07', 'station-04', 'station-09', 'station-04', 'station-06'] },
    { name: 'Custom Order', route: ['station-01', 'station-02', 'station-03', 'station-05', 'station-09', 'station-06'] }
  ];

  return templates.map((template, i) => ({
    id: `template-${(i + 1).toString().padStart(2, '0')}`,
    name: template.name,
    route: template.route
  }));
}

function generateWorkOrders(customers: Customer[], inventory: InventoryItem[], templates: WorkOrderTemplate[]): WorkOrder[] {
  const workOrders: WorkOrder[] = [];
  const stages: ('pending' | 'in_progress' | 'complete')[] = ['pending', 'in_progress', 'complete'];
  const statuses = ['Not Started', 'In Progress', 'On Hold', 'Quality Check', 'Ready for Delivery', 'Completed'];

  for (let i = 0; i < 130; i++) {
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const template = templates[Math.floor(Math.random() * templates.length)];
    const usedParts = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
      partId: inventory[Math.floor(Math.random() * inventory.length)].partId,
      quantity: Math.floor(Math.random() * 10) + 1
    }));

    const dateCreated = generateRandomDate(new Date('2024-01-01'), new Date('2024-12-01'));

    workOrders.push({
      id: `WO-${(i + 1).toString().padStart(4, '0')}`,
      dateCreated,
      dateFinished: stage === 'complete' ? generateRandomDate(new Date(dateCreated), new Date('2024-12-31')) : undefined,
      stage,
      customerId: customers[Math.floor(Math.random() * customers.length)].id,
      salesperson: salespeople[Math.floor(Math.random() * salespeople.length)],
      completed: stage === 'complete',
      partsUsed: usedParts,
      workOrderTemplateId: template.id,
      requiredBy: generateRandomDate(new Date(dateCreated), new Date('2025-03-01')),
      startedOn: stage !== 'pending' ? generateRandomDate(new Date(dateCreated), new Date()) : undefined,
      deliveryDate: stage === 'complete' ? generateRandomDate(new Date(dateCreated), new Date()) : undefined,
      currentStatus: statuses[Math.floor(Math.random() * statuses.length)],
      currentStationId: stage === 'in_progress' ? template.route[Math.floor(Math.random() * template.route.length)] : undefined,
      estimatedPrice: Math.round((Math.random() * 10000 + 500) * 100) / 100,
      partNumbers: usedParts.map(p => p.partId),
      workOrderRoute: template.route,
      comments: `Work order ${i + 1} notes and special instructions`
    });
  }

  return workOrders;
}

export const mockData = {
  customers: generateCustomers(),
  inventory: generateInventoryItems(),
  stations: generateStations(),
  workOrderTemplates: generateWorkOrderTemplates(generateStations()),
  workOrders: generateWorkOrders(generateCustomers(), generateInventoryItems(), generateWorkOrderTemplates(generateStations()))
};