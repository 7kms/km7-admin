import React , { PureComponent } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile } from '~actions/user'
import Loading from '~components/loading'




export default (OriginComponent)=>{
    const mapState2Props = ({userInfo})=>{
        return {
            userInfo
        }
    }
    @connect(mapState2Props,{getProfile})
    class Private extends PureComponent{
        componentDidMount(){
            const {userInfo:{initialed}} = this.props;
            if(!initialed){
                this.props.getProfile()
            }
        }
        render(){
            const {userInfo:{initialed,profile}} = this.props;     
            if(profile.id){
                return <OriginComponent {...this.props}/>
            }else if(!initialed){
                return <Loading absolute={true}/>
            }
            return <Redirect to='/login'/>
        }
    }
    return Private
}