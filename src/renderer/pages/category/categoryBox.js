import React,{PureComponent} from 'react'
import { Form, Input } from 'antd';

const FormItem = Form.Item;


@Form.create()
class CateForm extends PureComponent {
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
                {getFieldDecorator('name', {
                    initialValue: initInfo.name,
                    rules: [{ required: true, message: 'Please input category name!' }],
                })(
                    <Input placeholder="name" />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('key', {
                    initialValue: initInfo.key,
                    rules: [{ required: true, message: 'Please input category key!' }],
                })(
                    <Input placeholder="key" />
                )}
                </FormItem>
            </Form>
        );
    }
}

export default CateForm
