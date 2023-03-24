import { PlusOutlined } from '@ant-design/icons';
import "./Admin.css";

import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';


import { useState } from 'react';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const FormCreateProduct = () => {

  function onFinish(){
console.log("finalizado")
  }
  const [componentDisabled, setComponentDisabled] = useState(true);
  return (
    <>
      <div className='formCreateNewProduct'>
      <Form
      name='basic'
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 800,
        }}
        onFinish={onFinish()}
      >


        <Form.Item 
        className='inputsFormCreate'
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Choose a name for the new product' }]}

        >
          <Input
          placeholder="Name of product" />
        </Form.Item>

        
        <Form.Item 
          label="Console"
          name="Console"
          rules={[
            {
            required: true,
            message: "Enter the correct category"
          },
        ]}
        >
          <Select placeholder="PS5/PS4/PS3  ">
            <Select.Option value="demo">PS5</Select.Option>
            <Select.Option value="demo">PS4</Select.Option>
            <Select.Option value="demo">PS3</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Genere"      
        name="Genere"
          rules={[
            {
            required: true,
            message: "Select an genere"
          },
        ]}>
          <Select placeholder="Choose an genere">
            <Select.Option value="demo">Action</Select.Option>
            <Select.Option value="demo">Adventure</Select.Option>
            <Select.Option value="demo">Driving</Select.Option>
            <Select.Option value="demo">Sports</Select.Option>
            <Select.Option value="demo">Children</Select.Option>
            <Select.Option value="demo">Multiplayer</Select.Option>
            <Select.Option value="demo">Role </Select.Option>


          </Select>
        </Form.Item>
  
        <Form.Item label="Quantity"  
        name="Quantity"
          rules={[
            {
            required: true,
            message: "Please enter an quantity"
          },
        ]}>
          <InputNumber placeholder="1,2,3"/>
        </Form.Item>
        <Form.Item label="Description"  
        name="Description"
          rules={[
            {
            required: true,
            message: "Write some about the product"
          },
        ]}>
          <TextArea placeholder="About product" rows={4} />
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList" 
        name="Upload"
          rules={[
            {
            required: true,
            message: "Upload a picture"
          },
        ]}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Image
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item >
          <Button
          className='buttonFormCreateProduct'>Create Product</Button>
        </Form.Item>
      </Form>
      </div>

      
    </>
  );
};
export {FormCreateProduct};