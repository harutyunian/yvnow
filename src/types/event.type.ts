export interface IUser{
    id: number,
    avatar: string,
    partner: string
    address: string,
    profilePictures: string[],
    description: string,
    location:{
        lat: string | number,
        lng: string | number
    }
}


export interface IEventCart {
    id: number,
    view: number,
    imageUrls: string[],
    startDate: string,
    endDate: string,
    title: string,
    type: string,
    description: string,
    user: IUser
}
