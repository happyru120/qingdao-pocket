import { createContext } from 'react';

export type AppState = {
  savedPlaceIds: string[];
  checkedShoppingIds: string[];
  toggleSavedPlace: (id: string) => void;
  toggleShoppingItem: (id: string) => void;
  isPlaceSaved: (id: string) => boolean;
  isShoppingChecked: (id: string) => boolean;
};

export const AppStateContext = createContext<AppState | null>(null);
