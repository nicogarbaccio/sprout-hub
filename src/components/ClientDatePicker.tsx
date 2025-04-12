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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      maxDate={maxDate}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
    />
  );
} 