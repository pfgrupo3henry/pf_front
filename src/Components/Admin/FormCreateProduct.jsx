import { PlusOutlined } from '@ant-design/icons';
import { postNewProduct } from "../../Redux/Actions/Index"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
const Swal = require('sweetalert2')


const FormCreateProduct = () => {


  const dispatch = useDispatch();


  const [fileList, setFileList] = useState([]);

  const handleFileListChange = ({ fileList }) => {
    setFileList(fileList);
  };




  const [formImage, setformImage] = useState(
    {
      img: "",
    }
  )

  const handleSubmit = (event) => {
    let data = {
      name: event.name,
      description: event.Description,
      quantity: event.quantity,
      img: [fileList[0].thumbUrl],
      price: event.price,
      genre: event.genre,
      platform: event.console,
    };
    console.log(data);

    let todasCompletas = true;

    for (const propiedad in data) {
      if (!data[propiedad]) {
        todasCompletas = false;
        break;
      }
    }

    if (todasCompletas) {
      console.log("Todas las propiedades están completas");
      dispatch(postNewProduct(data));
      Swal.fire({
        icon: 'success',
        title: '¡Creado!',
        text: '¡Nuevo producto agregado a la Tienda!'
  
      })

      setTimeout(() => {
        window.location.href = `/home`

      }, 1000);

    } else {
      console.log("Faltan propiedades por completar");
      Swal.fire(
        'Espera..',
        '¡Tenés que completar todas las propiedades!',
        'warning'
      )
    }

  };

  const handleSubmit2 = (event) => {
    setFileList(event.fileList);
  }

  /*        const agregarFoto = (e) => {
      let file = e.target.files[0]
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setFormValues({ 
            img: reader.result
          })
        };
      }
    }  */

  return (
    <>
      <div className='formCreateNewProduct'>
        <Form
          onFinish={(event) => handleSubmit(event)}
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
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Selecciona un nombre para el nuevo producto' }]}

          >
            <Input
              placeholder="Nombre del producto" />
          </Form.Item>



          <Form.Item
            label="Consola"
            name="console"
            rules={[
              {
                required: true,
                message: "Selecciona la categoría correcta"
              },
            ]}
          >
            <Select placeholder="PS5/PS4/PS3  ">
              <Select.Option value="PS5">PS5</Select.Option>
              <Select.Option value="PS4">PS4</Select.Option>
              <Select.Option value="PS3">PS3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Género"
            name="genre"
            rules={[
              {
                required: true,
                message: "Selecciona un género"
              },
            ]}>
            <Select placeholder="Selecciona un género">
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
            label="Precio"
            name="price"
            rules={[{ required: true, message: 'Seleccione un precio' }]}

          >
            <InputNumber
              className='priceInput'
              placeholder="Precio por unidad" />
          </Form.Item>

          <Form.Item label="Cantidad"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Por favor introduce una cantidad"
              },
            ]}>
            <InputNumber placeholder="1,2,3" />
          </Form.Item>
          <Form.Item label="Descripción"
            name="Description"
            rules={[
              {
                required: true,
                message: "Escribe una descripción para el producto"
              },
            ]}>
            <TextArea placeholder="Acerca del producto.." rows={4} />
          </Form.Item>

          <Form.Item label="Cargar" valuePropName="fileList"
            name="upload"
            getValueFromEvent={handleFileListChange}
            initialValue={fileList[0]}
            size={10}
            rules={[
              {
                required: false,
                message: "Por favor sube una imagen"
              },
            ]}>
            <Upload
              action="/upload.do"
              listType="picture-card"
              onChange={(event) => { handleSubmit2(event) }}
            >

              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Imagen
                </div>
              </div>
            </Upload>

            {/* <input type='file' onChange={agregarFoto} /> */}


          </Form.Item>
          <Form.Item >
            <Button
              className='buttonFormCreateProduct'
              htmlType="submit"
            >Crear Producto</Button>
          </Form.Item>
        </Form>
      </div>


    </>
  );
};
export { FormCreateProduct };