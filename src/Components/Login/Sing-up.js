import { useState } from "react";
import "./Sing-up.css";
import { Button, Select, Form, Input, Checkbox } from 'antd';
import { Login } from "../Auth0/login";
import { LockOutlined, UserOutlined } from '@ant-design/icons';






function SingUp() {

    const [state, setState] = useState("login");
    const [input, setInput] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        mobile: "",
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
                nacionalidad: ""
            })
        }
    };



    if (state === "login") {

        return (

            <div className="body-login">

                <div className="form-login">

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                    >

                        <Form.Item
                        >
                            <h1>Login</h1>
                        </Form.Item>

                        <Form.Item
                            name="username"
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            name="password"
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

                            <a className="login-form-forgot form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            <Button onClick={onClickState}
                                className="button-form-ir-a">
                                Or register now!</Button>
                        </Form.Item>

                        <Form.Item>
                            <Login />
                        </Form.Item>

                    </Form>

                </div>

            </div>

        );

    } else if (state === "sing-up") {

        const options = [{ value: "Argentina" }, { value: "Brasil" }, { value: "Uruguay" }, { value: "Paraguay" }, { value: "Chile" },
        { value: "Bolivia" }, { value: "Colombia" }, { value: "Venezuela" }, { value: "Mexico" }, { value: "Cuba" },
        { value: "Panama" }, { value: "Costa Rica" }, { value: "Ecuador" }, { value: "Estados Unidos" }, { value: "Canada" },
        { value: "Francia" }, { value: "España" }, { value: "Inglaterra" }, { value: "Alemania" }, { value: "Gales" },
        { value: "Escocia" }, { value: "Irlanda" }, { value: "Australia" }, { value: "Nueva Zelanda" }, { value: "Fiji" }];


        const handleInputChange = (e) => {

            setInput(
                {
                    ...input,
                    [e.target.name]: e.target.value
                }
            );

            console.log(input);

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
            if (input.email.length < 3) {
                var errorEmail = "error";
            } else {
                var sEmail = "finish"
            }
        };

        if (input.password.length !== 0) {
            if (input.password.length < 3) {
                var errorPassword = "error";
            } else {
                var sPassword = "finish"
            }
        };

        if (input.mobile.length !== 0) {
            if (input.mobile.length < 3) {
                var errorMobile = "error";
            } else {
                var sMobile = "finish"
            }
        };

        if (input.nacionalidad.length !== 0) {
            var sNacionalidad = "finish"
        };

        return (

            <div className="body-sing-up">

                <div className="form-sing-up">

                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 800 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onChange={(e) => handleInputChange(e)}
                    >

                        <Form.Item
                        >
                            <h1 className="h1-sing-up">Sing-up</h1>
                        </Form.Item>

                        <Form.Item
                            label="Nombre"
                            name="name"
                        >
                            <Input name="name" />
                            {errorName ?
                                <p className="p-error">Nombre debe tener minimo 3 letras</p>
                                :
                                <p></p>
                            }
                            {sName ?
                                <p className="p-successful">successful</p>
                                :
                                <p></p>
                            }
                        </Form.Item>

                        <Form.Item
                            label="Apellido"
                            name="lastName"
                        >
                            <Input name="lastName" />
                            {errorLastName ?
                                <p className="p-error">Apellido debe tener minimo 3 letras</p>
                                :
                                <p></p>
                            }
                            {sLastName ?
                                <p className="p-successful">successful</p>
                                :
                                <p></p>
                            }
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input name="email" />
                            {errorEmail ?
                                <p className="p-error">Email debe tener minimo 3 letras</p>
                                :
                                <p></p>
                            }
                            {sEmail ?
                                <p className="p-successful">successful</p>
                                :
                                <p></p>
                            }
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                        >
                            <Input name="password" />
                            {errorPassword ?
                                <p className="p-error">Password debe tener minimo 3 letras</p>
                                :
                                <p></p>
                            }
                            {sPassword ?
                                <p className="p-successful">successful</p>
                                :
                                <p></p>
                            }
                        </Form.Item>

                        <Form.Item
                            label="Celular"
                            name="mobile"
                        >
                            <Input name="mobile" />
                            {errorMobile ?
                                <p className="p-error">Celular debe tener minimo 3 letras</p>
                                :
                                <p></p>
                            }
                            {sMobile ?
                                <p className="p-successful">successful</p>
                                :
                                <p></p>
                            }
                        </Form.Item>

                        <Form.Item
                            label="Nacionalidad"
                            name="nacionalidad"
                        >
                            <Select
                                name="nacionalidad"
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Encontra tu Nacionalidad"
                                options={options}
                            />
                            {sNacionalidad ?
                                <p className="p-successful">successful</p>
                                :
                                <p></p>
                            }
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <div className="buttons-sing-up-body">
                                <div className="buttons-sing-up">
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </div>
                                <div className="buttons-sing-up">
                                    <Button type="primary" htmlType="submit" onClick={onClickState}>
                                        Return
                                    </Button>
                                </div>
                            </div>
                        </Form.Item>

                    </Form>

                </div>

            </div>

        );

    }

};


export default SingUp;