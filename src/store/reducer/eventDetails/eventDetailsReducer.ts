import {createSlice} from "@reduxjs/toolkit";
import {IEventCart} from "../../../types/event.type";


const initialState: IEventCart = {
    id: 0,
    imageUrls: [],
    startDate: '',
    view: 0,
    endDate: '',
    type: 'event',
    filters: [],
    title: '',
    description: '',
    user: {
        id: 0,
        avatar: '',
        partner: '',
        profilePictures: [],
        description: '',
        address: '',
        location: {
            lat: '',
            lng: ''
        }
    }
}

export const eventDetailsReducer = createSlice({
    name: 'evemtDetails',
    initialState,
    reducers: {
        setEventDetails(_, action) {
            return action.payload
        }
    }
})

export const {setEventDetails} = eventDetailsReducer.actions
export default eventDetailsReducer.reducer
