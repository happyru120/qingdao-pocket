export function createAmapSearchUrl(keyword: string): string {
  const params = new URLSearchParams({
    keyword,
    city: '青岛',
    view: 'map',
    src: 'qingdao-pocket',
    callnative: '1',
  });

  return `https://uri.amap.com/search?${params.toString()}`;
}
