import React, {PureComponent} from 'react';
import {Render,unmountComponentAtNode} from 'react-dom';
import { Button, Icon } from 'antd';
import Loading from '~components/loading'
import classNames from 'classnames/bind'
import styles from '~less/login.less'
let cx = classNames.bind(styles)


let div = null;
const getDomInstance = ()=>{
    if(!div){
        div = document.createElement('div')
    }
    return div;
}

export default (Content,onResolve)=>{
    class Dialog extends PureComponent{
        ok = ()=>{
            let result = this.$content.check();
            if(typeof result != undefined){
                this.props.onDestroy(result);
            }
        }
        cancel = ()=>{
            this.props.onDestroy(false)
        }
        render(){
            return (<div className={cx('bg')}>
                <div className={cx('content')}>
                    <Content ref={node=>this.$content=node}/>
                </div>
                <div className={cx('actions')}>
                    <Button onClick={this.ok} type="primary">ok</Button>
                    <Button onClick={this.cancel}>cancel</Button>
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
    Render(<Dialog onDestroy={destroy}/>, div);
    return remove();
}
