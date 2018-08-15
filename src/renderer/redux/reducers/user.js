import * as ActionTypes from '~actions/user'

const initialState = {
    profile: {},
    initialed: false
}

export const userInfo = (state = initialState, {type,payload})=>{
    switch (type){
        case ActionTypes.SET_PROFILE:
           return {...state,...{profile:payload}}
        case ActionTypes.CHANGE_STATUS:
           return {...state,...{initialed:payload}}
        default : 
           return state
    }
}