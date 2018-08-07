import React , { PureComponent } from 'react';
import {Route,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '~actions/user'


const mapState2Props = ({userInfo})=>{
    return {
        userInfo
    }
}

@connect(mapState2Props,{getProfile})
export default class PrivateRoute extends PureComponent{
    // constructor({userInfo}){
    //     super()
    //     this.state = {
    //         isLogin: userInfo.profile && userInfo.profile.id
    //     }
    //     console.log('private route constructor', userInfo)
    // }
    // static getDerivedStateFromProps(props, state){

    // }
    componentDidMount(){
        // console.log('componentDidMount',arguments)
        const {userInfo:{initialed}} = this.props;
        if(!initialed){
            this.props.getProfile()
        }
    }
    componentWillUnmount(){
        console.log('componentWillUnmount',arguments)
    }
    render(){
        const {userInfo:{initialed,profile}} = this.props;
        console.log('private route render', initialed, profile)        
        if(profile.id){
            return <Route {...this.props} />
        }else if(!initialed){
            return <span>loading</span>
        }
        return <Redirect to='/login'/>
    }
}







