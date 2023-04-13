import React from "react";
import { List } from "antd";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d10660.783564703608!2d-58.457680512191665!3d-34.55399494083275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x95bcb42cde1d099d%3A0x2833b98eb5cdd11!2sO&#39;Higgins%202341%2C%20Buenos%20Aires!3m2!1d-34.557452399999995!2d-58.454746799999995!5e0!3m2!1ses-419!2sar!4v1681341977317!5m2!1ses-419!2sar"
        width="800"
        height="450"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
      <ul>
        <li>Sucursal 1</li>
        <li>Sucursal 2</li>
        <li>Sucursal 3</li>
      </ul>
    </div>
  );
};

export default Contact;