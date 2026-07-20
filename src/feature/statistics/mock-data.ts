export interface ExpenseEntry {
  id: string;
  date: string;
  item: string;
  itemLeft: number;
  refill: number;
  tcd: number;
  itemUsed: number;
  final_item: number;
}

export const sampleItems = [
  'Printer Paper',
  'Ink Cartridges',
  'Coffee Beans',
  'Office Supplies',
  'Cleaning Materials',
];

export const sampleData: ExpenseEntry[] = [
  {
    id: '1',
    date: '2024-01-15',
    item: 'Printer Paper',
    itemLeft: 10,
    refill: 10,
    tcd: 35,
    itemUsed: 25,
    final_item: 25,
  },
  {
    id: '2',
    date: '2024-01-15',
    item: 'Coffee Beans',
    itemLeft: 5,
    refill: 5,
    tcd: 80,
    itemUsed: 75,
    final_item: 75,
  },
  {
    id: '3',
    date: '2024-01-14',
    item: 'Ink Cartridges',
    itemLeft: 0,
    refill: 0,
    tcd: 15,
    itemUsed: 15,
    final_item: 15,
  },
];