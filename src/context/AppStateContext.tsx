import type { PropsWithChildren } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AppStateContext } from './app-state';

export function AppStateProvider({ children }: PropsWithChildren) {
  const [savedPlaceIds, setSavedPlaceIds] = useLocalStorage<string[]>('qd-pocket-saved-places', []);
  const [checkedShoppingIds, setCheckedShoppingIds] = useLocalStorage<string[]>('qd-pocket-shopping', []);

  const toggleSavedPlace = (id: string) => {
    setSavedPlaceIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const toggleShoppingItem = (id: string) => {
    setCheckedShoppingIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <AppStateContext.Provider
      value={{
        savedPlaceIds,
        checkedShoppingIds,
        toggleSavedPlace,
        toggleShoppingItem,
        isPlaceSaved: (id) => savedPlaceIds.includes(id),
        isShoppingChecked: (id) => checkedShoppingIds.includes(id),
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
