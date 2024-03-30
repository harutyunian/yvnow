import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import en from './../../../locales/en/en.json'
import ru from './../../../locales/ru/ru.json'
import am from './../../../locales/am/am.json'
import {langs} from './types'

type enType = typeof en
type ruType = typeof ru
type amType = typeof am

interface ITranslation {
    translation: enType | ruType | amType
}

const languages = {en, ru, am}

interface IInitialState extends ITranslation {
    lang: langs.EN | langs.RU | langs.AM
}

const initialState: IInitialState = {
    translation: am,
    lang: langs.EN
}

export const translationReducer = createSlice({
    name: "translation",
    initialState,
    reducers: {
        setLanguages(_, action: PayloadAction<langs.EN | langs.RU | langs.AM>) {
            const {payload} = action
            return {
                translation: languages[payload],
                lang: payload
            }
        }
    }
})

export const {setLanguages} = translationReducer.actions
export default translationReducer.reducer
