export interface IUser{
    id: number,
    avatar: string,
    partner: string
    address: string,
    location:{
        lat: string | number,
        lng: string | number
    }
}


export interface IEventCart {
    id: number,
    imageUrls: string[],
    startDate: string,
    endDate: string,
    title: string,
    description: string,
    user: IUser
}