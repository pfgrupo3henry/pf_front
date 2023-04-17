import { PlusOutlined } from '@ant-design/icons';
import {postNewProduct} from "../../Redux/Actions/Index"
import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { storage } from "../../firebase/firebase-config";
const metadata = { contentType: file.type };



import "./Admin.css";

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from 'antd';





const { TextArea } = Input;

const FormCreateProduct = () => {

  const [fileList, setFileList] = useState([]);

  const handleFileListChange = async ({ fileList }) => {
    setFileList(fileList);
    return(
        await storageRef.put(file, metadata)
    )
  };
      
  const dispatch = useDispatch();


  const [formValues, setFormValues] = useState(
    {
        name: "",
        description: "",
        img: "",
        price: "",
        genre: [{name:""}],
        platform:[{name:""}],
    }
)




const handleSubmit = (event) => {
    event.preventDefault();

    handleUpload(fileList[0]).then((url) => {
      let data = {
        name: event.name,
        description: event.Description,
        quantity: event.quantity,
        img: url,
        price: event.price,
        genre: event.genre,
        platform: event.console,
      };
      console.log(data);

      dispatch(postNewProduct(data));
    });
  };


  return (
    <>
      <div className='formCreateNewProduct'>
      <Form
      onFinish={(event)=> handleSubmit(event)}
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
          name="console"
          rules={[
            {
            required: true,
            message: "Enter the correct category"
          },
        ]}
        >
          <Select placeholder="PS5/PS4/PS3  ">
            <Select.Option value="PS5">PS5</Select.Option>
            <Select.Option value="PS4">PS4</Select.Option>
            <Select.Option value="PS3">PS3</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Genere"      
        name="genre"
          rules={[
            { 
            required: true,
            message: "Select an genere"
          },
        ]}>
          <Select placeholder="Choose an genere">
            <Select.Option value="Acción">Action</Select.Option>
            <Select.Option value="Aventura">Adventure</Select.Option>
            <Select.Option value="Conducción">Driving</Select.Option>
            <Select.Option value="Deportes">Sports</Select.Option>
            <Select.Option value="Infantiles">Children</Select.Option>
            <Select.Option value="Multijugador">Multiplayer</Select.Option>
            <Select.Option value="Rol">Role </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item 
        
        className=''
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Enter a price per unit' }]}

        >
          <Input
          placeholder="Price per unit" />
        </Form.Item>
  
        <Form.Item label="Quantity"  
        name="quantity"
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
        getValueFromEvent={handleFileListChange}
        initialValue={fileList}
          rules={[
            {
            required: false,
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
          className='buttonFormCreateProduct'
          htmlType="submit"
          >Create Product</Button>
        </Form.Item>
      </Form>
      </div>

      
    </>
  );
};
export {FormCreateProduct};