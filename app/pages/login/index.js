
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
  return <header className={cx('header')}>7km blog manager</header>
}

@connect(null,{setProfile})
@Form.create()
class NormalLoginForm extends React.PureComponent {
  state = {
    loading: false
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
      try{
        this.setState({
          loading: true
        })
        const {user} = await $post('/api/user/login',values)
        this.props.setProfile(user)
        this.props.history.replace('/')
        message.success('login success');
      }catch(e){
        this.setState({
          loading: false
        })
        Modal.error({
          title: 'Error',
          content: e.result.msg,
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {loading} = this.state;
    return (
      <div className={cx('login')}>
         <Header/>
         <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: 'Please input your account!' }],
              initialValue: 'tlyspa@gmail.com'
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Account" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
              initialValue: '111111'
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