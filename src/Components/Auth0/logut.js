import { useAuth0 } from "@auth0/auth0-react";
import { Button, Space } from "antd";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./logout.css";
import { Input } from 'antd';



export const Logout = () => {
    const { logout } = useAuth0();
    const form = useRef();
    const { user } = useAuth0();
    const [color, setColor] = React.useState('rgba(9, 22, 29, 1)');


    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs.sendForm('service_p04zgza', 'template_sque1s9', e.target, 'PvHbawws_-6fNNwSb')
    //         .then((result) => {
    //             console.log(result.text);
    //             logout({ returnTo: window.location.origin });
    //         }, (error) => {
    //             console.log(error.text);
    //         });

    // };

    return (

        <Space wrap>
            <div onClick={() => logout({ returnTo: window.location.origin })} type="primary">Salir</div>
        </Space>

        // <form ref={form} onSubmit={sendEmail} className="form-email">
        //     <div className="form-input">
        //         < input type="text" name="user_name" value={user.name} className="form-input" />
        //         <input type="email" name="user_email" value={user.email} className="form-input" />
        //     </div>
        //     <div><Input type="submit" value="Logout" /></div>
        // </form >
    );

};