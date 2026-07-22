import { useEffect, useMemo, useState } from 'react';
import { corePlaces } from '../data/places';
import type { Place } from '../types';

let ruibPlacesCache: Place[] | null = null;
let ruibPlacesPromise: Promise<Place[]> | null = null;

async function loadRuibPlaces(): Promise<Place[]> {
  if (ruibPlacesCache) return ruibPlacesCache;

  ruibPlacesPromise ??= fetch('data/ruib-places.json')
    .then((response) => {
      if (!response.ok) throw new Error(`루이 장소 데이터를 불러오지 못했어. (${response.status})`);
      return response.json() as Promise<Place[]>;
    })
    .then((places) => {
      ruibPlacesCache = places;
      return places;
    });

  return ruibPlacesPromise;
}

export function useAllPlaces(includeRuib = true) {
  const [ruibPlaces, setRuibPlaces] = useState<Place[]>(() => ruibPlacesCache ?? []);
  const [isLoadingRuib, setIsLoadingRuib] = useState(includeRuib && !ruibPlacesCache);
  const [ruibError, setRuibError] = useState<string | null>(null);

  useEffect(() => {
    if (!includeRuib) {
      setIsLoadingRuib(false);
      return;
    }

    let cancelled = false;
    setIsLoadingRuib(!ruibPlacesCache);

    loadRuibPlaces()
      .then((places) => {
        if (cancelled) return;
        setRuibPlaces(places);
        setRuibError(null);
      })
      .catch((error: Error) => {
        if (cancelled) return;
        setRuibError(error.message);
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoadingRuib(false);
      });

    return () => {
      cancelled = true;
    };
  }, [includeRuib]);

  const places = useMemo(
    () => (includeRuib ? [...corePlaces, ...ruibPlaces] : corePlaces),
    [includeRuib, ruibPlaces],
  );

  return {
    places,
    corePlaces,
    isLoadingRuib,
    ruibError,
  };
}
