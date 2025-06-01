import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { fetchGlobalData } from '@/services/apiService';
import { CountryData, GlobalData } from '@/types/dataTypes';

type AppContextType = {
  isLoading: boolean;
  globalData: GlobalData | null;
  selectedCountries: CountryData[];
  favoriteCountries: string[];
  isDarkMode: boolean;
  toggleTheme: () => void;
  addSelectedCountry: (country: CountryData) => void;
  removeSelectedCountry: (countryId: string) => void;
  toggleFavoriteCountry: (countryId: string) => void;
  clearSelectedCountries: () => void;
};

const AppContext = createContext<AppContextType>({
  isLoading: true,
  globalData: null,
  selectedCountries: [],
  favoriteCountries: [],
  isDarkMode: false,
  toggleTheme: () => {},
  addSelectedCountry: () => {},
  removeSelectedCountry: () => {},
  toggleFavoriteCountry: () => {},
  clearSelectedCountries: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<CountryData[]>([]);
  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGlobalData();
        setGlobalData(data);
      } catch (error) {
        console.error('Failed to load global data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addSelectedCountry = (country: CountryData) => {
    if (selectedCountries.length < 5 && !selectedCountries.some(c => c.id === country.id)) {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const removeSelectedCountry = (countryId: string) => {
    setSelectedCountries(selectedCountries.filter(country => country.id !== countryId));
  };

  const toggleFavoriteCountry = (countryId: string) => {
    if (favoriteCountries.includes(countryId)) {
      setFavoriteCountries(favoriteCountries.filter(id => id !== countryId));
    } else {
      setFavoriteCountries([...favoriteCountries, countryId]);
    }
  };

  const clearSelectedCountries = () => {
    setSelectedCountries([]);
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        globalData,
        selectedCountries,
        favoriteCountries,
        isDarkMode,
        toggleTheme,
        addSelectedCountry,
        removeSelectedCountry,
        toggleFavoriteCountry,
        clearSelectedCountries,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};