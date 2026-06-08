import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { FilterDateRangeMode } from '@/libs/features/project/types.ts';

dayjs.extend(isoWeek);
dayjs.extend(quarterOfYear);
export interface IDateRange {
  startDate: string | undefined;
  endDate: string | undefined;
  label: string;
}

export function getDateRange(
  mode: FilterDateRangeMode,
  offset: number,
  t: (key: string) => string,
  customRange?: { start: string; end: string },
): IDateRange {
  const now = dayjs();
  if (mode === FilterDateRangeMode.AllTime) {
    return {
      startDate: undefined,
      endDate: undefined,
      label: t('project.view.dateRange.allTime'),
    };
  }
  if (mode === FilterDateRangeMode.CustomTime) {
    if (customRange) {
      return {
        startDate: customRange.start,
        endDate: customRange.end,
        label: t('project.view.dateRange.customTime'),
      };
    }
    return {
      startDate: undefined,
      endDate: undefined,
      label: t('project.view.dateRange.customTime'),
    };
  }
  if (mode === FilterDateRangeMode.Week) {
    const start = now.add(offset, 'week').startOf('isoWeek');
    const end = now.add(offset, 'week').endOf('isoWeek');
    return {
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
      label: `${t('project.view.dateRange.week')} ${start.format('D')} - ${end.format('D MMM YYYY')}`,
    };
  }
  if (mode === FilterDateRangeMode.Month) {
    const start = now.add(offset, 'month').startOf('month');
    const end = now.add(offset, 'month').endOf('month');
    return {
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
      label: `${t('project.view.dateRange.month')} ${start.format('D')} - ${end.format('D MMM YYYY')}`,
    };
  }
  if (mode === FilterDateRangeMode.Quarter) {
    const base = now.add(offset * 3, 'month');
    const start = base.startOf('quarter');
    const end = base.endOf('quarter');
    return {
      startDate: start.format('YYYY-MM-DD'),
      endDate: end.format('YYYY-MM-DD'),
      label: `${t('project.view.dateRange.quarter')} ${start.format('D MMM')} - ${end.format('D MMM YYYY')}`,
    };
  }
  const start = now.add(offset, 'year').startOf('year');
  const end = now.add(offset, 'year').endOf('year');
  return {
    startDate: start.format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD'),
    label: `${t('project.view.dateRange.year')} ${start.format('D MMM')} - ${end.format('D MMM YYYY')}`,
  };
}

export function formatMinutesToHours(minutes: number): string {
  if (!minutes) return '';
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
