import {IEventCart} from "../types/event.type";
import _ from 'lodash';

export function isBetweenDates(startDateStr: string, endDateStr: string) {
    const currentDate = new Date(); // Current date and time
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    return _.inRange(currentDate.getTime(), startDate.getTime(), endDate.getTime() + 1);
}


export function shuffle(array: any) {
    // Loop through the array from the last element to the first
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at index i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function isAfter8pm(): boolean {
    const currentHour = new Date().getHours();
    return _.inRange(currentHour, 0, 8) || _.inRange(currentHour, 20, 24);
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
    return _.uniqBy(events, function (event) {
        return event.user.id
    });
}

export function compareArrayObjects<T>(arr1: T[], arr2: T[], comparisonProp: keyof T
): boolean {
    return _.some(arr1, (obj1) =>
        _.some(arr2, (obj2) => _.isEqual(obj1[comparisonProp], obj2[comparisonProp]))
    );
}

export function removeDuplicatesByValues<T extends Record<string, any>>(arr: T[], key: keyof T): T[] {
    return _.uniqBy(arr, key);
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

export  function uniqForMapMarker(events: IEventCart[]): IEventCart[] {
    const seenIds = new Set();
    const result = events.reduce<IEventCart[]>((acc, event) => {
        const { startDate, endDate, user } = event;
        const category = isBetweenDates(startDate, endDate) ? 'live' : 'upcoming';

        if (!seenIds.has(user.id)) {
            seenIds.add(user.id);
            if (category === 'live') {
                acc.unshift(event); // Prioritize live events
            } else {
                acc.push(event);
            }
        }
        return acc;
    }, []);

    return result;
}

const share = () =>{

}
