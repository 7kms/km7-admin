import React , { PureComponent } from 'react';
import {Route,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

const mapState2Props = ({userInfo})=>{
    return {
        userInfo
    }
}

@connect(mapState2Props)
export default class PrivateRoute extends PureComponent{
    constructor({userInfo}){
        super()
        this.state = {
            isLogin: !!userInfo.id
        }
        console.log('private route constructor', userInfo)
    }
    componentDidMount(){
        console.log('componentDidMount',arguments)
    }
    componentWillUnmount(){
        console.log('componentWillUnmount',arguments)
    }
    render(){
        console.log('private route render')
        const {isLogin} = this.state;
        if(isLogin){
            return <Route {...this.props} />
        }else{
            return <Redirect to='/login'/>
        }
    }
}







