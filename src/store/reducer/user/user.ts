import {createSlice,PayloadAction} from "@reduxjs/toolkit"
import { IUser } from "../../../types/event.type"

interface Aper{

}
const initialState:IUser = {
    id: 0,
    avatar: '',
    partner: '',
    address: '',
    location:{
        lat: '',
        lng: ''
    },
}
export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser(_,action: PayloadAction<IUser>){
            return {...action.payload}
        }
    }
})

export const {setUser} = userReducer.actions
export default userReducer.reducer