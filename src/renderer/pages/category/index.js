import React,{PureComponent,Fragment} from 'react'
import {$get,$post,$delete,$put} from '~utils/api'
import {Button,Tag,Icon,Tooltip,Modal,message} from 'antd';
import Loading from '~components/loading'
import Dialog from '~components/dialog'
import CategoryBox from './categoryBox'
import TagBox from './tagBox'

import classNames from 'classnames/bind'
import styles from '~less/category.less'
let cx = classNames.bind(styles)


export default class Page extends PureComponent{
    constructor (){
        super()
        this.state = {
            loading: true
        }
    }
    init = async ()=>{
       let {list:category} =  await $get(`/api/category`)
       this.setState({
           loading: false,
           category,
           currentIndex: 0
       })
    }
    switchCate = (index)=>{
        this.setState({
            currentIndex: index
        })
    }
    onCateEdit = (cate,index)=>{
        Dialog(CategoryBox,cate, async (obj)=>{
            try{
                await $put(`/api/category/${cate.id}`, obj);  
                this.setState(({category})=>{
                    category[index] = {...category[index],...obj};
                    return {
                        category:[...category]
                    }
                });
                message.success('success updaetd');
            }catch(e){
                Modal.error({
                    title: 'error message',
                    content: JSON.stringify(e),
                });
            }
        })
    }
    onCateRemove = (cate)=>{
        Modal.confirm({
            title: `Do you Want to delete category ${cate.name}?`,
            content: 'If there is still some tags under this category, It can\'t be delete',
            onOk:async()=> {
                try{
                    await $delete(`/api/category/${cate.id}`);
                    message.success('success removed');
                    this.setState(({category})=>{
                        let newCategory = category.filter(item=>item.id !== cate.id);
                        return {
                            category: newCategory,
                            currentIndex: 0
                        }
                    })
                }catch(e){
                    Modal.error({
                        title: 'error message',
                        content: JSON.stringify(e),
                    });
                }
            }
        })
    }
    onCateAdd = ()=>{
        Dialog(CategoryBox,{},async (obj)=>{
            try{
                const {result} = await $post('/api/category', obj);
                result.tags = [];
                const {category} = this.state;
                this.setState({
                    category: [...category,result]
                })
                message.success('success created');
            }catch(e){
                Modal.error({
                    title: 'error message',
                    content: JSON.stringify(e),
                });
            }
        })
    }
    onTagRemove = (e,tag)=>{
        e.preventDefault();
        e.stopPropagation();
        Modal.confirm({
            title: `Do you Want to delete tag ${tag.name}?`,
            content: 'If it is referenced by some articles , It can\'t be delete',
            onOk:async()=> {
                try{
                    await $delete(`/api/tag/${tag.id}`);
                    this.setState(({currentIndex,category})=>{
                        let current = category[currentIndex];
                        current.tags = current.tags.filter(item=>item.id !== tag.id);
                        return {
                            category: [...category],
                            currentIndex: 0
                        }
                    })
                    message.success('success removed');
                }catch(e){
                    Modal.error({
                        title: 'error message',
                        content: JSON.stringify(e),
                    });
                }
            }
        })
    }
    onTagAdd = ()=>{
        let {currentIndex,category} = this.state;
        let current = category[currentIndex]
        Dialog(TagBox,{categoryId: current.id},async(obj)=>{
            try{
                const {result} = await $post('/api/tag', obj);
                current.tags.push(result);
                this.setState({
                    category: [...category]
                })
                message.success('success created');
            }catch(e){
                Modal.error({
                    title: 'error message',
                    content: JSON.stringify(e),
                });
            }
        })
    }
    onTagEdit = (tag,index)=>{
        let {currentIndex,category} = this.state;
        let current = category[currentIndex];
        Dialog(TagBox,{categoryId: current.id, ...tag},async(obj)=>{
            try{
                await $put(`/api/tag/${tag.id}`, obj);
                current.tags[index] = {...tag,...obj};
                this.setState({
                    category: [...category]
                })
                message.success('success created');
            }catch(e){
                Modal.error({
                    title: 'error message',
                    content: JSON.stringify(e),
                });
            }
        })
    }
    componentDidMount(){
        this.init()
    }
    render(){
        const {loading} = this.state;
        if(loading){
            return <Loading/>
        }   
        const {category,currentIndex} = this.state;
        let {tags=[]} = category[currentIndex];
        return(
            <div className={cx('flex','wrap')}>
                <div className={cx('left')}>
                    <ul className={cx('tab-list')}>
                    {
                        category.map((item,index)=>
                            <li className={cx('tab',{'active': currentIndex == index}) } key={index} onClick={()=>this.switchCate(index)}>
                                <span className={cx('tab-name')}>{item.name}</span>
                                {
                                    currentIndex == index ? <Fragment>
                                        <Tooltip title="edit">
                                            <Icon type="edit" className={cx('icon')} onClick={()=>this.onCateEdit(item,index)}/>
                                        </Tooltip>
                                        <Tooltip title="delete">
                                            <Icon type="delete" className={cx('icon')} onClick={()=>this.onCateRemove(item)}/>
                                        </Tooltip>
                                    </Fragment> : null
                                }
                            </li>)
                    }
                    </ul>
                    <Button type="primary" icon="plus" onClick={this.onCateAdd} block="true">Add Category</Button>
                </div>
                <div className={cx('right')}>
                    <div className={cx('tag-list')}>
                        {tags.map((item,index)=><Tag key={index} closable="true" onClick={()=>this.onTagEdit(item,index)} onClose={(e)=>this.onTagRemove(e,item)} className={cx('tag')}>{item.name}</Tag>)}
                    </div>
                    <Button type="primary" icon="plus" className={cx('tag-add')} onClick={this.onTagAdd}>Add Tag</Button>
                </div>
            </div>)
    }
}