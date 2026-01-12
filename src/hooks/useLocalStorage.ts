import { useState, useEffect } from 'react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  jobUrl: string;
  contactPerson: string;
  contactEmail: string;
  dateApplied: string;
  status: "Applied" | "Interview" | "Offered" | "Rejected";
  priority: "Low" | "Medium" | "High";
  notes: string;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      console.log(`Read from localStorage "${key}":`, value);
      return value;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        console.log(`Saved to localStorage "${key}":`, valueToStore);
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes to local storage from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue] as const;
}

export function useJobs() {
  const [jobs, setJobs] = useLocalStorage<Job[]>('jobs', []);
  
  // Helper functions for job management
  const addJob = (job: Omit<Job, 'id'>) => {
    const newJob: Job = {
      ...job,
      id: Date.now(),
    };
    setJobs([...jobs, newJob]);
  };

  const updateJob = (id: number, updatedJob: Partial<Job>) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, ...updatedJob } : job
    ));
  };

  const deleteJob = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const getJobById = (id: number) => {
    return jobs.find(job => job.id === id);
  };

  return {
    jobs,
    setJobs,
    addJob,
    updateJob,
    deleteJob,
    getJobById,
  };
}

export type { Job };
