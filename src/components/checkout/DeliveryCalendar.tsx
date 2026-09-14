'use client';

import { useState } from 'react';
import styles from './deliveryCalendar.module.css';

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

function parseDate(value: string) {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

interface DeliveryCalendarProps {
  value: string;
  onChange: (value: string) => void;
  min: string;
  max: string;
}

export default function DeliveryCalendar({ value, onChange, min, max }: DeliveryCalendarProps) {
  const minDate = parseDate(min);
  const maxDate = parseDate(max);
  const selectedDate = value ? parseDate(value) : null;

  const [viewDate, setViewDate] = useState(() => selectedDate ?? minDate);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));

  const canGoPrev = firstOfMonth > new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const canGoNext = firstOfMonth < new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          disabled={!canGoPrev}
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <span className={styles.monthLabel}>
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          disabled={!canGoNext}
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>

      <div className={styles.weekdays}>
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className={styles.days}>
        {cells.map((date, index) => {
          if (!date) return <span key={`empty-${index}`} className={styles.dayEmpty} />;

          const disabled = date < minDate || date > maxDate;
          const selected = selectedDate ? isSameDay(date, selectedDate) : false;

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onChange(formatDate(date))}
              className={`${styles.day} ${selected ? styles.daySelected : ''}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
