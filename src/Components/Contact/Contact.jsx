import React from "react";
import { List, Button } from "antd";
import "./Contact.css";
import { useState } from "react";

const Contact = () => {
  const [state, setState] = useState(1);

  const onClick1 = () => {
    setState(1);
  };

  const onClick2 = () => {
    setState(2);
  };

  const onClick3 = () => {
    setState(3);
  };

  return (
    <div className="container">
      <ul className="mapa-lista">
        <h2>Sucursales:</h2>
        <br></br>
        <li>
          <Button className="boton-list" onClick={onClick1}>
            {" "}
            Sucursal 1
          </Button>
        </li>
        <li>
          <Button className="boton-list" onClick={onClick2}>
            {" "}
            Sucursal 2
          </Button>
        </li>
        <li>
          <Button className="boton-list" onClick={onClick3}>
            {" "}
            Sucursal 3
          </Button>
        </li>

        <br></br>
        <br></br>

        {state === 1 ? (
          <div>
            <a>
              <h4>Direccion: O'Higgins 2341</h4>
            </a>
            <a>
              <h4>Telefono: 4743-0986</h4>
            </a>
          </div>
        ) : null}

        {state === 2 ? (
          <div>
            <a>
              <h4>Direccion: Av. Libertador 4321</h4>
            </a>
            <a>
              <h4>Telefono: 4231-6363</h4>
            </a>
          </div>
        ) : null}

        {state === 3 ? (
          <div>
            <a>
              <h4>Direccion: Carlos Paz 6897</h4>
            </a>
            <a>
              <h4>Telefono: 4951-3541</h4>
            </a>
          </div>
        ) : null}
      </ul>

      {state === 1 ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d10660.783564703608!2d-58.457680512191665!3d-34.55399494083275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x95bcb42cde1d099d%3A0x2833b98eb5cdd11!2sO&#39;Higgins%202341%2C%20Buenos%20Aires!3m2!1d-34.557452399999995!2d-58.454746799999995!5e0!3m2!1ses-419!2sar!4v1681341977317!5m2!1ses-419!2sar"
          width="800"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      ) : null}

      {state === 2 ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.436727938199!2d-58.43190102500625!3d-34.56781445560165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5bccf24236d%3A0x54ea27d5ef90f73a!2sAv.%20del%20Libertador%204321%2C%20C1426BWC%20CABA!5e0!3m2!1ses!2sar!4v1681603393076!5m2!1ses!2sar"
          width="800"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      ) : null}

      {state === 3 ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.353605702075!2d-58.41678882500177!3d-34.64577175971911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb0b3bbf0733%3A0xb10307340f0e3c9e!2sJos%C3%A9%20C.%20Paz%206897%2C%20C1437IQO%20CABA!5e0!3m2!1ses!2sar!4v1681603587430!5m2!1ses!2sar"
          width="800"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      ) : null}
    </div>
  );
};

export default Contact;
