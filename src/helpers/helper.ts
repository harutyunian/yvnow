export function isBetweenDates(startDateStr: string, endDateStr: string) {
  const currentDate = new Date(); // Current date and time
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  return currentDate >= startDate && currentDate <= endDate;
}
export function isAfter8pm(): boolean {
  const currentHour = new Date().getHours();
  return currentHour >= 20 || currentHour < 8;
}

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
export const calculateViewportCorners = (region: IRegion) => {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = region;

  const north = latitude + latitudeDelta / 2;
  const south = latitude - latitudeDelta / 2;
  const east = longitude + longitudeDelta / 2;
  const west = longitude - longitudeDelta / 2;

  return { north, south, east, west };
};
