import axios from 'axios';
import { API_TIMEOUT, SERVERURL} from '../config';
import { isServer} from './index';
let globalCookie = ''
let generateUrl = (url) => {
    return url 
}

let headerConfig = ()=>{
    let obj = {
        headers : {
            'Content-Type': 'application/json'
        }
    };
    return obj
}

let CancelToken = axios.CancelToken;

const baseObj = {
    timeout: API_TIMEOUT,
    // withCredentials: true,
    responseType: 'json'
}

const errorProcess = (error)=>{
    // console.log(err);
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return Promise.reject(error.response.data)
      } else {
        return Promise.reject(error.message)
      }
   
}

const successProcess = (res)=>{
    return Promise.resolve(res.data.result)
}

const $apiProcess = (httpConfig)=>{
    return axios(httpConfig).then(successProcess).catch(errorProcess)
}

export const createCancelTokenSource = ()=>{
    return CancelToken.source();
}

const generateRequestObj = (method,url,paramsObj,cancelToken,noToken)=>{
    let obj = {
        method: method,
        url: generateUrl(url),
        baseURL: SERVERURL,
        cancelToken
    };
    if(method === 'get'){
        obj.params = {params: JSON.stringify(paramsObj)}
    }else{
        obj.data = paramsObj
    }
    return Object.assign({},baseObj,obj,headerConfig(noToken))
}

export const $get = (url, paramsObj={}, cancelToken)=>{
   if(isServer()){
        return $getwithCustomCookie(url, paramsObj)
   }
   let configObj = generateRequestObj('get',url,paramsObj,cancelToken);
   return $apiProcess(configObj)
}

export const $getwithCustomCookie = (url, paramsObj={}, cookie=globalCookie)=>{
    let configObj = generateRequestObj('get',url,paramsObj);
    configObj.headers.Cookie = cookie;
    configObj.withCredentials =  true;
    return $apiProcess(configObj)
 }

export const $post = (url, paramsObj={}, cancelToken)=>{
    let configObj = generateRequestObj('post',url,paramsObj,cancelToken);
    return $apiProcess(configObj)
}
export const $put = (url, paramsObj={}, cancelToken)=>{
    let configObj = generateRequestObj('put',url,paramsObj,cancelToken);
    return $apiProcess(configObj)
}
export const $postwithoutauthor = (url, paramsObj={}, cancelToken)=>{
    let configObj = generateRequestObj('post',url,paramsObj,cancelToken,true);
    return $apiProcess(configObj)
}

export const $postwithformdata= (url, paramsObj={})=>{
    let arr = [];
    for(let i in paramsObj){
        if(paramsObj[i] && paramsObj.hasOwnProperty(i)){
            arr.push(`${i}=${encodeURIComponent(paramsObj[i])}`);
        }
    }
    let configObj = Object.assign({},baseObj,{
        method: 'post',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        url: generateUrl(url),
        baseURL: SERVERURL,
        data: arr.join('&')
    })
    return $apiProcess(configObj)
}

export const $delete = (url, paramsObj={}, cancelToken)=>{
    let configObj = generateRequestObj('delete',url,paramsObj,cancelToken);
    return $apiProcess(configObj)
}


export const setInitialCookies = (cookies)=>{
    globalCookie = cookies
}