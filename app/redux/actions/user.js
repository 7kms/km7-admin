export const USER_LOGIN = 'USER_LOGIN'
export const GET_PROFILE = 'GET_USER_PROFILE'
export const SET_PROFILE = 'SET_USER_PROFILE'

export const login = (payload = {})=>{
    return {
        type: USER_LOGIN,
        payload
    }
}


export const profile = (payload = {})=>{
    return {
        type: GET_PROFILE,
        payload
    }
}


export const setProfile = (payload = {})=>{
    return {
        type: SET_PROFILE,
        payload
    }
}