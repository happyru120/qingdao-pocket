import { createContext } from 'react';

export type AppState = {
  savedPlaceIds: string[];
  checkedShoppingIds: string[];
  checkedPackingIds: string[];
  toggleSavedPlace: (id: string) => void;
  toggleShoppingItem: (id: string) => void;
  togglePackingItem: (id: string) => void;
  isPlaceSaved: (id: string) => boolean;
  isShoppingChecked: (id: string) => boolean;
  isPackingChecked: (id: string) => boolean;
};

export const AppStateContext = createContext<AppState | null>(null);
