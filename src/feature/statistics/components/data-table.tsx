'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import EditModal from '../components/edite-modal';
import { ExpenseEntry } from '../mock-data';

interface DataTableProps {
  entries: ExpenseEntry[];
  onEdit: (id: string, data: ExpenseEntry) => void;
  onDelete: (id: string) => void;
}

export default function DataTable({ entries, onEdit, onDelete }: DataTableProps) {
  const [sortField, setSortField] = useState<keyof ExpenseEntry>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [itemFilter, setItemFilter] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ExpenseEntry | null>(null);

  const items = Array.from(new Set(entries.map((e) => e.item)));

  const handleSort = (field: keyof ExpenseEntry) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredEntries = entries
    .filter((entry) => {
      const matchesSearch =
        entry.item.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = !dateFilter || entry.date === dateFilter;
      const matchesItem = !itemFilter || entry.item === itemFilter;
      return matchesSearch && matchesDate && matchesItem;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      }

      return sortOrder === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

  const handleEdit = (entry: ExpenseEntry) => {
    setEditingEntry(entry);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (data: Partial<ExpenseEntry>) => {
    if (editingEntry) {
      onEdit(editingEntry.id, data);
      setIsEditModalOpen(false);
      setEditingEntry(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      onDelete(id);
    }
  };

  const handleExportExcel = () => {
    const headers = ['Date', 'Item', 'Item Left', 'Refill', 'TCD', 'Item Used', 'FIL'];
    const rows = filteredEntries.map((entry) => [
      entry.date,
      entry.item,
      entry.itemLeft,
      entry.refill,
      entry.tcd,
      entry.itemUsed,
      entry.final_item,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-control-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">Records</h2>
      </div>

      {/* Filters and Controls */}
      <div className="border-b border-border p-6">
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-foreground">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by item or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">
              Filter by Date
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">
              Filter by Item
            </label>
            <select
              value={itemFilter}
              onChange={(e) => setItemFilter(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All Items</option>
              {items.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleExportExcel}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Export to Excel
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              {[
                { key: 'date', label: 'Date' },
                { key: 'item', label: 'Item' },
                { key: 'itemLeft', label: 'Item Left' },
                { key: 'refill', label: 'Refill' },
                { key: 'tcd', label: 'TCD' },
                { key: 'itemUsed', label: 'Item Used' },
                { key: 'final_item', label: 'FIL' },
              ].map((column) => (
                <th key={column.key} className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort(column.key as keyof ExpenseEntry)}
                    className="flex items-center gap-2 font-semibold text-foreground hover:text-primary"
                  >
                    {column.label}
                    <span className="text-xs">
                      {sortField === column.key
                        ? sortOrder === 'asc'
                          ? '↑'
                          : '↓'
                        : '↕'}
                    </span>
                  </button>
                </th>
              ))}
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 text-foreground">{entry.date}</td>
                  <td className="px-6 py-4 text-foreground">{entry.item}</td>
                  <td className="px-6 py-4 text-foreground">{entry.itemLeft}</td>
                  <td className="px-6 py-4 text-foreground">{entry.refill}</td>
                  <td className="px-6 py-4 text-foreground">{entry.tcd}</td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    {entry.itemUsed}
                  </td>
                  <td className="px-6 py-4 text-foreground">{entry.final_item}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="inline-flex items-center justify-center p-2 text-primary hover:bg-primary/10 rounded-md transition-colors"
                        title="Edit entry"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="inline-flex items-center justify-center p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Info */}
      <div className="border-t border-border px-6 py-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredEntries.length} of {entries.length} records
        </p>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        entry={editingEntry}
        items={items}
        onSave={handleSaveEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingEntry(null);
        }}
      />
    </div>
  );
}
