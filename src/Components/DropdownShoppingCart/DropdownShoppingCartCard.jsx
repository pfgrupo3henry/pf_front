import React from "react";
import "./DropdownShoppingCartCard.css";
import sustituteImage from "../Assets/a-way-out-ps5-retro.jpg";
import granulado from "../Assets/granulado.png";
import { useDispatch } from "react-redux";
import { addItemToChart } from "../../Redux/Actions/Index";
import { Button, Typography, Image, Space, Tooltip } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
const { Text } = Typography;

function DropdownShoppingCartCard({ image, title, description, price, id }) {
  const dispatch = useDispatch();

  return (
    <div className="dropdown-shopping-cart-card-component">
      <div style={{ backgroundImage: `url('${""}')` }} className="card-header">
        <Image width={100} src={image} />
        <Text type="secondary" style={{ color: "#90A4AE" }}>
          {title || "Game Title"}
        </Text>
      </div>
      <div>
        <Text type="secondary">{`$ ${price}` || "$USD 30"}</Text>
      </div>
      <div className="card-footer">
        <Space>
          <Tooltip title="Minus">
            <Button icon={<MinusOutlined />} />
          </Tooltip>
          <Tooltip title="Add">
            <Button icon={<PlusOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() =>
                dispatch(
                  addItemToChart({
                    title,
                    description,
                    img: image,
                    price,
                    id,
                  })
                )
              }></Button>
          </Tooltip>
        </Space>
      </div>
    </div>
  );
}

export default DropdownShoppingCartCard;
