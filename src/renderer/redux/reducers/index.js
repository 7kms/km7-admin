import {combineReducers} from 'redux'
import * as Article from './article'
import * as User from './user'




export default combineReducers({...Article, ...User})