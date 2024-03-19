export const SERVER_URL = 'http://localhost:3000/api/'

export const IMAGE_MAIN = 'images'

const EVENT_MAIN = 'event'
export const IMAGES = {
    GET_IMAGES: `${EVENT_MAIN}/imgName`
}
export const EVENTS = {
    TODAY: `${EVENT_MAIN}/today`,
    ALL: `${EVENT_MAIN}/all`,
    BY_USER_ID: `${EVENT_MAIN}/user/`
}
