// import { delay } from 'redux-saga'
import * as ArticleActionTypes from '~actions/article'
import * as UserActionTypes from '~actions/user'
import { put, all, call, fork, take} from 'redux-saga/effects'
import { $get } from '~utils/api'

/**
 * 
 * watcher saga
 */
const fetchArticleWatcher = function*(){
    while(true){
        const {params} = yield take(ArticleActionTypes.fetchArticleList)
        const {list} = yield call ($get,'/api/article', params);
        yield put({
            type: ArticleActionTypes.SET_ARTICLE_LIST,
            pyload: {
                list
            }
        })
    }
}

const loginWatcher = function*(){
    while(true){
        const {params} = yield take(UserActionTypes.LOGIN)
        const {user} = yield call ($get,'/api/user/login', params);
        yield put({
            type: UserActionTypes.SET_PROFILE,
            pyload: {
                user
            }
        })
    }
}

export default function* root() {
    yield all([
        fork(fetchArticleWatcher),
        fork(loginWatcher)
    ])
}