import React,{PureComponent} from 'react'
import { Form, Input } from 'antd';

const FormItem = Form.Item;


@Form.create()
class TagForm extends PureComponent {
    constructor({initInfo}){
        super()
        this.state = {initInfo}
    }
    check = ()=>{
        let result;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result = values;
            }
        });
        return result
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {initInfo} = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('categoryId', {
                        initialValue: initInfo.categoryId,
                        rules: [{ required: true, message: 'Please input categoryId!' }],
                    })(
                        <Input placeholder="key" disabled/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('name', {
                        initialValue: initInfo.name,
                        rules: [{ required: true, message: 'Please input tag name!' }],
                    })(
                        <Input placeholder="name" />
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default TagForm
