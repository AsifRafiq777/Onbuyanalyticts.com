import { useState, useEffect } from 'react';
import { CalculationHistoryItem, UserInputs, CalculatedResults } from '../types';

const STORAGE_KEY = 'onbuy-calc-history';

export const useCalculationHistory = () => {
  const [history, setHistory] = useState<CalculationHistoryItem[]>(() => {
    try {
      const storedHistory = window.localStorage.getItem(STORAGE_KEY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [history]);

  const addCalculation = (inputs: UserInputs, results: CalculatedResults) => {
    const newEntry: CalculationHistoryItem = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('en-GB'),
      inputs,
      results,
    };
    // Prepend new entries so they appear at the top
    setHistory(prevHistory => [newEntry, ...prevHistory]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeCalculations = (ids: number[]) => {
    setHistory(prevHistory => prevHistory.filter(item => !ids.includes(item.id)));
  };

  return { history, addCalculation, clearHistory, removeCalculations };
};