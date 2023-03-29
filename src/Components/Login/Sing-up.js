import { useState } from "react";
import "./Sing-up.css";
import { Button, Form, Input, Checkbox, Upload, Alert } from 'antd';
import { Login } from "../Auth0/login";
import { LockOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import FormItem from "antd/es/form/FormItem";
import "./Login.css"

import {

    Select,
  } from 'antd';


const { Option } = Select;


function SingUp() {

    const [alert, setAlert] = useState("");
    const [state, setState] = useState("login");
    const [input, setInput] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
        imagen: [],
        nacionalidad: ""
    });

    const onClickState = () => {

        if (state === "login") {
            setState("sing-up")
        } else if (state === "sing-up") {
            setState("login")
            setInput({
                name: "",
                lastName: "",
                email: "",
                password: "",
                mobile: "",
                imagen: [],
                nacionalidad: ""
            })
        }
    };



    if (state === "login") {

        return (

           <div className="loginForm-component">
            <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish=""
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <div className="buttonOrRegister">
        <Button 
        type="primary" 
        htmlType="submit" 
        onClick={onClickState}
        className="login-form-button button">
          Log in
        </Button>
        </div>
      </Form.Item>
      <FormItem>
      Or  <a href="">register now!</a>
      </FormItem>
        
    </Form>
        </div>

        );

    } else if (state === "sing-up") {

        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
              <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
                <Option value="54">+54</Option>

              </Select>
            </Form.Item>
          );

        const options = ["Argentina", "Brasil", "Uruguay", "Paraguay", "Chile",
            "Bolivia", "Colombia", "Venezuela", "Mexico", "Cuba",
            "Panama", "Costa Rica", "Ecuador", "Estados Unidos", "Canada",
            "Francia", "España", "Inglaterra", "Alemania", "Gales",
            "Escocia", "Irlanda", "Australia", "Nueva Zelanda", "Fiji"];

        options.sort((a, b) => {

            if (a > b) {
                return 1;
            }
            if (b > a) {
                return -1;
            }
            return 0;
        });

        const handleInputChange = (e) => {

            setInput(
                {
                    ...input,
                    [e.target.name]: e.target.value
                }
            );

            setAlert("");
            console.log(input);

        };

        const onChangeInputImage = (e) => {
            setInput({
                ...input,
                imagen: input.imagen.push(e.uid)
            });

            setAlert("");
            console.log(input);
            console.log(e);
        };

        const handleSubmit = () => {

            if (!input.name || !input.lastName || !input.email || !input.password ||
                !input.nacionalidad || input.imagen.length === 0 || !input.mobile) {

                setAlert("incompleto");

            } else if (!sName || !sLastName || !sName || !sPassword || !sNacionalidad ||
                !sImagen || !sMobile) {

                setAlert("error");

            } else {

                setAlert("create");

            }
        };

        if (input.name.length !== 0) {
            if (input.name.length < 3) {
                var errorName = "error";
            } else {
                var sName = "finish"
            }
        };

        if (input.lastName.length !== 0) {
            if (input.lastName.length < 3) {
                var errorLastName = "error";
            } else {
                var sLastName = "finish"
            }
        };

        if (input.email.length !== 0) {
            var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
            var esValido = expReg.test(input.email);
            if (esValido === true) {
                var sEmail = "finish"
            } else {
                var errorEmail = "error"
            }
        };

        if (input.password.length !== 0) {
            if (input.password.length < 8 || isNaN(input.password[0]) ||
                isNaN(input.password[input.password.length - 1]) || !isNaN(input.password)) {
                var errorPassword = "error";
            } else {
                var sPassword = "finish"
            }
        };

        if (input.mobile.length !== 0) {
            if (input.mobile.length < 10 || isNaN(input.mobile)) {
                var errorMobile = "error";
            } else {
                var sMobile = "finish"
            }
        };

        if (input.nacionalidad.length !== 0) {
            var sNacionalidad = "finish"
        };

        if (input.imagen.length !== 0) {
            var sImagen = "finish"
        };

        return (
            
            <div className="registerComponent">

                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 1200}}
                        initialValues={{ remember: true, prefix: '54' }}
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e)}
                    >



                    <Form.Item
                        rules={[{ required: true, message: 'Enter your name' }]}
                        label="Nombre"
                        name="name"
                    >
                        <Input name="name" />
                        {errorName ?
                            <p className="p-error">Nombre debe tener minimo 3 letras</p>
                            :
                            <p></p>
                        }

                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Enter a price per unit' }]}
                        label="Apellido"
                        name="lastName"
                    >
                        <Input name="lastName" />
                        {errorLastName ?
                            <p className="p-error">Apellido debe tener minimo 3 letras</p>
                            :
                            <p></p>
                        }

                        
                    </Form.Item>

                    <Form.Item
                        rules={[{ required: true, message: 'Enter a price per unit' }]}
                        label="Nacionalidad"
                        name="nacionalidad"
                    >
                        <Select className="select-sing-up" name="nacionalidad" onChange={handleInputChange}>
                            <option value="">Encontra tu pais</option>

                            {options && options.map((n) => {
                                return (
                                    <option className="option-sing-up">
                                        {n}
                                    </option>
                                );
                            })} 
                        </Select>
  
                    </Form.Item>

                    <Form.Item
                     rules={[{ required: true, message: 'Email is necessary for register' }]}
                        label="Email"
                        name="email"
                    >
                        <Input
                        type="Email"
                        name="email" />
                    </Form.Item>

                    <Form.Item
                         rules={[{ required: true, message: 'Password is required' }]}
                        label="Password"
                        name="password"
                    >
                        <Input.Password name="password" />
                        {errorPassword ?
                            <div>
                                <p className="p-error">
                                    Password debe  empezar y terminar con numeros
                                </p>
                                <p className="p-error">
                                    Contener letras
                                </p>
                                <p className="p-error">
                                    Contener minimo 8 caracrteres
                                </p>
                            </div>
                            :
                            <p></p>
                        }

                    </Form.Item>
                    <FormItem
                    label="Confirm Password"
                    className="inputAux"
                     rules={[{ required: true, message: 'Confirm your pass' }]}>
                        <Input.Password
                        
                        />
                    </FormItem>

                    <Form.Item 
                    label="Imagen" 
                    valuePropName="fileList">
                        <Upload listType="picture-card" name="imagen" action={onChangeInputImage}>
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
    
                    </Form.Item>


                    <Form.Item
                        label="Celular"
                        name="mobile"
                    >
                        <Input 
                        addonBefore={prefixSelector} style={{ width: '100%' }} name="mobile" />
                        {errorMobile ?
                            <p className="p-error">Celular debe tener minimo 10 numeros</p>
                            :
                            <p></p>
                        }
  
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        {alert === "error" ?
                            <div className="alert">
                                <Alert
                                    message="Error"
                                    description="Error en alguno de los datos provistos"
                                    type="error"
                                    showIcon
                                />
                            </div>
                            :
                            null
                        }
                        {alert === "incompleto" ?
                            <div className="alert">
                                <Alert
                                    message="Error"
                                    description="Falta enviar datos obligatorios"
                                    type="error"
                                    showIcon
                                />
                            </div>
                            :
                            null
                        }
                        {alert === "create" ?
                            <div className="alert">
                                <Alert
                                    message="Success Tips"
                                    description="El usuario se ha creado correctamente"
                                    type="success"
                                    showIcon
                                />
                            </div>
                            :
                            null
                        }
                    </Form.Item>

                </Form>

            </div>

        );

    }

};


export default SingUp;