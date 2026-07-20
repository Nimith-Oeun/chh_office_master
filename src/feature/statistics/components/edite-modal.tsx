'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ExpenseEntry {
  id: string;
  date: string;
  item: string;
  itemLeft: number;
  refill: number;
  tcd: number;
  itemUsed: number;
  createdBy: string;
}

interface EditModalProps {
  isOpen: boolean;
  entry: ExpenseEntry | null;
  items: string[];
  onSave: (data: Partial<ExpenseEntry>) => void;
  onClose: () => void;
}

export default function EditModal({ isOpen, entry, items, onSave, onClose }: EditModalProps) {
  const [formData, setFormData] = useState({
    date: '',
    item: '',
    itemLeft: 0,
    refill: 0,
    tcd: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (entry && formData.item !== entry.item) {
    setFormData({
      date: entry.date,
      item: entry.item,
      itemLeft: entry.itemLeft,
      refill: entry.refill,
      tcd: entry.tcd,
    });
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.item) newErrors.item = 'Item is required';
    if (formData.itemLeft < 0) newErrors.itemLeft = 'Must be non-negative';
    if (formData.refill < 0) newErrors.refill = 'Must be non-negative';
    if (formData.tcd < 0) newErrors.tcd = 'Must be non-negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updatedEntry = {
      date: formData.date,
      item: formData.item,
      itemLeft: formData.itemLeft,
      refill: formData.refill,
      tcd: formData.tcd,
      itemUsed: 0, // Will be calculated on backend
    };

    onSave(updatedEntry);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">Edit Entry</h2>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center p-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Row 1: Date and Item */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">
                  Item <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.item}
                  onChange={(e) =>
                    setFormData({ ...formData, item: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select an item</option>
                  {items.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.item && (
                  <p className="mt-1 text-sm text-red-500">{errors.item}</p>
                )}
              </div>
            </div>

            {/* Row 2: Item Left and Refill */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Item Left <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.itemLeft}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      itemLeft: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.itemLeft && (
                  <p className="mt-1 text-sm text-red-500">{errors.itemLeft}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">
                  Refill
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.refill}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      refill: Math.max(0, parseInt(e.target.value) || 0),
                    })
                  }
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.refill && (
                  <p className="mt-1 text-sm text-red-500">{errors.refill}</p>
                )}
              </div>
            </div>

            {/* Row 3: TCD */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground">
                TCD <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.tcd}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tcd: Math.max(0, parseInt(e.target.value) || 0),
                  })
                }
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.tcd && (
                <p className="mt-1 text-sm text-red-500">{errors.tcd}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 border border-input bg-background text-foreground hover:bg-muted"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
