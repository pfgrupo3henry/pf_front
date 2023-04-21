import { useState, useRef } from "react";
import "./Sing-up.css";
import { Button, Form, Input, Checkbox, Upload, Alert, Select } from 'antd';
import { Login } from "../Auth0/login";
import { LockOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import Axios from "axios";
import Cookies from "universal-cookie";
import emailjs from '@emailjs/browser';
import { LoadingOutlined, } from '@ant-design/icons';


function SingUp() {

    const [users, setUsers] = useState({
        email: "",
        password: ""
    });
    const [fileList, setFileList] = useState([]);
    const [imagenFile, setImagenFile2] = useState("vacio");
    const [alert, setAlert] = useState("");
    const [state, setState] = useState("login");
    const [loader, setLoader] = useState(false);
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password2: "",
        mobile: "",
        img: [],
        nationality: ""
    });
    const Swal = require('sweetalert2');
    const form = useRef();
    const [forgotPassword, setForgotPassword] = useState({
        email: ""
    });
    const [seeForgot, setSeeForgot] = useState("");

    const cookie = new Cookies();
    const cookieName = cookie.get("firstname");
    console.log(cookieName);

    if (cookieName) {
        Swal.fire({
            title: "Error!",
            text: "Ya estas logeado",
            icon: "error",
            confirmButtonText: "Ok",
        }).then((res) => {
            window.location.href = "/home";
        });
    }


    const onClickState = () => {

        if (state === "login") {
            setState("sing-up")
        } else if (state === "sing-up") {
            setState("login")
            setInput({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                password2: "",
                mobile: "",
                img: [],
                nationality: ""
            })
        }
    };

    if (state === "login") {

        const cookie = new Cookies();

        const submitUser = () => {

            if (users.email.length === 0 || users.password.length === 0) {
                return;
            };

            Axios.post("https://pfservidor-production.up.railway.app/user/login", users)
                .then((res) => {
                    console.log(res);
                    cookie.set("id", res.data._id);
                    cookie.set("firstname", res.data.firstname);
                    cookie.set("lastname", res.data.lastname);
                    cookie.set("email", res.data.email);
                    cookie.set("token", res.data.token);
                    cookie.set("status", res.data.status);
                    cookie.set("role", res.data.role);
                    cookie.set("img", res.data.img[0]);
                    Swal.fire({
                        title: "",
                        text: 'Usuario logueado correctamente',
                        icon: "success",
                        confirmButtonText: 'Ok'
                    }).then((res) => {
                        window.location.href = `/home`
                    });
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        title: "Error!",
                        text: 'Usuario o contraseña incorrectos',
                        icon: "error",
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: "swalButton"
                        }
                    }).then((res) => {
                        window.location.reload();
                    });
                })

        };

        const handleLogin = (e) => {
            setUsers({
                ...users,
                [e.target.name]: e.target.value
            });


            console.log(users);
        };

        const seeForgotClick = () => {
            if (seeForgot === "") {
                setSeeForgot("see")
            } else {
                setSeeForgot("")
            }
        };

        const onChageRestablecer = (e) => {
            setForgotPassword({
                email: e.target.value
            })
            console.log(forgotPassword)
        }

        const SubmitReset = (e) => {

            e.preventDefault()

            console.log(forgotPassword)

            Axios.put("https://pfservidor-production.up.railway.app/user/password-reset", forgotPassword)
                .then((res) => {
                    console.log(res)
                    Swal.fire({
                        title: "",
                        text: 'Revisa tu correo electronico',
                        icon: "success",
                        confirmButtonText: 'Ok'
                    }).then((res) => {
                        setForgotPassword({
                            email: ""
                        });
                    });
                })
                .catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: "Error!",
                        text: 'Correo electronico incorrecto',
                        icon: "error",
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: "swalButton"
                        }
                    }).then((res) => {
                        setForgotPassword({
                            email: ""
                        });
                    })
                })

        };

        return (
            <div className="login-form">
                <Form
                    name="normal_login"

                    initialValues={{ remember: true }}
                    onChange={(e) => handleLogin(e)}
                >

                    {seeForgot === "" ?

                        <div>

                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: users.email.length === 0 ? <p className="p-error">Completar el nombre</p> : <p></p>
                                    },
                                ]}
                            >
                                <Input name="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email de usuario" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: users.password.length === 0 ? <p className="p-error">Completar el password</p> : <p></p>
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Contraseña"
                                    name="password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Recordarme</Checkbox>
                                </Form.Item>

                                <button className="button-forgot" onClick={seeForgotClick}>
                                    Olvidé mi contraseña
                                </button>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button"
                                    onClick={submitUser}>
                                    Iniciar Sesión
                                </Button>
                            </Form.Item>

                            <Form.Item>
                                <div
                                    onClick={onClickState}
                                    className="buttonOrRegister">
                                    O Registrate!
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <Login />
                            </Form.Item>

                        </div>

                        :
                        null}

                </Form>

                {seeForgot !== "" ?

                    <div>

                        <Form.Item
                            label="Escribi tu email"
                            rules={[
                                {
                                    required: true,
                                    message: users.email.length === 0 ? <p className="p-error">Completar el nombre</p> : <p></p>
                                },
                            ]}
                        >
                            <Input value={forgotPassword.email} onChange={(e) => onChageRestablecer(e)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email de usuario" />
                        </Form.Item>


                        <Form.Item>
                            <button className="button-forgot" onClick={(e) => SubmitReset(e)}>
                                Restablecer Contraseña
                            </button>
                            <br></br>
                            <br></br>
                            <button className="button-forgot" onClick={seeForgotClick}>
                                Atras
                            </button>
                        </Form.Item>


                    </div>
                    :
                    null}

            </div>

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

            if (input.img.length > 0 && imagenFile === "vacio") {
                setInput(
                    {
                        ...input,
                        img: [input.img[0].thumbUrl]
                    }
                );
                setImagenFile2("completo")
            };

            console.log(input);

        };

        const onChangeInputImage = (e) => {
            setFileList(e.fileList);
        };

        const handleFileListChange = ({ fileList }) => {
            setFileList(fileList);
            setInput(
                {
                    ...input,
                    img: [...fileList]
                }
            );
        };

        const handleSubmit = () => {

            Axios.post("https://pfservidor-production.up.railway.app/user/register", input)
                .then((res) => {
                    console.log(res);
                    Swal.fire({
                        title: "Registro Exitoso!",
                        text: 'Usuario creado correctamente',
                        icon: "success",
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: "swalButton"
                        }
                    }).then((res) => {
                        window.location.reload();
                    });
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        title: "Error!",
                        text: 'Error el usuario ya existe',
                        icon: "error",
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: "swalButton"
                        }
                    })
                });

        };

        if (input.firstname.length !== 0) {
            if (input.firstname.length < 3) {
                var errorName = "error";
            } else {
                var sName = "finish"
            }
        };

        if (input.lastname.length !== 0) {
            if (input.lastname.length < 3) {
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

        if (input.nationality.length !== 0) {
            var sNacionalidad = "finish"
        };

        if (input.img.length !== 0) {
            var sImagen = "finish"
        };

        if (input.password2.length !== 0) {
            if (input.password2 !== input.password) {
                var errorPassword2 = "error";
            } else {
                var sPassword2 = "finish"
            }
        };

        const sendEmail = (e) => {
            e.preventDefault();

            if (!sEmail || !sName || !sLastName || !sPassword || !sPassword2
                || !sNacionalidad || !sMobile) {
                setAlert("alert");
                Swal.fire({
                    title: "Error!",
                    text: 'Falta cargar datos obligatorios',
                    icon: "error",
                    confirmButtonText: 'Ok',
                    customClass: {
                        confirmButton: "swalButton"
                    }
                });
            } else if (!sImagen) {
                Swal.fire({
                    title: "Error!",
                    text: 'Falta cargar la imagen',
                    icon: "error",
                    confirmButtonText: 'Ok',
                    customClass: {
                        confirmButton: "swalButton"
                    }
                });
            } else {

                setLoader(true);

                emailjs.sendForm('service_6d91cl9', 'template_92alxin', e.target, 'G8C7QMGbuMdcamrEn')
                    .then((result) => {
                        handleSubmit();
                        console.log(result.text);
                    }, (error) => {
                        handleSubmit();
                        console.log(error.text);
                    });

            };

        };

        return (

            <div className="registro">

                <Form
                    className="form-sing-up"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    onChange={(e) => handleInputChange(e)}
                >

                    <Form.Item
                        label="Nombre"
                        name="firstname"
                    >
                        <Input name="firstname" />
                        {errorName ?
                            <p className="p-error">Nombre debe tener minimo 3 letras</p>
                            :
                            <p></p>
                        }
                        {input.firstname.length === 0 && alert ? <p className="p-error">Completar el nombre</p> : <p></p>}
                    </Form.Item>

                    <Form.Item
                        label="Apellido"
                        name="lastname"
                    >
                        <Input name="lastname" />
                        {errorLastName ?
                            <p className="p-error">Apellido debe tener minimo 3 letras</p>
                            :
                            <p></p>
                        }
                        {input.lastname.length === 0 && alert ? <p className="p-error">Completar el apellido</p> : <p></p>}
                    </Form.Item>

                    <Form.Item
                        label="Nacionalidad"
                        name="nationality"
                    >
                        <select
                            name="nationality"
                            placeholder="Encontrá tu país"
                            className="select-sing-up" onChange={handleInputChange}>

                            <option className="option-sing-up">
                                Elegir Nacionalidad
                            </option>

                            {options && options.map((n) => {
                                return (
                                    <option className="option-sing-up">
                                        {n}
                                    </option>
                                );
                            })}
                        </select>
                        {input.nationality.length === 0 && alert ? <p className="p-error">Completar la nacionalidad</p> : <p></p>}
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input name="email" type="email" />
                        {errorEmail ?
                            <p className="p-error">Email incorrecto</p>
                            :
                            <p></p>
                        }
                        {input.email.length === 0 && alert ? <p className="p-error">Completar el email</p> : <p></p>}
                    </Form.Item>

                    <Form.Item label="Cargar" valuePropName="fileList"
                        initialValue={fileList[0]}
                        name="upload"
                        getValueFromEvent={handleFileListChange}
                        size={10}
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
                                    Imagen
                                </div>
                            </div>
                        </Upload>

                        {/* <input type='file' onChange={agregarFoto} /> */}

                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                    >
                        <Input.Password name="password" />
                        {errorPassword ?
                            <div>
                                <p className="p-error">
                                    La Contraseña debe empezar y terminar con números
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
                        {input.password.length === 0 && alert ? <p className="p-error">Completar el password</p> : <p></p>}
                    </Form.Item>

                    <Form.Item
                        label="Repetir Contraseña"
                        name="password2"
                    >
                        <Input.Password name="password2" />
                        {errorPassword2 ?
                            <p className="p-error">
                                Debe ser igual al password
                            </p>
                            :
                            <p></p>
                        }
                        {input.password2.length === 0 && alert ? <p className="p-error">Completar el password</p> : <p></p>}
                    </Form.Item>

                    <Form.Item
                        label="Celular"
                        name="mobile"
                    >
                        <Input name="mobile" addonBefore="+54" />
                        {errorMobile ?
                            <p className="p-error">Celular debe tener minimo 10 numeros</p>
                            :
                            <p></p>
                        }
                        {input.mobile.length === 0 && alert ? <p className="p-error">Completar el celular</p> : <p></p>}
                    </Form.Item>

                </Form >

                <form ref={form} onSubmit={sendEmail} className="button-sing-up-body">
                    <Input type="submit" value="Enviar" className="Button-sing-up-submit" id="button-loading" />
                    <input type="text" name="user_name" value={input.firstname} className="buttonsing-up-none" />
                    <input type="text" name="user_email" value={input.email} className="buttonsing-up-none" />
                    {loader === true ?
                        <LoadingOutlined />
                        :
                        null}
                </form >

                <div className="go-back">
                    <Input type="submit" value="Atras" className="go-back-input" onClick={onClickState} />
                </div>
            </div>

        );

    }

};


export default SingUp;


/*
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
                        {alert === "errorPassword" ?
                            <div className="alert">
                                <Alert
                                    message="Error"
                                    description="Las contraseñas no son iguales"
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
*/