// import { delay } from 'redux-saga'
import * as ArticleActionTypes from '~actions/article'
import * as UserActionTypes from '~actions/user'
import { put, all, call, fork, take, takeEvery} from 'redux-saga/effects'
import { $get } from '~utils/api'
import IPCManager from '~ipc'


const getProfile = function*(){
    console.log('* getProfile')
    let user = null;
    try{
      let res = yield call ($get,'/api/user/profile')
      user = res.user;
    }catch(e){
        console.log(e)
    }
    console.log('--------------',user)
    if(user){
        yield put({
            type: UserActionTypes.SET_PROFILE,
            payload:user
        })
    }else{
        yield put({
            type: UserActionTypes.CHANGE_STATUS,
            payload: true
        })
    }
}


/**
 * 
 * watcher saga
 */
const articleWatcher = function*(){
    while(true){
        const {params} = yield take(ArticleActionTypes.FETCH_ARTICLE_LIST)
        const {list} = yield call ($get,'/api/article', params);
        yield put({
            type: ArticleActionTypes.SET_ARTICLE_LIST,
            payload: list
        })
    }
}

const userWatcher = function*(){
    yield takeEvery(UserActionTypes.GET_PROFILE,getProfile);
    yield takeEvery(UserActionTypes.SET_PROFILE,IPCManager.login);
}

export default function* root() {
    yield all([
        fork(articleWatcher),
        fork(userWatcher)
    ])
}
