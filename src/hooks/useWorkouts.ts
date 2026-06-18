import { useState, useEffect, useCallback } from 'react';

export interface Workout {
  id: string;
  date: string; // ISO date (YYYY-MM-DD)
  duration: number; // minutes
  exercises: string;
  notes?: string;
  createdAt: string;
}

const STORAGE_PREFIX = 'irongym_workouts_';

function getKey(email: string) {
  return `${STORAGE_PREFIX}${email.toLowerCase()}`;
}

export function useWorkouts(userEmail: string | undefined) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    if (!userEmail) {
      setWorkouts([]);
      return;
    }
    try {
      const raw = localStorage.getItem(getKey(userEmail));
      setWorkouts(raw ? JSON.parse(raw) : []);
    } catch {
      setWorkouts([]);
    }
  }, [userEmail]);

  const save = useCallback((list: Workout[]) => {
    if (!userEmail) return;
    localStorage.setItem(getKey(userEmail), JSON.stringify(list));
    setWorkouts(list);
  }, [userEmail]);

  const addWorkout = useCallback((workout: Omit<Workout, 'id' | 'createdAt'>) => {
    if (!userEmail) return;
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      createdAt: new Date().toISOString(),
    };
    const updated = [newWorkout, ...workouts].sort((a, b) => b.date.localeCompare(a.date));
    save(updated);
  }, [workouts, save, userEmail]);

  const deleteWorkout = useCallback((id: string) => {
    save(workouts.filter((w) => w.id !== id));
  }, [workouts, save]);

  // Statistics
  const totalWorkouts = workouts.length;
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // Workouts in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const workoutsThisWeek = workouts.filter((w) => new Date(w.date) >= sevenDaysAgo).length;

  // Streak (consecutive days from most recent workout)
  const uniqueDates = Array.from(new Set(workouts.map((w) => w.date))).sort((a, b) => b.localeCompare(a));
  let streak = 0;
  if (uniqueDates.length > 0) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
      streak = 1;
      for (let i = 1; i < uniqueDates.length; i++) {
        const prev = new Date(uniqueDates[i - 1]);
        const curr = new Date(uniqueDates[i]);
        const diff = Math.round((prev.getTime() - curr.getTime()) / 86400000);
        if (diff === 1) streak++;
        else break;
      }
    }
  }

  return {
    workouts,
    addWorkout,
    deleteWorkout,
    stats: {
      totalWorkouts,
      totalMinutes,
      totalHours,
      remainingMinutes,
      workoutsThisWeek,
      streak,
    },
  };
}
