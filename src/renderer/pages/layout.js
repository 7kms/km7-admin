import React,{PureComponent} from 'react'
import { Layout, Menu, Icon } from 'antd';
import { MENU } from '~data';
import {withRouter} from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


@withRouter
class Page extends PureComponent{
  state = {
    collapsed: false,
  };
  getMenuByKey = (key)=>{
    let arr = key.split('-');
    let item = arr.reduce((base,current)=>{
      let next = base[current];
      return next.children || next;
    },MENU)
    return item
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  onMenuClick = ({key} )=>{
    let item = this.getMenuByKey(key);
    console.log(item.path)
    const {location,history} = this.props;
    if(item.path != location.pathname){
      history.replace(item.path)
    }
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu 
            onClick={this.onMenuClick}
            theme="dark" 
            defaultSelectedKeys={['0-0']} 
            defaultOpenKeys={['0']}
            mode="inline">
            {
              MENU.map((item,index1)=>{
                if(item.children){
                  return <SubMenu key={index1} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                            {item.children.map((obj,index2)=>
                            <Menu.Item 
                              key={`${index1}-${index2}`}><Icon type={obj.icon} /><span>{obj.title}</span>
                            </Menu.Item>)}
                          </SubMenu>
                }else{
                  return  <Menu.Item key={index1}><Icon type={item.icon} /><span>{item.title}</span></Menu.Item>
                }
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}



export default Page;