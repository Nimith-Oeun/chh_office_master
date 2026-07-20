'use client';

import { useState } from 'react';
import SummaryCards from '../components/summary-card';
import EntryForm from '../components/entry-form';
import DataTable from '../components/data-table';
import { ExpenseEntry, sampleData, sampleItems } from '../mock-data';

export default function StatisticDaily() {
  const [entries, setEntries] = useState<ExpenseEntry[]>(sampleData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ExpenseEntry>>({});

  const handleAddEntry = (newEntry: Omit<ExpenseEntry, 'id'>) => {
    const entry: ExpenseEntry = {
      ...newEntry,
      id: Date.now().toString(),
    };
    setEntries([entry, ...entries]);
  };

  const handleEditEntry = (id: string, updatedEntry: Partial<ExpenseEntry>) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      )
    );
    setEditingId(null);
    setEditData({});
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const stats = {
    totalItems: entries.length,
    totalUsed: entries.reduce((sum, entry) => sum + entry.itemUsed, 0),
    totalRefill: entries.reduce((sum, entry) => sum + entry.refill, 0),
    totalRemaining: entries.reduce((sum, entry) => sum + entry.itemLeft, 0),
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Statistics Daily</h1>
          <p className="mt-2 text-muted-foreground">
            Track daily usage, refills, and inventory management
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards stats={stats} />

        {/* Entry Form */}
        <div className="mb-8 mt-8">
          <EntryForm
            items={sampleItems}
            onAddEntry={handleAddEntry}
            editingId={editingId}
            editData={editData}
            onEdit={handleEditEntry}
            onCancelEdit={() => {
              setEditingId(null);
              setEditData({});
            }}
          />
        </div>

        {/* Data Table */}
        <DataTable
          entries={entries}
          onEdit={handleEditEntry}
          onDelete={handleDeleteEntry}
        />
      </div>
    </div>
  );
}
