import { Radio, Typography, Button, Menu } from "antd";
import { useState } from "react";
import {
  orderByName,
  orderByPrice,
  orderByRate,
} from "../../Redux/Actions/Index";
import { useDispatch } from "react-redux";
import "./OrdenMenu.css";

const OrderMenu = () => {
  const [value, setValue] = useState(1);

  const dispatch = useDispatch();
  const onChange = (n) => {
    setValue(n);
    dispatch(orderByName(value));
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items2 = [
    getItem("Ordena por", "Ordena por", null, [
      getItem("Menor precio", "1"),
      getItem("Mayor precio", "2"),
      getItem("A - Z", "3"),
      getItem("Z - A", "4"),
    ]),
  ];

  const [openKeys, setOpenKeys] = useState(["All"]);

  const onOpenChange = (keys) => {
    console.log(keys);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const rootSubmenuKeys = ["Ordena Por"];

  const onClickOrden = (e) => {
    if (e.key === "1") {
      dispatch(orderByPrice("MENOR PRECIO"));
    }
    if (e.key === "2") {
      dispatch(orderByPrice("MAYOR PRECIO"));
    }

    if (e.key === "3") {
      onChange(2);
    }

    if (e.key === "4") {
      onChange(1);
    }
  };

  return (
    <div className="menu-ordenamiento">
      <Menu
        mode="inline"
        onClick={onClickOrden}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: 256,
        }}
        items={items2}
      />
    </div>
  );
};
export default OrderMenu;
