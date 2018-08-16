import React, {PureComponent} from 'react';
import {render,unmountComponentAtNode} from 'react-dom';
import { Button } from 'antd';
import classNames from 'classnames/bind'
import styles from './style.less'
let cx = classNames.bind(styles)


let div = null;
const getDomInstance = ()=>{
    if(!div){
        div = document.createElement('div')
    }
    return div;
}

/**
 * @params ContentFromComponent 必须是Form.crate()包装过后的组件且提供check方法
 * @params {Object}initialProps 初始化参数
 * @params {Function} onResolve 当点击确定之后的回调函数
 */
export default (ContentFromComponent,initialProps={},onResolve)=>{
    class Dialog extends PureComponent{
        ok = ()=>{
            let result = this.$form.check();
            if(typeof result != 'undefined'){
                this.props.onDestroy(result);
            }
        }
        cancel = ()=>{
            this.props.onDestroy()
        }
        render(){
            return (<div className={cx('wrap')}>
                <div className={cx('content')}>
                    <ContentFromComponent wrappedComponentRef={(form) => this.$form = form} initInfo = {{...initialProps}}/>
                    <div className={cx('actions','flex')}>
                        <Button onClick={this.cancel}>cancel</Button>
                        <Button onClick={this.ok} type="primary">ok</Button>
                    </div>
                </div>
            </div>)
        }
    }
    const div = getDomInstance();
    const remove = ()=>{
        unmountComponentAtNode(div);
        div.remove();
    }
    const destroy = (result)=>{
        if(typeof result != 'undefined'){
            onResolve && onResolve(result)
        }
        remove();
    }
    document.body.appendChild(div)
    render(<Dialog onDestroy={destroy}/>, div);
}
