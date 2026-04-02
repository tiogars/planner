import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Activity, PlannerSettings } from '../types';
import { DEFAULT_SETTINGS } from '../types';

interface PlannerContextValue {
  settings: PlannerSettings;
  activities: Activity[];
  updateSettings: (settings: PlannerSettings) => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  updateActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;
}

const PlannerContext = createContext<PlannerContextValue | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PlannerSettings>(DEFAULT_SETTINGS);
  const [activities, setActivities] = useState<Activity[]>([]);

  const updateSettings = useCallback((newSettings: PlannerSettings) => {
    setSettings(newSettings);
  }, []);

  const addActivity = useCallback((activity: Omit<Activity, 'id'>) => {
    setActivities((prev) => [
      ...prev,
      { ...activity, id: crypto.randomUUID() },
    ]);
  }, []);

  const updateActivity = useCallback((activity: Activity) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === activity.id ? activity : a)),
    );
  }, []);

  const removeActivity = useCallback((id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <PlannerContext.Provider
      value={{
        settings,
        activities,
        updateSettings,
        addActivity,
        updateActivity,
        removeActivity,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePlanner(): PlannerContextValue {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error('usePlanner must be used within PlannerProvider');
  return ctx;
}
