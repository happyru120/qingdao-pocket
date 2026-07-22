import { useEffect, useMemo, useRef, useState } from 'react';
import type { Place } from '../types';

type AmapPlacesMapProps = {
  places: Place[];
  selectedPlaceId?: string;
  onSelectPlace: (placeId: string) => void;
};

export type AmapPoi = {
  location?: unknown;
};

export type AmapSearchResult = {
  poiList?: {
    pois?: AmapPoi[];
  };
};

export type AmapMarker = {
  on: (eventName: string, handler: () => void) => void;
  setLabel: (options: { direction: string; offset: unknown; content: string }) => void;
  setMap: (map: null) => void;
};

export type AmapMap = {
  clearMap: () => void;
  destroy: () => void;
  setFitView: () => void;
};

export type AmapConstructor = {
  Map: new (container: HTMLDivElement, options: Record<string, unknown>) => AmapMap;
  Marker: new (options: Record<string, unknown>) => AmapMarker;
  Pixel: new (x: number, y: number) => unknown;
  Polyline: new (options: Record<string, unknown>) => { setMap: (map: null) => void };
  plugin: (plugins: string[], callback: () => void) => void;
  PlaceSearch: new (
    options: Record<string, unknown>,
  ) => {
    search: (keyword: string, callback: (status: string, result: AmapSearchResult | string) => void) => void;
  };
};

declare global {
  interface Window {
    AMap?: AmapConstructor;
    _AMapSecurityConfig?: {
      securityJsCode?: string;
    };
  }
}

let amapLoaderPromise: Promise<AmapConstructor> | null = null;

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function loadAmap(apiKey: string, securityCode?: string): Promise<AmapConstructor> {
  if (window.AMap) {
    return Promise.resolve(window.AMap);
  }

  if (securityCode) {
    window._AMapSecurityConfig = { securityJsCode: securityCode };
  }

  amapLoaderPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const params = new URLSearchParams({
      v: '2.0',
      key: apiKey,
      plugin: 'AMap.PlaceSearch',
    });

    script.src = `https://webapi.amap.com/maps?${params.toString()}`;
    script.async = true;
    script.onload = () => {
      if (window.AMap) {
        resolve(window.AMap);
        return;
      }
      reject(new Error('AMap 객체를 불러오지 못했어.'));
    };
    script.onerror = () => reject(new Error('AMap 스크립트 로드에 실패했어.'));
    document.head.append(script);
  });

  return amapLoaderPromise;
}

export function AmapPlacesMap({ places, selectedPlaceId, onSelectPlace }: AmapPlacesMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<AmapMap | null>(null);
  const markersRef = useRef<AmapMarker[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'missing-key' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_AMAP_JS_KEY as string | undefined;
  const securityCode = import.meta.env.VITE_AMAP_SECURITY_CODE as string | undefined;
  const searchSignature = useMemo(
    () => places.map((place) => `${place.id}:${place.amapKeyword}`).join('|'),
    [places],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    if (!apiKey) {
      setStatus('missing-key');
      setMessage('실제 지도를 쓰려면 .env에 VITE_AMAP_JS_KEY를 넣어야 해.');
      return;
    }

    let cancelled = false;

    setStatus('loading');
    setMessage('고덕지도에서 등록 장소 좌표를 찾는 중');

    loadAmap(apiKey, securityCode)
      .then((AMap) => {
        if (cancelled || !containerRef.current) return;

        const map = mapRef.current ?? new AMap.Map(containerRef.current, {
          zoom: 12,
          center: [120.3826, 36.0671],
          resizeEnable: true,
          viewMode: '2D',
        });

        mapRef.current = map;
        map.clearMap();
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        AMap.plugin(['AMap.PlaceSearch'], () => {
          const placeSearch = new AMap.PlaceSearch({
            city: '青岛',
            citylimit: false,
            pageSize: 1,
          });

          const searchPlaces = places.filter((place) => !place.coordinates);
          let pending = searchPlaces.length;
          let found = 0;

          places
            .filter((place) => place.coordinates)
            .forEach((place) => {
              found += 1;
              const marker = new AMap.Marker({
                map,
                position: [place.coordinates!.lng, place.coordinates!.lat],
                title: place.nameKo,
                anchor: 'bottom-center',
              });

              marker.setLabel({
                direction: 'bottom',
                offset: new AMap.Pixel(0, 4),
                content: `<div class="amap-pin-label">${escapeHtml(place.nameKo)}</div>`,
              });
              marker.on('click', () => onSelectPlace(place.id));
              markersRef.current.push(marker);
            });

          if (pending === 0) {
            if (found > 0) {
              map.setFitView();
            }
            setStatus('ready');
            setMessage(found > 0 ? `${found}곳을 좌표로 표시했어.` : '표시할 장소가 없어.');
            return;
          }

          searchPlaces.forEach((place) => {
            placeSearch.search(place.amapKeyword, (searchStatus, result) => {
              if (cancelled) return;

              pending -= 1;
              const pois = typeof result === 'string' ? [] : result.poiList?.pois ?? [];
              const location = searchStatus === 'complete' ? pois[0]?.location : undefined;

              if (location) {
                found += 1;
                const marker = new AMap.Marker({
                  map,
                  position: location,
                  title: place.nameKo,
                  anchor: 'bottom-center',
                });

                marker.setLabel({
                  direction: 'bottom',
                  offset: new AMap.Pixel(0, 4),
                  content: `<div class="amap-pin-label">${escapeHtml(place.nameKo)}</div>`,
                });
                marker.on('click', () => onSelectPlace(place.id));
                markersRef.current.push(marker);
              }

              if (pending === 0) {
                if (found > 0) {
                  map.setFitView();
                  setStatus('ready');
                  setMessage(`${found}곳을 지도에 표시했어.`);
                  return;
                }

                setStatus('error');
                setMessage('고덕지도에서 표시할 POI를 찾지 못했어. 검색어를 확인해야 해.');
              }
            });
          });
        });
      })
      .catch((error: Error) => {
        if (cancelled) return;
        setStatus('error');
        setMessage(error.message);
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey, onSelectPlace, places, searchSignature, securityCode]);

  useEffect(() => {
    if (!selectedPlaceId || !mapRef.current) return;
    const selectedPlace = places.find((place) => place.id === selectedPlaceId);
    if (selectedPlace) {
      setMessage(`${selectedPlace.nameKo} 선택됨`);
    }
  }, [places, selectedPlaceId]);

  useEffect(() => () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    mapRef.current?.destroy();
    mapRef.current = null;
  }, []);

  return (
    <div className="amap-places-map">
      <div ref={containerRef} className="amap-places-map__canvas" />
      {status !== 'ready' || message ? (
        <p className={`amap-map-status amap-map-status--${status}`} role="status">{message}</p>
      ) : null}
    </div>
  );
}
