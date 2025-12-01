export interface PeriodConfig {
  id: number;
  label: string;
  startDate: string;
  endDate: string;
}

export interface PeriodItem {
  startDate: string;
  endDate: string;
  label: string;
  isCurrent: boolean;
  isFuture: boolean;
  isActive: boolean;
}
