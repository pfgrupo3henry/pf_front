import { useState } from "react";
import "./Sing-up.css";
import { Button, Form, Input, Checkbox, Upload, Alert } from 'antd';
import { Login } from "../Auth0/login";
import { LockOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";




function SingUp() {

    const [fileList, setFileList] = useState([]);
    const [fileList2, setFileList2] = useState("vacio");
    const [imagenFile, setImagenFile2] = useState("vacio");
    const [alert, setAlert] = useState("");
    const [alertLogin, setAlertLogin] = useState("");
    const [state, setState] = useState("login");
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
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

    if (fileList.length > 0 && fileList2 === "vacio") {
        console.log(fileList[0])
        setFileList2("lleno")
        setInput(
            {
                ...input,
                imagen: [fileList[0]]
            }
        );
    };

    if (state === "login") {

        const users = [{
            email: "felipe@gmail.com",
            password: "22felipe05"
        }];

        const handleLogin = (e) => {
            setLogin({
                ...login,
                [e.target.name]: e.target.value
            });


            console.log(login);
        };

        const loginSubmit = () => {


            for (let i = 0; i < users.length; i++) {

                if (users[i].email === login.email && users[i].password === login.password) {
                    setAlertLogin("login")
                } else {
                    setAlertLogin("error")
                };
            };

        };

        return (

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onChange={(e) => handleLogin(e)}
            >

                <Form.Item
                    name="email"
                >
                    <Input name="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        onClick={loginSubmit}>
                        Log in
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button
                        onClick={onClickState}
                        className="button-form-ir-a">
                        Or register now!
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Login />
                </Form.Item>

                <Form.Item>
                    {alertLogin === "login" ?
                        <div className="alert">
                            <Alert
                                message="Success Tips"
                                description="El usuario se ha logeado correctamente"
                                type="success"
                                showIcon
                            />
                        </div>
                        :
                        <div></div>
                    }
                    {alertLogin === "error" ?
                        <div className="alert">
                            <Alert
                                message="Error"
                                description="Usuario o contraseña incorrectos"
                                type="error"
                                showIcon
                            />
                        </div>
                        :
                        <div></div>
                    }
                </Form.Item>

            </Form>

        );

    } else if (state === "sing-up") {

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

            if (input.imagen.length > 0 && imagenFile === "vacio") {
                setInput(
                    {
                        ...input,
                        imagen: [input.imagen[0].thumbUrl]
                    }
                );
                setImagenFile2("completo")
            };

            setAlert("");
            console.log(input);

        };

        const onChangeInputImage = (e) => {
            setFileList(e.fileList);
            setAlert("");
        };

        const handleFileListChange = ({ fileList }) => {
            setFileList(fileList);
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

            <Form
                className="form-sing-up"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onChange={(e) => handleInputChange(e)}
            >

                <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: input.name.length === 0 ? <p className="p-error">Completar el nombre</p> : <p></p>
                        },
                    ]}
                >
                    <Input name="name" />
                    {errorName ?
                        <p className="p-error">Nombre debe tener minimo 3 letras</p>
                        :
                        <p></p>
                    }
                </Form.Item>

                <Form.Item
                    label="Apellido"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: input.lastName.length === 0 ? <p className="p-error">Completar el apellido</p> : <p></p>
                        },
                    ]}
                >
                    <Input name="lastName" />
                    {errorLastName ?
                        <p className="p-error">Apellido debe tener minimo 3 letras</p>
                        :
                        <p></p>
                    }
                </Form.Item>

                <Form.Item
                    label="Nacionalidad"
                    name="nacionalidad"
                    rules={[
                        {
                            required: true,
                            message: input.nacionalidad.length === 0 ? <p className="p-error">Completar la nacionalidad</p> : <p></p>
                        },
                    ]}
                >
                    <select className="select-sing-up" name="nacionalidad" onChange={handleInputChange}>
                        <option className="option-sing-up">Encontra tu pais</option>

                        {options && options.map((n) => {
                            return (
                                <option className="option-sing-up">
                                    {n}
                                </option>
                            );
                        })}
                    </select>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: input.email.length === 0 ? <p className="p-error">Completar el email</p> : <p></p>
                        },
                    ]}
                >
                    <Input name="email" />
                    {errorEmail ?
                        <p className="p-error">Email incorrecto</p>
                        :
                        <p></p>
                    }
                </Form.Item>

                <Form.Item label="Upload" valuePropName="fileList"
                    initialValue={fileList[0]}
                    name="upload"
                    getValueFromEvent={handleFileListChange}
                    size={10}
                    rules={[
                        {
                            required: true,
                            message: input.imagen.length === 0 ? <p className="p-error">Carga la imagen</p> : <p></p>
                        },
                    ]}
                >
                    <Upload
                        action="/upload.do"
                        listType="picture-card"
                        onChange={(e) => { onChangeInputImage(e) }}
                    >

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

                    {/* <input type='file' onChange={agregarFoto} /> */}


                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: input.password.length === 0 ? <p className="p-error">Completar el password</p> : <p></p>
                        },
                    ]}
                >
                    <Input name="password" type="password" />
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

                <Form.Item
                    label="Repet Password"
                    name="password2"
                    rules={[
                        {
                            required: true,
                            message: input.password.length === 0 ? <p className="p-error">Completar el password</p> : <p></p>
                        },
                    ]}
                >
                    <Input name="password2" type="password" />
                    {errorPassword ?
                        <p className="p-error">
                            Debe ser igual al password
                        </p>
                        :
                        <p></p>
                    }
                </Form.Item>


                <Form.Item
                    label="Celular"
                    name="mobile"
                    rules={[
                        {
                            required: true,
                            message: input.mobile.length === 0 ? <p className="p-error">Completar el celular</p> : <p></p>
                        },
                    ]}
                >
                    <Input name="mobile" />
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
                        <div></div>
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
                        <div></div>
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
                        <div></div>
                    }
                </Form.Item>

            </Form >

        );

    }

};


export default SingUp;