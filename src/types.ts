export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export const ALL_DAYS: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface PlannerSettings {
  title: string;
  startHour: number;
  endHour: number;
  slotDuration: 15 | 30 | 60;
  days: DayOfWeek[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  color: string;
  days: DayOfWeek[];
  startTime: string;
  endTime: string;
}

export const DEFAULT_SETTINGS: PlannerSettings = {
  title: 'My Planner',
  startHour: 8,
  endHour: 20,
  slotDuration: 30,
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
};
