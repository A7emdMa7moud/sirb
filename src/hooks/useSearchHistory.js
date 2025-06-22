"use client";

import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'searchHistory';
const MAX_HISTORY_ITEMS = 8;

export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to read search history from localStorage", error);
    }
  }, []);

  const updateLocalStorage = (newHistory) => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error("Failed to save search history to localStorage", error);
    }
  };

  const addSearchTerm = useCallback((term) => {
    const cleanedTerm = term.trim();
    if (!cleanedTerm) return;
    
    setHistory(prevHistory => {
      const newHistory = [cleanedTerm, ...prevHistory.filter(item => item.toLowerCase() !== cleanedTerm.toLowerCase())].slice(0, MAX_HISTORY_ITEMS);
      updateLocalStorage(newHistory);
      return newHistory;
    });
  }, []);

  const removeSearchTerm = useCallback((termToRemove) => {
    setHistory(prevHistory => {
      const newHistory = prevHistory.filter(item => item !== termToRemove);
      updateLocalStorage(newHistory);
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error("Failed to clear search history from localStorage", error);
    }
  }, []);

  return { history, addSearchTerm, removeSearchTerm, clearHistory };
}; 