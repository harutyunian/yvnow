export interface IUser {
    id: number,
    avatar: string,
    partner: string
    address: string,
    profilePictures: string[],
    description: string,
    location: {
        lat: string | number,
        lng: string | number
    }
}

export interface IFilters {
    id: number,
    am: string,
    ru: string,
    en: string
}

export interface IEventCart {
    id: number,
    view: number,
    imageUrls: string[],
    startDate: string,
    endDate: string,
    title: string,
    filters: IFilters[],
    type: 'show' | 'event' | 'concert',
    description: string,
    user: IUser
}
