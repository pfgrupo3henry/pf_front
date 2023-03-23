import { SendOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import "./filterHome.css";
//HACER PULL REQ A DEVELOP NO A MAIL ESTUPIDAAAA!!!!!

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
  getItem("PS3", "sub1", <SendOutlined />, [
    getItem("Accion", "1"),
    getItem("Aventura", "2"),
    getItem("Deportes", "3"),
    getItem("Multijugador", "4"),
  ]),
  getItem("PS4", "sub2", <SendOutlined />, [
    getItem("Accion", "5"),
    getItem("Aventura", "6"),
    getItem("Deportes", "7"),
    getItem("Multijugador", "8"),
  ]),
  getItem("PS5", "sub3", <SendOutlined />, [
    getItem("Accion", "9"),
    getItem("Aventura", "10"),
    getItem("Deportes", "11"),
    getItem("Multijugador", "12"),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub3"];

function FilterHome() {
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
}
export { FilterHome };
