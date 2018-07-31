
export const FETCH_ARTICLE_LIST = 'FETCH_ARTICLE_LIST'
export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST'

export const REQUEST_ARTICLE = 'REQUEST_ARTICLE'

export const EMPTY_ARTICLE_LIST = 'EMPTY_ARTICLE_LIST'

const action = (type, payload = {}) =>{
    return {type, ...payload}
}

export const fetchArticleList = (params)=>action(FETCH_ARTICLE_LIST,params)