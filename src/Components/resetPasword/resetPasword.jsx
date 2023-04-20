import { useState } from "react";
import "./resetPasword.css";
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";
import { useParams } from "react-router-dom";



function ResetPasword() {

    const { token } = useParams();
    const Swal = require('sweetalert2');
    const [users, setUsers] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setUsers({
            ...users,
            [e.target.name]: e.target.value
        });
    };

    const onClick = () => {

        axios.put(`https://pfservidor-production.up.railway.app/user/password-reset/${token}`, users)
            .then((res) => {
                console.log(res);
                Swal.fire({
                    title: "",
                    text: 'Modifico la contraseña con exito',
                    icon: "success",
                    confirmButtonText: 'Ok'
                }).then((res) => {
                    window.location.href = `/login`
                });
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: "Error!",
                    text: 'Error modificando la contraseña',
                    icon: "error",
                    confirmButtonText: 'Ok',
                    customClass: {
                        confirmButton: "swalButton"
                    }
                });
            })

    };

    console.log(token);
    console.log(users);

    return (

        <div className="body-reset">

            <Form
                className="conteiner-reset"
                name="normal_login"
                initialValues={{ remember: true }}
                onChange={(e) => onChange(e)}
            >

                {true ?

                    <div className="conteiner-reset">

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: users.email.length === 0 ? <p className="p-error">Completar el nombre</p> : <p></p>
                                },
                            ]}
                        >
                            <Input
                                name="email"
                                prefix={<UserOutlined
                                    className="site-form-item-icon" />}
                                placeholder="Email de usuario" />
                        </Form.Item>

                        <Form.Item
                            label="Nueva password"
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


                    </div>

                    :
                    null}

            </Form>

            <Button onClick={onClick}>Modificar</Button>

        </div>

    );

};


export default ResetPasword;