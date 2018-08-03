// import { delay } from 'redux-saga'
import * as ArticleActionTypes from '~actions/article'
import * as UserActionTypes from '~actions/user'
import { put, all, call, fork, take} from 'redux-saga/effects'
import { $get } from '~utils/api'
import IPCManager from '../ipcrenderer'


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
            pyload: list
        })
    }
}

const userWatcher = function*(){
    while(true){
        const msg = yield take(UserActionTypes.SET_PROFILE);
        console.log(msg)
        yield call (IPCManager.login);
    }
}

export default function* root() {
    yield all([
        fork(articleWatcher),
        fork(userWatcher)
    ])
}
