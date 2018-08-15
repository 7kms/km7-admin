import React from 'react'
import { Spin} from 'antd'
import classNames from 'classnames/bind'
import styles from './style.less'
let cx = classNames.bind(styles)


export default class Loading extends React.PureComponent{
    render(){
        const {tip,absolute} = this.props;
        return (
            <div className={cx("km7-loading-wrap","flex-center",{'absolute': !!absolute})}><Spin tip={tip || 'loading'}/></div>
        )
    }
}