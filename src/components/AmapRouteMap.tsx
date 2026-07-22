import { type MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import {
  type AmapConstructor,
  type AmapMap,
  type AmapMarker,
  type AmapSearchResult,
  loadAmap,
} from './AmapPlacesMap';

export type RouteWaypoint = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  time: string;
  keyword: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

type AmapRouteMapProps = {
  waypoints: RouteWaypoint[];
};

type RouteOverlay = {
  setMap: (map: null) => void;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function markerContent(order: number) {
  return `<div class="amap-route-number">${order}</div>`;
}

function drawRoute(
  AMap: AmapConstructor,
  map: AmapMap,
  points: Array<{ waypoint: RouteWaypoint; position: unknown }>,
  markersRef: MutableRefObject<AmapMarker[]>,
  overlaysRef: MutableRefObject<RouteOverlay[]>,
) {
  points
    .sort((a, b) => a.waypoint.order - b.waypoint.order)
    .forEach(({ waypoint, position }) => {
      const marker = new AMap.Marker({
        map,
        position,
        title: waypoint.title,
        anchor: 'bottom-center',
        content: markerContent(waypoint.order),
      });

      marker.setLabel({
        direction: 'bottom',
        offset: new AMap.Pixel(0, 8),
        content: `<div class="amap-route-label">${escapeHtml(waypoint.title)}</div>`,
      });
      markersRef.current.push(marker);
    });

  if (points.length >= 2) {
    const polyline = new AMap.Polyline({
      map,
      path: points.sort((a, b) => a.waypoint.order - b.waypoint.order).map((point) => point.position),
      strokeColor: '#6600e5',
      strokeWeight: 5,
      strokeOpacity: 0.72,
      strokeStyle: 'solid',
      lineJoin: 'round',
    });
    overlaysRef.current.push(polyline);
  }

  if (points.length > 0) {
    map.setFitView();
  }
}

export function AmapRouteMap({ waypoints }: AmapRouteMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<AmapMap | null>(null);
  const markersRef = useRef<AmapMarker[]>([]);
  const overlaysRef = useRef<RouteOverlay[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'missing-key' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_AMAP_JS_KEY as string | undefined;
  const securityCode = import.meta.env.VITE_AMAP_SECURITY_CODE as string | undefined;
  const waypointSignature = useMemo(
    () => waypoints.map((waypoint) => `${waypoint.id}:${waypoint.keyword}`).join('|'),
    [waypoints],
  );

  useEffect(() => {
    if (!containerRef.current) return;

    if (!apiKey) {
      setStatus('missing-key');
      setMessage('실제 지도는 AMap 키를 넣으면 표시돼. 아래 순서 카드로 먼저 확인해.');
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setMessage('첫날 루트를 고덕지도에 찍는 중');

    loadAmap(apiKey, securityCode)
      .then((AMap) => {
        if (cancelled || !containerRef.current) return;

        const map = mapRef.current ?? new AMap.Map(containerRef.current, {
          zoom: 10,
          center: [120.365, 36.16],
          resizeEnable: true,
          viewMode: '2D',
        });

        mapRef.current = map;
        map.clearMap();
        markersRef.current.forEach((marker) => marker.setMap(null));
        overlaysRef.current.forEach((overlay) => overlay.setMap(null));
        markersRef.current = [];
        overlaysRef.current = [];

        AMap.plugin(['AMap.PlaceSearch'], () => {
          const points: Array<{ waypoint: RouteWaypoint; position: unknown }> = [];
          const searchWaypoints = waypoints.filter((waypoint) => !waypoint.coordinates);
          let pending = searchWaypoints.length;

          waypoints
            .filter((waypoint) => waypoint.coordinates)
            .forEach((waypoint) => {
              points.push({
                waypoint,
                position: [waypoint.coordinates!.lng, waypoint.coordinates!.lat],
              });
            });

          if (pending === 0) {
            drawRoute(AMap, map, points, markersRef, overlaysRef);
            setStatus('ready');
            setMessage('첫날 루트 1→2→3을 지도에 표시했어.');
            return;
          }

          const placeSearch = new AMap.PlaceSearch({
            city: '青岛',
            citylimit: false,
            pageSize: 1,
          });

          searchWaypoints.forEach((waypoint) => {
            placeSearch.search(waypoint.keyword, (searchStatus, result) => {
              if (cancelled) return;

              pending -= 1;
              const pois = typeof result === 'string' ? [] : (result as AmapSearchResult).poiList?.pois ?? [];
              const location = searchStatus === 'complete' ? pois[0]?.location : undefined;

              if (location) {
                points.push({ waypoint, position: location });
              }

              if (pending === 0) {
                if (points.length > 0) {
                  drawRoute(AMap, map, points, markersRef, overlaysRef);
                  setStatus('ready');
                  setMessage(`첫날 루트 ${points.length}곳을 지도에 표시했어.`);
                  return;
                }

                setStatus('error');
                setMessage('고덕지도에서 루트 장소를 찾지 못했어.');
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
  }, [apiKey, securityCode, waypointSignature, waypoints]);

  useEffect(() => () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    markersRef.current = [];
    overlaysRef.current = [];
    mapRef.current?.destroy();
    mapRef.current = null;
  }, []);

  return (
    <section className="day-route-map">
      <div className="day-route-map__canvas" ref={containerRef} />
      {status !== 'ready' || message ? (
        <p className={`amap-map-status amap-map-status--${status}`} role="status">{message}</p>
      ) : null}

      <ol className="day-route-fallback" aria-label="첫날 루트 순서">
        {waypoints.map((waypoint) => (
          <li key={waypoint.id}>
            <span>{waypoint.order}</span>
            <div>
              <strong>{waypoint.title}</strong>
              <p>{waypoint.time} · {waypoint.subtitle}</p>
            </div>
            <MapPin size={16} aria-hidden="true" />
          </li>
        ))}
      </ol>
    </section>
  );
}
