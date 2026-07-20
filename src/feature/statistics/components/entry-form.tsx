'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

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

interface FormData {
  date: string;
  item: string;
  itemLeft: number;
  refill: number;
  tcd: number;
}

interface EntryFormProps {
  items: string[];
  onAddEntry: (entry: Omit<ExpenseEntry, 'id'>) => void;
  editingId: string | null;
  editData: Partial<ExpenseEntry>;
  onEdit: (id: string, data: Partial<ExpenseEntry>) => void;
  onCancelEdit: () => void;
}

export default function EntryForm({
  items,
  onAddEntry,
  editingId,
  editData,
  onCancelEdit,
}: EntryFormProps) {
  const [isOpen, setIsOpen] = useState(editingId ? true : false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      item: '',
      itemLeft: 0,
      refill: 0,
      tcd: 0,
    },
  });

  // Update form when editing
  useEffect(() => {
    if (editingId && editData) {
      setValue('date', editData.date || new Date().toISOString().split('T')[0]);
      setValue('item', editData.item || '');
      setValue('itemLeft', editData.itemLeft || 0);
      setValue('refill', editData.refill || 0);
      setValue('tcd', editData.tcd || 0);
    }
  }, [editingId, editData, setValue]);

  const onSubmit = (data: FormData) => {
    const entry = {
      date: data.date,
      item: data.item,
      itemLeft: data.itemLeft,
      refill: data.refill,
      tcd: data.tcd,
      itemUsed: 0, // Will be calculated on backend
      createdBy: 'Current User',
    };

    if (editingId) {
      onEdit(editingId, entry);
    } else {
      onAddEntry(entry);
    }

    resetForm();
  };

  const resetForm = () => {
    reset({
      date: new Date().toISOString().split('T')[0],
      item: '',
      itemLeft: 0,
      refill: 0,
      tcd: 0,
    });
    if (!editingId) {
      setIsOpen(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border-b border-border px-6 py-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {editingId ? 'Edit Entry' : 'Add New Entry'}
          </h2>
          <ChevronDown
            size={20}
            className={`text-primary transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Row 1: Date and Item */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('date', {
                  required: 'Date is required',
                })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Item <span className="text-red-500">*</span>
              </label>
              <select
                {...register('item', {
                  required: 'Item is required',
                })}
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
                <p className="mt-1 text-sm text-red-500">{errors.item.message}</p>
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
                {...register('itemLeft', {
                  required: 'Item Left is required',
                  min: {
                    value: 0,
                    message: 'Must be non-negative',
                  },
                  valueAsNumber: true,
                })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.itemLeft && (
                <p className="mt-1 text-sm text-red-500">{errors.itemLeft.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">
                Refill
              </label>
              <input
                type="number"
                min="0"
                {...register('refill', {
                  min: {
                    value: 0,
                    message: 'Must be non-negative',
                  },
                  valueAsNumber: true,
                })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.refill && (
                <p className="mt-1 text-sm text-red-500">{errors.refill.message}</p>
              )}
            </div>
          </div>

          {/* Row 3: TCD */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground">
              TCD (Total Count Daily) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              {...register('tcd', {
                required: 'TCD is required',
                min: {
                  value: 0,
                  message: 'Must be non-negative',
                },
                valueAsNumber: true,
              })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.tcd && (
              <p className="mt-1 text-sm text-red-500">{errors.tcd.message}</p>
            )}
          </div>

          {/* Row 4: Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {editingId ? 'Update Entry' : 'Save Entry'}
            </Button>
            <Button
              type="button"
              onClick={resetForm}
              variant="outline"
              className="border-border text-foreground hover:bg-muted"
            >
              Reset
            </Button>
            {editingId && (
              <Button
                type="button"
                onClick={onCancelEdit}
                variant="outline"
                className="border-border text-foreground hover:bg-muted"
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
