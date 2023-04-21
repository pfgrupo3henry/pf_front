import "./Nosotros.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import image from "../Assets/control.jpeg";
import { CaretLeftFilled } from "@ant-design/icons";

const Nosotros = () => {
  const navigate = useNavigate();

  return (
    <div className="contenedor">
      <div className="contenedor-int">
        <div className="contenedor-text">
          <p>
            "Somos una empresa dedicada a la venta de videojuegos en línea y
            vídeojuegos físicos de consola. Ofrecemos a nuestros clientes una
            amplia selección de videojuegos de calidad para diversas
            plataformas. Nos esforzamos por brindar un servicio excepcional, con
            precios competitivos y una experiencia de compra fácil y segura.
          </p>
          <br></br>
          <p>Esperamos que lo disfrutes. ¡Gracias por elegirnos!"</p>
          <h2>El equipo de Henry Games.</h2>
        </div>
        <Button
          className="button"
          icon={<CaretLeftFilled />}
          style={{ borderRadius: "50px" }}
          onClick={() => navigate(-1)}></Button>
      </div>
      <img src={image} alt="imagen fondo" />
    </div>
  );
};

export default Nosotros;
