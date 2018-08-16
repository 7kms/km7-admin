import React,{PureComponent} from 'react'
import {Switch, Route} from 'react-router-dom'
import $private from '~service/private'
import PageLayout from '../layout'
import {fetchArticleList} from '~actions/article'
import {connect} from 'react-redux'
import {$get} from '~utils/api'
import {Button,List,Tag} from 'antd'
import ArticlePage from '../article'
import CategoryPage from '../category'

import classNames from 'classnames/bind'
import styles from '~less/main.less'
let cx = classNames.bind(styles)


@connect(null,{fetchArticleList})
class Main extends PureComponent{
    constructor(){
        super();
        this.state = {
            params:{},
            nav: [],
            category: {},
            list: []
        }
    }
    getList = async ()=>{
        const {category} = this.state;
        const {list} = await $get(`/api/article/list/${category.key}`);
        this.setState({list})
    }
    getNav = async ()=>{
       const {list} = await $get('/api/nav');
       this.setState({
           nav: list,
           category: list[0]
       },()=>{
        this.getList()
       })
    }
    changeNav = (nav)=>{
        this.setState({
            category: nav
        },()=>{
            this.getList()
        })
    }
    goDetail = (item)=>{
        this.props.history.push(`/article/${item.id}`)
    }
    componentDidMount(){
        // fetchArticleList()
        this.getNav();
    }
    componentWillUnmount(){
        console.log('componentWillUnmount mainpage')
    }
    render(){
        const {nav,category,list} = this.state;
        console.log('render',list)
        return (<div className={cx('wrap')}>
            {nav.map((item,index)=><Button key={index} type={category.id == item.id ? 'primary' : 'default'}  onClick={()=>this.changeNav(item)}>{item.name}({item.count})</Button>)}
            <List 
                itemLayout="vertical"
                size="large"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                      onClick = {()=>this.goDetail(item)}
                      className={cx('item')}
                      key={item.id}
                      actions={item.tags.map((tag,index)=><Tag key={index}>{tag.name}</Tag>)}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                            />
                    </List.Item>
                  )}
            />
        </div>)
    }
}


@$private
export default class Page extends PureComponent{
    render(){
        return (
            <PageLayout>
                <Switch>
                    <Route path="/" component={Main} exact/>
                    <Route path="/article/:id?" component={ArticlePage} exact/>
                    <Route path="/category" component={CategoryPage} exact/>
                </Switch>
            </PageLayout>
        )
    }
}