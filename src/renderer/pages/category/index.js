import React,{PureComponent} from 'react'
// import {fetchArticleList} from '~actions/article'
// import {connect} from 'react-redux'
import {$get,$post} from '~utils/api'
import {Button,Tag} from 'antd'


import classNames from 'classnames/bind'
import styles from '~less/article.less'
let cx = classNames.bind(styles)

export default class Article extends PureComponent{
    init = async ()=>{
        await $get(`/api/category`)
    }
    componentDidMount(){
        this.init()
    }
    render(){
        return(<div>categroy page</div>)
    }
}