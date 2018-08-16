import React,{PureComponent,Fragment} from 'react'
import {$get,$post,$delete,$put} from '~utils/api'
import { Select,Checkbox,Input,Button,Modal,message } from 'antd';
import Loading from '~components/loading'
import classNames from 'classnames/bind'
import styles from '~less/article.less'
let cx = classNames.bind(styles)
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;


class CategoryBox extends PureComponent{
    constructor({list,categoryId='',tags=''}){
        super();
        this.state = {
            list,
            categoryId,
            tags:tags.split('-').filter(item=>!!item)
        }
    }
    onChangeCate = (value)=>{
        console.log(value)
        this.setState({
            categoryId: value
        })
        // this.props.onChange({
        //     categoryId: value,
        //     tags: ''
        // })
    }
    onChangeTags = (checkedValues)=>{
        console.log(checkedValues)
        this.setState({
            tags: checkedValues
        })
    }
    getCurrentOptions = ()=>{
        const {list,categoryId} = this.state;
        let arr = [];
        let obj = list.find(item=>item.id == categoryId);
        if(obj){
            arr = obj.tags.map(tag=>({label:tag.name,value:tag.id}))
        }
        return arr
    }
    getData = ()=>{
        let {categoryId,tags} = this.state;
        return {categoryId,tags: tags.join('-')}
    }
    render(){
        const {list,tags,categoryId} = this.state;
        return(
        <div className={cx('article-item')}>
            <h3 className={cx('dfn')}>Select Category and Tags</h3>
            <div className={cx('dfn-item')}>
                <label className={cx('dfn-label')}>Category</label>
                <Select value={categoryId} style={{ width: 120 }} onChange={this.onChangeCate}>
                    {list.map((cate,index)=><Option value={cate.id} key={index}>{cate.name}</Option>)}
                </Select>
            </div>
            <div className={cx('dfn-item')}>
                <label className={cx('dfn-label')}>Tags</label>
                <CheckboxGroup options={this.getCurrentOptions()} value={tags} onChange={this.onChangeTags} />
            </div>
        </div>)
    }
}



export default class Article extends PureComponent{
    constructor({match}){
        super()
        let {params:{id}} = match;
        this.state = {
            isEdit: !!id,
            id,
            loading: true,
            isSubming: false
        }
    }
    init = async()=>{
        let category, info = {};
        const {isEdit,id} = this.state;
        let arr = [$get(`/api/category`)]
        if(isEdit){
            arr.push($get(`/api/article/${id}`))
        }
        let res = await Promise.all(arr);
        category = res[0].list;
        if(isEdit){
            info = res[1];
        }
        this.setState({
            loading: false,
            category,
            info
        })
    }
    collectInputData = ()=>{
        let {categoryId,tags} = this.$catebox.getData();
        const obj = {categoryId,tags}
        obj.title = this.$title.input.value;
        obj.description = this.$description.input.value;
        obj.keywords = this.$keywords.input.value;
        obj.content = this.$content.textAreaRef.value;
        return obj
    }
    getArticle = async()=>{
        this.setState({loading: true})
    }
    onSelectLabel = (obj)=>{
        this.setState(({info})=>{
            return {info: {...info,...obj}}
        })
    }
    check = ()=>{
        let obj = this.collectInputData();
        let arr = Object.values(obj);
        for(let i of arr){
            if(!i){
                return false
            }
        }
        return obj;
    }
    onSubmit = async ()=>{
        let obj = this.check();
        if(!obj){
            Modal.error({
                title: 'error message',
                content: 'Something is empty'
            });
            return false;
        }
        try{
            let res = await $post('/api/article',obj);
            console.log(res);
            message.success('success created');
        }catch(e){
            Modal.error({
                title: 'error message',
                content: JSON.stringify(e),
            });
        }
    }
    componentDidMount(){
       this.init()
    }
    render(){
        const {loading} = this.state;
        if(loading){
            return <Loading/>
        }
        const {category,info} = this.state;
        return(<div className={cx('wrap')}>
        <div className={cx('article-item')}>
            <h3 className={cx('dfn')}>Article Header</h3>
            <div className={cx('dfn-item')}>
                <label className={cx('dfn-label')}>Title</label>
                <Input defaultValue={info.title} placeholder="Please input title" 
                ref={(node)=>this.$title = node}/>
            </div>
            <div className={cx('dfn-item')}>
                <label className={cx('dfn-label')}>Description</label>
                <Input defaultValue={info.description} ref={(node)=>this.$description = node} placeholder="Please input description" />
            </div>
            <div className={cx('dfn-item')}>
                <label className={cx('dfn-label')}>Keywords</label>
                <Input defaultValue={info.keywords} ref={(node)=>this.$keywords = node} placeholder="Please input keywords split by ','" />
            </div>
        </div>
        <CategoryBox ref={(node)=>this.$catebox = node} list={category} categoryId={info.categoryId} tags={info.tags} onChange={this.onSelectLabel}/>
        <div className={cx('article-item')}>
            <h3 className={cx('dfn')}>Article Content</h3>
            <TextArea defaultValue={info.content} ref={(node)=>this.$content = node} placeholder="Input whole article content in mark down" autosize={{ minRows: 5 }} />
        </div>
        <Button type="primary" loading={this.state.isSubming} onClick={this.onSubmit}>Submit</Button>
        </div>)
    }
}