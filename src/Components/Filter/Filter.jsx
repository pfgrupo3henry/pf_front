import { SendOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import "./Filter.css";
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
  getItem("Ordenar por", "sub1", <SendOutlined />, [
    getItem("Ascendente", "1"),
    getItem("Descendente", "2"),
    getItem("Precio", "3"),
    getItem("Ranking", "4"),
  ]),
  getItem("Filtrar por", "sub2", <SendOutlined />, [
    getItem("Accion", "5"),
    getItem("Aventura", "6"),
    getItem("Deportes", "7"),
    getItem("Multijugador", "8"),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2"];
const SearchBar = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      items={items}
    />
  );
};
export default SearchBar;
