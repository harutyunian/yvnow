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

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
