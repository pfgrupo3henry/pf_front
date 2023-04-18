import { useAuth0 } from "@auth0/auth0-react";
import { Button, Space } from "antd";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./logout.css";
import { Input } from 'antd';



export const Salir = () => {

    const { logout } = useAuth0();

    function eliminarCookies() {
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            logout();
            window.location.href = "/"
        })
    };


    return (

        <Space wrap>
            <div onClick={() => eliminarCookies()} type="primary">Salir</div>
        </Space>

    );

};
