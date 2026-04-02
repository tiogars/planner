import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { PlannerProvider, usePlanner } from '../context/PlannerContext';
import type { ReactNode } from 'react';
import { DEFAULT_SETTINGS } from '../types';

const wrapper = ({ children }: { children: ReactNode }) => (
  <PlannerProvider>{children}</PlannerProvider>
);

describe('PlannerContext', () => {
  it('initialises with default settings', () => {
    const { result } = renderHook(() => usePlanner(), { wrapper });
    expect(result.current.settings).toEqual(DEFAULT_SETTINGS);
  });

  it('updates settings', () => {
    const { result } = renderHook(() => usePlanner(), { wrapper });
    act(() => {
      result.current.updateSettings({ ...DEFAULT_SETTINGS, title: 'My Custom Planner' });
    });
    expect(result.current.settings.title).toBe('My Custom Planner');
  });

  it('adds an activity', () => {
    const { result } = renderHook(() => usePlanner(), { wrapper });
    act(() => {
      result.current.addActivity({
        title: 'Morning Run',
        description: 'Daily jog',
        color: '#1976d2',
        days: ['Mon', 'Wed', 'Fri'],
        startTime: '07:00',
        endTime: '08:00',
      });
    });
    expect(result.current.activities).toHaveLength(1);
    expect(result.current.activities[0].title).toBe('Morning Run');
    expect(result.current.activities[0].id).toBeTruthy();
  });

  it('removes an activity', () => {
    const { result } = renderHook(() => usePlanner(), { wrapper });
    act(() => {
      result.current.addActivity({
        title: 'Yoga',
        description: '',
        color: '#2e7d32',
        days: ['Tue'],
        startTime: '06:00',
        endTime: '07:00',
      });
    });
    const id = result.current.activities[0].id;
    act(() => {
      result.current.removeActivity(id);
    });
    expect(result.current.activities).toHaveLength(0);
  });

  it('updates an activity', () => {
    const { result } = renderHook(() => usePlanner(), { wrapper });
    act(() => {
      result.current.addActivity({
        title: 'Reading',
        description: '',
        color: '#6a1b9a',
        days: ['Mon'],
        startTime: '20:00',
        endTime: '21:00',
      });
    });
    const activity = result.current.activities[0];
    act(() => {
      result.current.updateActivity({ ...activity, title: 'Evening Reading' });
    });
    expect(result.current.activities[0].title).toBe('Evening Reading');
  });

  it('throws when used outside provider', () => {
    expect(() => renderHook(() => usePlanner())).toThrow(
      'usePlanner must be used within PlannerProvider',
    );
  });
});
