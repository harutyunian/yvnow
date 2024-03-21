
let SERVER_URL = 'https://yvnow-backend-dd881ec4a27b.herokuapp.com/api/'

export {SERVER_URL}

const EVENT_MAIN = 'event'
export const IMAGES = {
    GET_IMAGES: `${EVENT_MAIN}/imgName`
}
export const EVENTS = {
    TODAY: `${EVENT_MAIN}/today`,
    ALL: `${EVENT_MAIN}/all`,
    BY_USER_ID: `${EVENT_MAIN}/user/`,
    INCREMENT_View: `${EVENT_MAIN}/incrementView`
}
