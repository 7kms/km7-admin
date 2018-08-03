import * as ActionTypes from '~actions/user'

const initialState = {}

export const userInfo = (state = initialState, {type,payload})=>{
    console.log(type,payload)
    switch (type){
        case ActionTypes.SET_PROFILE:
           return {...state,...payload}
        default : 
           return state
    }
}