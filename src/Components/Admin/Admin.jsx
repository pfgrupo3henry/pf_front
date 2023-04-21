import { useState } from "react";
import "./Admin.css";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { FormCreateProduct } from "./FormCreateProduct";
import { ModifyUser } from "./ModifyUser";
import { Input, Space } from "antd";
import Dashboard from "./Dashboard";
import ProductList from "./ProductList";
import { PaymentsViews } from "./PaymentsViews";
import Cookies from "universal-cookie";
import VerReviews from "./verReviews";
import ReviewsPagina from "./reviewsPagina";
import ModificarJuego from "./modificarJuego";



const { Search } = Input;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Métricas", null, <MailOutlined />, [
    getItem("Análisis de finanzas", "15"),
  ]),

  getItem("Articulos y usuarios", "sub2", <AppstoreOutlined />, [
    getItem("Nuevo producto", "1"),
    getItem("Modificar usuarios", "2"),
    getItem("Lista de productos", "4"),
    getItem("Listado de ventas", "5"),
    getItem("Reviews juegos", "6"),
    getItem("Reviews Pagina", "7"),
    getItem("Modificar Imagen", "8"),
  ]),
];

const rootSubmenuKeys = ["sub1", "sub2", "sub3"];

function Admin() {
  const Swal = require("sweetalert2");

  const cookie = new Cookies();
  const cookieRole = cookie.get("role");
  console.log(cookieRole);

  if (cookieRole !== "Admin") {
    Swal.fire({
      title: "Error!",
      text: "No es usuario Admin",
      icon: "error",
      confirmButtonText: "Ok",
    }).then((res) => {
      window.location.href = "/home";
    });
  }

  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const [theme, setTheme] = useState("ligth");
  const [current, setCurrent] = useState("1");
  const [state, setState] = useState("analytics-finance");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    if (e.key === "1") {
      setState("crear-juego");
    }
    if (e.key === "15") {
      setState("analytics-finance");
    }

    if (e.key === "2") {
      setState("modify-user");
    }

    if (e.key === "3") {
      setState("modify-games");
    }

    if (e.key === "4") {
      setState("list-products");
    }

    if (e.key === "5") {
      setState("see-payments");
    }

    if (e.key === "6") {
      setState("reviews");
    }

    if (e.key === "7") {
      setState("reviews-pagina");
    }

    if (e.key === "8") {
      setState("modificar-imagen");
    }
  };

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  if (cookieRole !== "Admin") {
    return (<div>Cargando...</div>);
  } else if (true) {

    return (
      <div className="admin-component">
        <div className="menuOptions">
          <br />
          <br />
          <Menu
            mode="inline"
            onClick={onClick}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items}
          />
        </div>

        <div className="forms-render">
          {state === "crear-juego" ? (
            <div>
              <FormCreateProduct />
            </div>
          ) : (
            <div></div>
          )}
          {state === "modify-user" ? (
            <div className="searchUserListContainer">
              <ModifyUser />
            </div>
          ) : (
            <div></div>
          )}

          {state === "modify-games" ? <div></div> : <div></div>}

          {state === "list-products" ? (
            <div>
              <ProductList />
            </div>
          ) : (
            <div></div>
          )}

          {state === "see-payments" ? (
            <div>
              <PaymentsViews />
            </div>
          ) : (
            <div></div>
          )}

          {state === "analytics-finance" ? (

            <Dashboard />

          ) : (
            <div></div>
          )}

          {state === "reviews" ? (
            <div>
              <VerReviews />
            </div>
          ) : (
            <div></div>
          )}

          {state === "reviews-pagina" ? (
            <div>
              <ReviewsPagina />
            </div>
          ) : (
            <div></div>
          )}

          {state === "modificar-imagen" ? (
            <div>
              <ModificarJuego />
            </div>
          ) : (
            <div></div>
          )}
        </div>

      </div>
    );
  }
}

export default Admin;
