
import React from 'react';
import {connect} from 'react-redux'
import { $post } from '~utils/api'
import { Form, Icon, Input, Button, message , Modal} from 'antd';
import { setProfile } from '~actions/user'

import classNames from 'classnames/bind'
import styles from '~less/login.less'
let cx = classNames.bind(styles)


const FormItem = Form.Item;

const Header = ()=>{
  return <header className={cx('header')}>manager</header>
}

@connect(null,{setProfile})
@Form.create()
class NormalLoginForm extends React.PureComponent {
  state = {
    loading: false,
    info:{}
  }
  login = async (values)=>{
    values = values || this.state.info;
    try{
      this.setState({
        loading: true
      })
      const {user} = await $post('/api/user/login',values)
      window.$storage.setEncryptoJSON('ul', values)
      this.props.setProfile(user)
      this.props.history.replace('/')
      message.success('login success');
    }catch(e){
      console.log(e)
      this.setState({
        loading: false
      })
      Modal.error({
        title: 'Error',
        content: JSON.stringify(e),
      });
    }
  }
  handleSubmit = (e) => {
    let {loading} = this.state;
    if(loading){
      return false;
    }
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if(err){
        return false;
      }
      this.login(values)
    });
  }
  componentDidMount(){
    let storeAccountInfo = window.$storage.getEncryptoJSON('ul');
    this.setState({info: storeAccountInfo},()=>{
      this.login()
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {loading,info} = this.state;
    return (
      <div className={cx('login')}>
         <Header/>
         <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: 'Please input your account!' }],
              initialValue: info.account
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Account" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue: info.password
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
          <Button type="primary" htmlType="submit"  className={cx('login-form-button','btn')} loading={loading}>Log in</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default NormalLoginForm