'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ClientDatePickerProps {
  selected: Date;
  onChange: (date: Date | null) => void;
  maxDate: Date;
}

export function ClientDatePicker({ selected, onChange, maxDate }: ClientDatePickerProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    // Initialize the date state after mounting to ensure client-side only
    const parsedDate = selected instanceof Date ? selected : new Date(selected);
    setSelectedDate(parsedDate);
  }, [selected]);

  if (!mounted) {
    return (
      <div className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
        Loading...
      </div>
    );
  }

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        onChange(date);
      }}
      maxDate={maxDate instanceof Date ? maxDate : new Date(maxDate)}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
    />
  );
} 