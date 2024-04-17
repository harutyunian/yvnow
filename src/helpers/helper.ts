import {IEventCart} from "../types/event.type";

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

export function formatNumber(number: number) {
    if (number >= 1000000) {
        return (number / 1000000).toLocaleString(undefined, {maximumFractionDigits: 1}) + 'm';
    } else if (number >= 1000) {
        return (number / 1000).toLocaleString(undefined, {maximumFractionDigits: 1}) + 'k';
    } else {
        return number.toLocaleString();
    }
}

export function removeDuplicateUsers(events: IEventCart[]) {
    const uniqueUsers: any = {};
    const result = [];

    for (const event of events) {
        const userId = event.user.id;
        if (!uniqueUsers[userId]) {
            uniqueUsers[userId] = true;
            result.push(event);
        }
    }

    return result;
}


export function compareArrayObjects<T>(arr1: T[], arr2: T[], comparisonProp: keyof T
): boolean {
    return arr1.some((obj1) => arr2.some((obj2) => obj1[comparisonProp] === obj2[comparisonProp]));
}

export function removeDuplicatesByValues<T extends Record<string, any>>(arr: T[], key: keyof T): T[] {
    return arr.filter((v, i, a) => a.findIndex(v2 => v2[key] === v[key]) === i);
}

export function isIncludedToday(date: string | Date): boolean {
    const currentDate = new Date();
    date = new Date(date)
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59); // End of today

    return date >= currentDate && date <= endOfDay;
}

export function isDateGreaterThanEndOfDay(date: Date | string): boolean {
    const currentDate = new Date();
    date = new Date(date)
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59); // End of today

    return date > endOfDay;
}
