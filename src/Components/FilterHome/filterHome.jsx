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
  getItem("PS3", "sub1", null, [
    getItem("Action", "1"),
    getItem("Adventure", "2"),
    getItem("Sports", "3"),
    getItem("Multiplayer", "4"),
  ]),
  getItem("PS4", "sub2", null, [
    getItem("Action", "5"),
    getItem("Adventure", "6"),
    getItem("Sports", "7"),
    getItem("Multiplayer", "8"),
  ]),
  getItem("PS5", "sub3", null, [
    getItem("Action", "9"),
    getItem("Adventure", "10"),
    getItem("Sports", "11"),
    getItem("Multiplayer", "12"),
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
