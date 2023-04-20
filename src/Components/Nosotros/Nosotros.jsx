import "./Nosotros.css";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import { CaretLeftOutlined } from "@ant-design/icons";

const Nosotros = () => {
  const navigate = useNavigate();

  return (
    <div class="contenedor">
      <FloatButton
        icon={<CaretLeftOutlined />}
        tooltip="Volver"
        onClick={() => navigate(-1)}>
        Volver
      </FloatButton>
      <div class="contenedor-text">
        <h2>
          Somos una empresa familiar, que se dedica a la venta de videojuegos,
          en diversas plataformas. Esperemos que tengas una visita agradable en
          nuestro sitio, y te invitamos que nos contactes y nos cuentes tu
          experiencia! Gracias
        </h2>
        <h2>El equipo de Henry Games.</h2>
      </div>
    </div>
  );
};

export default Nosotros;
