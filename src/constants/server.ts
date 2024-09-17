let SERVER_URL = "https://yvnow.app/api/";
// let SERVER_URL = "http://localhost:3000/api/";
export { SERVER_URL };

const EVENT_MAIN = "event";
const USER_MAIN = "user";
export const IMAGES = {
  GET_IMAGES: `${EVENT_MAIN}/imgName`,
};

export const USER = {
  ADD_PROFILE_PICTURES: `${USER_MAIN}/addProfilePictures/`,
};
export const EVENTS = {
  TODAY: `${EVENT_MAIN}/today`,
  EVENT_LIST_BY_DATE: `${EVENT_MAIN}/getEventsListByDate`,
  ALL: `${EVENT_MAIN}/all`,
  BY_USER_ID: `${EVENT_MAIN}/user/`,
  INCREMENT_View: `${EVENT_MAIN}/incrementView`,
  GET_ACTIVE_EVENTS: `${EVENT_MAIN}/getActiveFilters`,
  GET_EVENT_LIST_BY_QUERY: `${EVENT_MAIN}/getEventsListByFilters`,
};
export const FILTERS = {
  GET_ALL: "filter",
};
