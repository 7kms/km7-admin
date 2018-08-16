import React,{PureComponent} from 'react'

import classNames from 'classnames/bind'
import styles from '~less/article.less'
let cx = classNames.bind(styles)

export default class Article extends PureComponent{
    constructor({match}){
        super()
        let {params:{id}} = match;
        this.state = {
            isEdit: !!id
        }
    }
    render(){
        return(<div>article page</div>)
    }
}