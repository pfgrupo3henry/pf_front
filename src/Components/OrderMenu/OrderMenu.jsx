import { Radio, Typography, Button } from "antd";
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
  const onChange = (e) => {
    setValue(e.target.value);
    dispatch(orderByName(value));
  };

  return (
    <div className="menu-ordenamiento">

      <br></br>

      <div>
        <Typography.Title
          secondary
          level={5}
          style={{
            margin: 0,
          }}>
          ORDENAR ALFABETICAMENTE
        </Typography.Title>

        <Radio.Group onChange={onChange} value={value}>
          <Radio value={2}>ASCENTENTE</Radio>
          <Radio value={1}>DESCENDENTE</Radio>
        </Radio.Group>
      </div>

      <br></br>

      {/* <Button onClick={(e) => dispatch(orderByRate(e.target.value))}>
        ORDENAR POR RATING
         </Button> */}

      <div>
        <Button onClick={(e) => dispatch(orderByPrice(e.target.value))}>
          ORDENAR POR PRECIO
        </Button>
      </div>

    </div >
  );
};
export default OrderMenu;
